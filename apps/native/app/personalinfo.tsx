import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function PersonalInfoScreen() {
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [heightWhole, setHeightWhole] = useState<string>(''); // Whole number part of height
  const [heightFraction, setHeightFraction] = useState<string>(''); // Fraction part of height
  const [weightWhole, setWeightWhole] = useState<string>(''); // Whole number part of weight
  const [weightFraction, setWeightFraction] = useState<string>(''); // Fraction part of weight
  const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'prefer not to say' | null>(null);
  const router = useRouter();

  const handlePress = () => {
    router.push('/wellnessinfo'); // Navigate to a 404 page when pressing an item
  };

  const onChangeDate = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.container}>
      
      {/* Step 1 Image */}
      <Image 
        source={require('../assets/images/step1.png')} 
        style={styles.stepImage} 
      />

      <View style={styles.leftColumn}>
        
        {/* Personal Info Header */}
        <Text style={styles.headerTitle}>Personal Info</Text>
        
        {/* What's Your Birthday */}
        <Text style={styles.sectionTitle}>When's your birthday?</Text>
        <View style={styles.dateInput}>
          <TextInput
            style={styles.inputText}
            value={birthday.toLocaleDateString()}
            editable={false}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Image 
              source={require('../assets/images/calender.png')} 
              style={styles.calendarIcon} 
            />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={birthday}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => onChangeDate(selectedDate as Date)}
          />
        )}

        {/* Weight Input */}
        <Text style={styles.sectionTitle}>Weight</Text>
        <View style={styles.weightHeightInputContainer}>
          <View style={styles.weightHeightInputBox}>
          <View style={styles.blueLines} />
            <TextInput
              style={styles.manualInput}
              placeholder="00"
              keyboardType="numeric"
              value={weightWhole}
              onChangeText={(text) => setWeightWhole(text)}
            />
            <View style={styles.blueLines} />
          </View>
          <Text style={styles.dot}>.</Text>
          <View style={styles.weightHeightInputBox}>
          <View style={styles.blueLines} />
            <TextInput
              style={styles.manualInput}
              placeholder="0"
              keyboardType="numeric"
              value={weightFraction}
              onChangeText={(text) => setWeightFraction(text)}
            />
            <View style={styles.blueLines} />
          </View>
          <Text style={styles.unitText}>kg</Text>
        </View>

        {/* Height Input */}
        <Text style={styles.sectionTitle}>Height</Text>
        <View style={styles.weightHeightInputContainer}>
          <View style={styles.weightHeightInputBox}>
          <View style={styles.blueLines} />
            <TextInput
              style={styles.manualInput}
              placeholder="00"
              keyboardType="numeric"
              value={heightWhole}
              onChangeText={(text) => setHeightWhole(text)}
            />
            <View style={styles.blueLines} />
          </View>
          <Text style={styles.dot}>.</Text>
          <View style={styles.weightHeightInputBox}>
          <View style={styles.blueLines} />
            <TextInput
              style={styles.manualInput}
              placeholder="0"
              keyboardType="numeric"
              value={heightFraction}
              onChangeText={(text) => setHeightFraction(text)}
            />
            <View style={styles.blueLines} />
          </View>
          <Text style={styles.unitText}>ft</Text>
        </View>

        {/* Gender Selection */}
        <Text style={styles.sectionTitle}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            onPress={() => setGender('male')}
            style={gender === 'male' ? styles.genderSelected : styles.genderIcon}
          >
            <Image source={require('../assets/images/male.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender('female')}
            style={gender === 'female' ? styles.genderSelected : styles.genderIcon}
          >
            <Image source={require('../assets/images/female.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender('non-binary')}
            style={gender === 'non-binary' ? styles.genderSelected : styles.genderIcon}
          >
            <Image source={require('../assets/images/non-binary.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>Non-Binary</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender('prefer not to say')}
            style={gender === 'prefer not to say' ? styles.genderSelected : styles.genderIcon}
          >
            <Image source={require('../assets/images/not-to-say.png')} style={styles.genderImage} />
            <Text style={styles.genderText}>Not To Say </Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handlePress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    // Container for overall layout
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    // Left column style
    leftColumn: {
      flex: 1,
      paddingHorizontal: 30,
      marginRight: 20,
      justifyContent: 'flex-start',
    },
    // Step 1 image style
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
    sectionTitle: {
      fontSize: 20,
      color: '#000',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    // Date input container (birthday input)
    dateInput: {
      width: '80%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 25, // Round on both left and right
      marginBottom: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent', // Make it transparent
      paddingHorizontal: 10,
    },
    // Text inside date input
    inputText: {
      fontSize: 16,
      color: '#000',
      flex: 1,
    },
    // Calendar icon inside the date input
    calendarIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    // Weight/Height input container
    weightHeightInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 55,
        marginRight:2,
        justifyContent: 'flex-start', // Align content to the left
        
      },
      weightHeightInputBox: {
        width: 80,
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4A90E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        backgroundColor: 'transparent', // Make it transparent
        
      },
    // Input text for the weight/height
    manualInput: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000',
    },
    // Horizontal blue line in weight/height inputs
    blueLines: {
      width: '50%',
      height: 1,
      backgroundColor: '#4A90E2',
      marginVertical: 5,
    },
    // Decimal point between weight/height inputs
    dot: {
      fontSize: 28,
      color: '#000',
      marginHorizontal: 5,
    },
    // Unit text (e.g., kg, ft)
    unitText: {
      fontSize: 16,
      color: '#888',
      marginLeft: 10,
    },
    // Gender selection container
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align icons to the left
        alignItems: 'center', // Align icons vertically
        marginBottom: 30,
        marginLeft: 0, //
    },
    // Styles for gender buttons (unselected)
    genderIcon: {
      
        flexDirection: 'column', // Ensure image and text are vertically aligned
        alignItems: 'center', // Align content to the center
        padding: 10,
        borderRadius: 5,
        width: 85,
      
    },
    // Styles for gender buttons (selected)
    genderSelected: {
        flexDirection: 'column', // Ensure image and text are vertically aligned
        alignItems: 'center', // Align content to the center
        borderWidth: 2,
        borderColor: '#4A90E2',
        padding: 10,
        borderRadius: 5,
        width: 85, // Set a fixed width for all gender buttons
    },
    // Gender image size
    genderImage: {
      width: 65,
      height: 65,
      resizeMode: 'contain',
    },
    // Gender text below the image
    genderText: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
        maxWidth: 65,    // Set a maximum width (adjust according to your layout)
        flexWrap: 'wrap',  // Ensure the text wraps to the next line if it's too long
      },
    // Next button style
    nextButton: {
        position: 'absolute', // Position it absolutely
    bottom: 30, // Adjust this to change the vertical position on the screen
    alignSelf: 'center', // Center horizontally on the screen
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    width: '100%', // Set width to 80% of the screen
    borderRadius: 25, // Increased radius for more rounded edges
    alignItems: 'center',
    },
    // Text inside the next button
    nextButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

