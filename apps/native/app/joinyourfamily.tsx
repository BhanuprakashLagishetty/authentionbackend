import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FamilyCodeScreen() {
  const [familyCode, setFamilyCode] = useState('');

  // Function to generate a random 5-character alphanumeric code
  const generateFamilyCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  useEffect(() => {
    // Generate code when component loads
    setFamilyCode(generateFamilyCode());
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Here is our unique family code: ${familyCode}`,
      });
    } catch (error) {
      alert('Error sharing the code');
    }
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.container}>
      {/* Left-aligned content for title */}
      <View style={styles.leftContent}>
        <Text style={styles.title}>Family Plan</Text>
      </View>

      {/* Centered content for family code and share button */}
      <View style={styles.centerContent}>
        <Text style={styles.description}>Your unique family code:</Text>
        <Text style={styles.code}>#{familyCode}</Text>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 0,
  },
  leftContent: {
    paddingHorizontal: 30,
    alignItems: 'flex-start',
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    paddingVertical: 40,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // This centers the content in the middle of the screen

  },
  description: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:-500,
  },
  code: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
    marginBottom: 40,
  },
  shareButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
