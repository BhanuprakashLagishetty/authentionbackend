import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { AxiosError } from 'axios';
export default function NutritionScreen() {
  const [modalVisible, setModalVisible] = useState(false); // State for Modal visibility
  const [foodLog, setFoodLog] = useState(''); // State for Food Log text
  const [uploadedImage, setUploadedImage] = useState<any>(null); // State for uploaded image
  const [response, setResponse] = useState<string | null>(null); // State to store simulated response

  // Function to handle image upload from gallery
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploadedImage({ uri: result.assets[0].uri });
    } else {
      console.log('User cancelled image picker');
    }
  };

  // Function to handle capturing a photo using the camera
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to your camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploadedImage({ uri: result.assets[0].uri });
    } else {
      console.log('User cancelled camera');
    }
  };

  

  const handleSubmit = async () => {
    if (!foodLog && !uploadedImage) {
      Alert.alert('Error', 'Please upload an image or add a food log.');
      return;
    }
  
    let formData = new FormData();
  
    if (uploadedImage) {
      const imageUri = uploadedImage.uri; // Access the uri property
      const fileType = imageUri.split('.').pop(); // Get the file extension
  
      // Create a file object for FormData
      const file = {
        uri: imageUri,
        name: `food-image.${fileType}`,
        type: `image/${fileType}`,
      };
  
      formData.append('image', file as any); // Cast to 'any' to bypass TypeScript checks
    }
  
    if (foodLog) {
      formData.append('foodLog', foodLog);
    }
  
    try {
        const response = await axios.post('http://192.168.225.161:5000/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setResponse(response.data.response);
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error submitting the form: ", axiosError.response ? axiosError.response.data : axiosError);
        Alert.alert('Error', 'There was an issue with your submission. Please try again.');
    }
};
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nutrition Tracker</Text>

      {/* Food Log Input */}
      <TextInput
        style={styles.input}
        placeholder="Add your food log here..."
        value={foodLog}
        onChangeText={setFoodLog}
        multiline
      />

      {/* Image Upload Section */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.uploadButtonText}>Upload a Photo</Text>
      </TouchableOpacity>

      {/* Display Selected Image */}
      {uploadedImage && <Image source={{ uri: uploadedImage.uri }} style={styles.image} />}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Response Display Section */}
      {response !== null && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Response:</Text>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      )}

      {/* Modal for Image Picker */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Choose a Photo</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => { handleImageUpload(); setModalVisible(false); }}>
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => { handleTakePhoto(); setModalVisible(false); }}>
              <Text style={styles.optionText}>Click a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 60,
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
