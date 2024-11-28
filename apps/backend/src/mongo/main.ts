import mongoose from "mongoose";

const RecordingMethodEnum = [
  "RECORDING_METHOD_ACTIVELY_RECORDED",
  "RECORDING_METHOD_AUTOMATICALLY_RECORDED",
  "RECORDING_METHOD_MANUAL_ENTRY",
  "RECORDING_METHOD_UNKNOWN",
];

const HealthScoresTypeEnum = [
  "Wellbeing",
  "Activity",
  "Sleep",
  "Depression",
  "Stress",
  "Anxiety",
];

// Otp Schema
const OtpSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // References user_id in PostgreSQL
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// RefreshToken Schema
const RefreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // References user_id in PostgreSQL
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

// Activity Schema
const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String, // References user_id in PostgreSQL
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    steps: {
      type: Number,
    },
    activeMinutes: {
      type: Number,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Sleep Schema
const SleepSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // References user_id in PostgreSQL
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    hoursSlept: {
      type: Number, // JavaScript Number covers both int and float
      required: true,
    },
    sleepQuality: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Nutrition Schema
const NutritionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    totalCalories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    meal: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// MindfulnessSession Schema
const MindfulnessSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// CommunityPost Schema
const CommunityPostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
    },
    userId: {
      type: String, // References user_id in PostgreSQL
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    commentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Leaderboard Schema
const LeaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: "updatedAt" },
  }
);

// AIInsight Schema
const AIInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    insightDescription: {
      type: String,
      required: true,
    },
    insightDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// SahhaProfiles Schema
const SahhaProfilesSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
      unique: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    realTimeHealthData: [
      {
        type: String,
        ref: "RealTimeHealthData",
      },
    ],
    DigitalBiomarkerLogs: [
      {
        type: String,
        ref: "DigitalBiomarkerLogs",
      },
    ],
    HealthScoreLogs: [
      {
        type: String,
        ref: "HealthScoreLogs",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// RealTimeHealthData Schema
const RealTimeHealthDataSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    logType: {
      type: String,
      required: true,
    },
    dataType: {
      type: String,
      required: true,
    },
    dataLogs: [
      {
        type: String,
        ref: "DataLog",
      },
    ],
    profileId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// DataLog Schema
const DataLogSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    recordingMethod: {
      type: String,
      enum: RecordingMethodEnum,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: String,
      required: true,
    },
    endDateTime: {
      type: String,
      required: true,
    },
    additionalProperties: {
      type: mongoose.Schema.Types.Mixed,
    },
    realTimeHealthDataId: {
      type: String,
      required: true,
    },
    receivedAtUtc: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// DigitalBiomarkerLogs Schema
const DigitalBiomarkerLogsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    profileId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    periodicity: {
      type: String,
      required: true,
    },
    aggregation: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    valueType: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    createdAtUtc: {
      type: Date,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// HealthScoreLogs Schema
const HealthScoreLogsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    profileId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: HealthScoresTypeEnum,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    factors: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    dataSources: {
      type: [String],
      required: true,
    },
    scoreDateTime: {
      type: String,
      required: true,
    },
    createdAtUtc: {
      type: Date,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create models
const Otp = mongoose.model("Otp", OtpSchema);
const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
const Activity = mongoose.model("Activity", ActivitySchema);
const Sleep = mongoose.model("Sleep", SleepSchema);
const Nutrition = mongoose.model("Nutrition", NutritionSchema);
const MindfulnessSession = mongoose.model(
  "MindfulnessSession",
  MindfulnessSessionSchema
);
const CommunityPost = mongoose.model("CommunityPost", CommunityPostSchema);
const Comment = mongoose.model("Comment", CommentSchema);
const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);
const AIInsight = mongoose.model("AIInsight", AIInsightSchema);
const SahhaProfiles = mongoose.model("SahhaProfiles", SahhaProfilesSchema);
const RealTimeHealthData = mongoose.model(
  "RealTimeHealthData",
  RealTimeHealthDataSchema
);
const DataLog = mongoose.model("DataLog", DataLogSchema);
const DigitalBiomarkerLogs = mongoose.model(
  "DigitalBiomarkerLogs",
  DigitalBiomarkerLogsSchema
);
const HealthScoreLogs = mongoose.model(
  "HealthScoreLogs",
  HealthScoreLogsSchema
);

// Export all models
export {
  Otp,
  RefreshToken,
  Activity,
  Sleep,
  Nutrition,
  MindfulnessSession,
  CommunityPost,
  Comment,
  Leaderboard,
  AIInsight,
  SahhaProfiles,
  RealTimeHealthData,
  DataLog,
  DigitalBiomarkerLogs,
  HealthScoreLogs,
};
