import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';  // Import Image Picker
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);  // Modal state
  const [profileImage, setProfileImage] = useState(require('../../assets/images/image1.jpeg'));  // Default profile image
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push('/404');
  };

  // Function to open the image picker
  const openImagePicker = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correctly specify media types
      quality: 1,
    };

    try {
      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = { uri: result.assets[0].uri };
        setProfileImage(selectedImage);  // Set new profile image
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.log(`ImagePicker Error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.imageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.pencilIcon} onPress={() => setModalVisible(true)}>
            <FontAwesome name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>Rounak Tikde</Text>
          <View style={styles.subTextContainer}>
            <View style={styles.subTextColumn}>
              <Text style={styles.subText}>Male</Text>
              <Text style={styles.subText}>Gender</Text>
            </View>
            <View style={styles.subTextColumn}>
              <Text style={styles.subText}>32</Text>
              <Text style={styles.subText}>Age</Text>
            </View>
            <View style={styles.subTextColumn}>
              <Text style={styles.subText}>11/0/92</Text>
              <Text style={styles.subText}>D.O.B</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/profile')}>
          <FontAwesome name="user" size={24} color="black" />
          <Text style={styles.buttonText}>My Profile</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/goals')}>
          <MaterialIcons name="local-drink" size={24} color="black" />
          <Text style={styles.buttonText}>Health & Nutrition Goals</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/orders')}>
          <FontAwesome name="shopping-bag" size={24} color="black" />
          <Text style={styles.buttonText}>My Orders</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/support')}>
          <AntDesign name="questioncircleo" size={24} color="black" />
          <Text style={styles.buttonText}>Support & Feedback</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/logout')}>
          <AntDesign name="logout" size={24} color="black" />
          <Text style={styles.buttonText}>Log Out</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Clinical Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clinical Profile</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/allergies')}>
          <FontAwesome name="exclamation-triangle" size={24} color="black" />
          <Text style={styles.buttonText}>Allergies</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/history')}>
          <MaterialIcons name="history" size={24} color="black" />
          <Text style={styles.buttonText}>Visits History</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('/(tabs)/documents')}>
          <AntDesign name="filetext1" size={24} color="black" />
          <Text style={styles.buttonText}>Medical Documents</Text>
          <MaterialIcons name="chevron-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Profile Picture</Text>
            <Button title="Choose from Gallery" onPress={() => {
              openImagePicker();
              setModalVisible(false);
            }} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
    position: 'relative', // Make this relative so pencil icon can be positioned outside the image
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 160, 
    height: 160, 
    borderRadius: 10, 
    backgroundColor: '#e0e0e0',
    marginRight:15,
  },
  pencilIcon: {
    position: 'absolute',
    top: -10,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  profileTextContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 0,
    marginVertical: 30,
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  subTextColumn: {
    alignItems: 'center',
  },
  subText: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
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
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});