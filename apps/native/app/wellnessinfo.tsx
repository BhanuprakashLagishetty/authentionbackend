import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function WellnessInfoScreen() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Stores selected options
  const router = useRouter();

  const handleOptionPress = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handlePressNext = () => {
    router.push('/labreports'); // Navigate to the next screen
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.container}>
      
      {/* Right side image for 1 2 3 step */}
      <Image
        source={require('../assets/images/Step 2.png')} 
        style={styles.stepImage}
      />

      <View style={styles.leftColumn}>
        {/* Wellness Info Header */}
        <Text style={styles.headerTitle}>Wellness Info</Text>

        {/* Question */}
        <Text style={styles.questionTitle}>Choose Your Personal Goal</Text>

        {/* Options */}
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Muscle Building') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('Muscle Building')}
            >
              <Text style={styles.optionText}>Muscle Building</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Mental Wellness') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('Mental Wellness')}
            >
              <Text style={styles.optionText}>Mental Wellness</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Weight Loss') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('Weight Loss')}
            >
              <Text style={styles.optionText}>Weight Loss</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Sleep Improvement') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('Sleep Improvement')}
            >
              <Text style={styles.optionText}>Sleep Improvement</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('General Fitness') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('General Fitness')}
            >
              <Text style={styles.optionText}>General Fitness</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Weight Gain') && styles.optionSelected,
              ]}
              onPress={() => handleOptionPress('Weight Gain')}
            >
              <Text style={styles.optionText}>Weight Gain</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={[
                styles.optionBox,
                selectedOptions.includes('Healthy Eating') && styles.optionSelected,
                styles.smallBox // Apply a smaller width for this box
              ]}
              onPress={() => handleOptionPress('Healthy Eating')}
            >
              <Text style={styles.optionText}>Healthy Eating</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Next Button placed outside the left column */}
      <TouchableOpacity style={styles.nextButton} onPress={handlePressNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Container for overall layout
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
  },
  // Left column style
  leftColumn: {
    flex: 1,
    paddingHorizontal: 20, // Adjust padding to push content left
    marginRight: 90,
    justifyContent: 'flex-start',
  },
  // Step image style
  stepImage: {
    position: 'absolute',
    right: -400,
    top: '25%',
    width: 550,
    height: 550,
    resizeMode: 'contain',
  },
  // Title styles
  headerTitle: {
    paddingTop: 70,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 60,
  },
  questionTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  // Options container style
  optionsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align to the left
    marginBottom: 40,
  },
  // Option row for each line
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between options
    marginBottom: 10,
  },
  // Option box style
  optionBox: {
    flex: 1,
    margin: 5,
    paddingVertical: 15, // Adjusted padding to reduce height
    paddingHorizontal: 5,
    borderRadius: 25, // Rounded corners for left and right sides
    borderWidth: 1,
    borderColor: '#4A90E2',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60, // Set consistent height across all rows
  },
  // Small box style for "Healthy Eating" in the last row
  smallBox: {
    flex: 0.48, // Adjusted width for the "Healthy Eating" box
  },
  // Selected option box style
  optionSelected: {
    backgroundColor: '#4A90E2',
  },
  // Option text style with decreased font size
  optionText: {
    color: '#000',
    fontSize: 13, // Decreased font size for all boxes
    fontWeight: 'bold',
  },
  // Next button style
  nextButton: {
    position: 'absolute', // Position it absolutely
    bottom: 30, // Adjust this to change the vertical position on the screen
    alignSelf: 'center', // Center horizontally on the screen
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    width: '80%', // Set width to 80% of the screen
    borderRadius: 25, // Increased radius for more rounded edges
    alignItems: 'center', // Center the text inside the button
  },
  
  // Text inside the next button
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
