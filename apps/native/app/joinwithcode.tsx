import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function JoinFamilyScreen() {
  const [code, setCode] = useState('');
  const router = useRouter();
  const handleCreateFamilyCode = () => {
    router.push('/(tabs)');
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.container}>
      {/* Left-aligned content */}
      <View style={styles.leftContent}>
        <Text style={styles.title}>Family Plan</Text>
        <Text style={styles.description}>Type family code to join an existing family</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter family code"
          value={code}
          onChangeText={setCode}
        />
        {/* Join Button centered under the input field */}
        <TouchableOpacity style={styles.joinButton} onPress={handleCreateFamilyCode}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftContent: {
    paddingHorizontal: 30,
    alignItems: 'flex-start',
    paddingTop: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  description: {
    fontSize: 21,
    color: '#000',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '95%',
    borderColor: '#ADD8E6',  // Light blue border
    borderWidth: 2,  // Increased width for visibility
    paddingLeft: 10,
    marginTop: 20,
    borderRadius: 30,
  },
  joinButton: {
    marginTop: 40,  // 20px space between input and button
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignSelf: 'center',  // Centering the button
    width:300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
