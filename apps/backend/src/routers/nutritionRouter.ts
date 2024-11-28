import express, { type Errback } from "express";
import path from "path";
import multer from "multer";
import fetch from "node-fetch";
// const fetch = await import('node-fetch');
// import { fileURLToPath } from "url";
import fs from "fs";
import FormData from "form-data";
import mime from "mime-types";
import "dotenv/config";
import pluralize from "pluralize";
import { Nutrition } from "../mongo/main";
import { Error } from "mongoose";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add-log", async (req, res, next) => {
  const data = req.body;
  try {
    data.logs.forEach((log: any) => {
      Nutrition.create({ ...log, userID: req.user?.userId });
    });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/process-audio",
  upload.single("audio"),
  async (req, res, next) => {
    const audioPath = path.join(__dirname, req.file?.path ?? "");

    try {
      const transcript = await getTranscriptFromSarvamAI(audioPath);
      const nutritionInfo = await getNutritionInfoFromBonHappetee(transcript);

      res.json({ transcript, nutritionInfo });
    } catch (error: any) {
      next(error);
    }
  }
);

// GET route to fetch nutrition info directly from query parameters
router.get("/get-nutrition", async (req, res, next) => {
  const food = req.query.food;
  const quantity = req.query.quantity || 1;

  try {
    const nutritionInfo = await getNutritionInfoFromBonHappetee([
      `${quantity} ${food}`,
    ]);

    if (nutritionInfo && nutritionInfo.length > 0) {
      res.json(nutritionInfo[0]); // Send back the first item in nutrition results
    } else {
      res.status(404).json({ error: "Nutrition information not found" });
    }
  } catch (error: any) {
    next(error);
  }
});

// Function to handle transcription from Sarvam AI and split the transcript
async function getTranscriptFromSarvamAI(audioPath: string) {
  const formData = new FormData();
  const fileStream = fs.createReadStream(audioPath);
  const mimeType = mime.lookup(audioPath);

  formData.append("file", fileStream, {
    contentType: mimeType || "audio/wav",
    filename: path.basename(audioPath),
  });
  formData.append("model", "saaras:v1");

  const response = await fetch(
    "https://api.sarvam.ai/speech-to-text-translate",
    {
      method: "POST",
      headers: { "API-Subscription-Key": process.env.SARVAM_API_KEY as string }, // Use env variable
      body: formData,
    }
  );

  const data: any = await response.json();

  console.log("Sarvam.ai Response:", data);

  if (!data.transcript) {
    throw new Error("Transcript is missing from the API response");
  }

  let transcript = data.transcript;
  const detectedLanguage = data.language_code;

  console.log("Detected Language:", detectedLanguage);

  transcript = transcript
    .trim()
    .replace(/[.,]/g, ",") // Replace punctuation with commas
    .replace(/\band\b/g, ",") // Replace "and" with commas
    .replace(/\bwith\b/g, ",") // Replace "with" with commas
    .replace(/(\d+)\s?([a-zA-Z]+)/g, "$1 $2") // Add space between numbers and food names if missing
    .replace(/\s+/g, " ");

  const cleanedTranscript = transcript
    .split(",")
    .map((item: string) => item.trim())
    .filter((item: string) => item.length > 0);

  console.log("Split Transcript into Food Items:", cleanedTranscript); // Debugging log

  return cleanedTranscript;
}

// Fetch nutrition info from Bon Happetee API
async function getNutritionInfoFromBonHappetee(foodItems: any) {
  // Use Promise.all to fetch nutrition info concurrently
  const nutritionResults = await Promise.all(
    foodItems.map(async (foodItem: any) => {
      let quantity = 1; // Default quantity
      let query = foodItem.trim();

      // Check if the food item has a quantity in front (e.g., "Two idlis")
      const quantityMatch = query.match(/^(\d+|[a-zA-Z]+)\s+(.*)$/); // Adjusted regex
      if (quantityMatch) {
        const numberWordsMap = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          seven: 7,
          eight: 8,
          nine: 9,
          ten: 10,
        };
        quantity = isNaN(quantityMatch[1])
          ? numberWordsMap[
              quantityMatch[1].toLowerCase() as keyof typeof numberWordsMap
            ] || 1
          : parseInt(quantityMatch[1]);
        query = quantityMatch[2]; // Get the food name without quantity
      }

      // Singularize the query for better matching
      const singularQuery = pluralize.singular(query.toLowerCase());

      const bonHappeteeURL = `https://api.bonhappetee.com/search?value=${encodeURIComponent(
        singularQuery
      )}`;

      try {
        console.log(
          `Making request to BonHappetee API with URL: ${bonHappeteeURL}`
        );

        const response = await fetch(bonHappeteeURL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "x-api-key": process.env.BONHAPPETEE_API_KEY as string, // Use env variable
          },
        });

        const data: any = await response.json();
        console.log("BonHappetee API Response:", data);

        if (data?.items?.length > 0) {
          // First look for an exact match
          const exactMatch = data.items.find(
            (item: any) =>
              pluralize.singular(item.food_name.toLowerCase()) ===
                singularQuery ||
              (item.common_names &&
                pluralize.singular(item.common_names.toLowerCase()) ===
                  singularQuery)
          );

          // If no exact match, look for a substring match
          let matchedItem;
          if (exactMatch) {
            matchedItem = exactMatch; // Use exact match if found
          } else {
            // Try to find the best substring match
            const substringMatches = data.items.filter(
              (item: any) =>
                pluralize
                  .singular(item.food_name.toLowerCase())
                  .includes(singularQuery) ||
                (item.common_names &&
                  pluralize
                    .singular(item.common_names.toLowerCase())
                    .includes(singularQuery))
            );
            if (substringMatches.length > 0) {
              // Sort matches by the shortest food name length to prioritize closest matches
              substringMatches.sort(
                (a: any, b: any) => a.food_name.length - b.food_name.length
              );
              matchedItem = substringMatches[0];
            }
          }

          if (matchedItem) {
            const nutrients = matchedItem.nutrients;

            // Singularize the food name for consistency
            const foodName = pluralize.singular(matchedItem.food_name);

            // Calculate nutrient values based on quantity
            const calories = nutrients.calories
              ? (nutrients.calories * quantity).toFixed(2)
              : "N/A";
            const protein = nutrients.protein
              ? (nutrients.protein * quantity).toFixed(2)
              : "N/A";
            const carbs = nutrients.carbohydrates
              ? (nutrients.carbohydrates * quantity).toFixed(2)
              : "N/A";
            const fat = nutrients.fat
              ? (nutrients.fat * quantity).toFixed(2)
              : "N/A";

            return {
              food: foodName,
              quantity: quantity,
              calories: calories,
              protein: protein,
              carbohydrates: carbs,
              fat: fat,
            };
          } else {
            console.log(`No match found for ${query}`);
            return {
              food: query,
              quantity: quantity,
              calories: "N/A",
              protein: "N/A",
              carbohydrates: "N/A",
              fat: "N/A",
            };
          }
        } else {
          console.log(`No nutrition data found for ${query}`);
          return {
            food: query,
            quantity: quantity,
            calories: "N/A",
            protein: "N/A",
            carbohydrates: "N/A",
            fat: "N/A",
          };
        }
      } catch (error) {
        console.error(`Error fetching nutrition info for ${query}:`, error);
        return {
          food: query,
          quantity: quantity,
          calories: "N/A",
          protein: "N/A",
          carbohydrates: "N/A",
          fat: "N/A",
        };
      }
    })
  );

  return nutritionResults;
}

export default router;
