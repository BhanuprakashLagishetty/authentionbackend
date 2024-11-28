import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Voice from '@react-native-voice/voice';
import * as Permissions from 'expo-permissions'; // Expo permissions

// Define the type for recent activity items
interface RecentActivity {
  id: number;
  name: string;
  avatar: any;
}

export default function WellnessScreen() {
  const [searchText, setSearchText] = useState('');
  const [listening, setListening] = useState(false); // Listening state for mic
  const router = useRouter();

  // Request microphone permissions and set up Voice listeners
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status !== 'granted') {
        Alert.alert('Permission required', 'This app needs access to your microphone.');
      }
    };

    getPermissions();

    // Bind voice recognition events
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    // Clean up listeners on component unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Start listening for voice input
  const startListening = async () => {
    try {
      console.log('Attempting to start listening...');
      setListening(true);
      await Voice.start('en-US'); // Start listening in English (US)
      console.log('Listening started');
    } catch (e) {
      console.error('Failed to start listening:', e);
      setListening(false);
    }
  };

  // Stop listening for voice input
  const stopListening = async () => {
    try {
      console.log('Stopping listening...');
      setListening(false);
      await Voice.stop();
      console.log('Listening stopped');
    } catch (e) {
      console.error('Failed to stop listening:', e);
    }
  };

  const onSpeechStart = () => {
    console.log('Voice recognition started');
  };

  const onSpeechEnd = () => {
    console.log('Voice recognition ended');
    setListening(false);
  };

  const onSpeechResults = (result: any) => {
    const spokenText = result.value[0]; // Take the first recognized phrase
    console.log('Speech results:', spokenText);
    setSearchText(spokenText);
  };

  // Example data for professional coaches
  const [coaches, setCoaches] = useState([
    {
      id: 1,
      name: 'Rohit Rathore',
      specialty: 'Dietician',
      rating: 4.6,
      status: 'Available Now',
      image: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 2,
      name: 'Rohit Rathore',
      specialty: 'Dietician',
      rating: 4.6,
      status: 'Slots Booked',
      image: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 3,
      name: 'Rohit Rathore',
      specialty: 'Dietician',
      rating: 4.6,
      status: 'Available in 30 Mins',
      image: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 4,
      name: 'Rohit Rathore',
      specialty: 'Dietician',
      rating: 4.6,
      status: 'Available in 30 Mins',
      image: require('../../assets/images/image1.jpeg'),
    },
  ]);

  // Example recent activities
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      name: 'Weight Loss Expert',
      avatar: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 2,
      name: 'Weight Loss Expert',
      avatar: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 3,
      name: 'Weight Loss Expert',
      avatar: require('../../assets/images/image1.jpeg'),
    },
    {
      id: 4,
      name: 'Weight Loss Expert',
      avatar: require('../../assets/images/image1.jpeg'),
    },
  ]);

  const handlePress = () => {
    router.push('/404'); // Navigate to a 404 page when pressing an item
  };

  const renderRecentActivity = ({ item }: { item: RecentActivity }) => (
    <TouchableOpacity style={styles.recentItem} onPress={handlePress}>
      <Image source={item.avatar} style={styles.recentAvatar} />
      <Text style={styles.recentName}>{item.name}</Text>
      <Text style={styles.expertName}>Rohit Rathore</Text>
    </TouchableOpacity>
  );

  const getStatusStyle = (status: string) => {
    if (status === 'Available Now') {
      return { color: 'green' };
    } else if (status === 'Slots Booked') {
      return { color: 'grey' };
    } else if (status === 'Available in 30 Mins') {
      return { color: 'orange' };
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search For Doctors"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={listening ? stopListening : startListening} // Toggle listening state
          >
            <FontAwesome name="microphone" size={20} color={listening ? 'red' : '#000'} />
          </TouchableOpacity>
        </View>

        {/* Recent Section */}
        <View style={styles.recentsContainer}>
          <Text style={styles.sectionTitle}>Recents</Text>
          <FlatList
            data={recentActivities}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecentActivity}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Professional Coaches Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Professional Coaches</Text>
        </View>

        {/* Coaches List */}
        {coaches.map((coach) => (
          <TouchableOpacity key={coach.id} style={styles.coachCard} onPress={handlePress}>
            <Image source={coach.image} style={styles.coachImage} />
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachSpecialty}>{coach.specialty}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="green" />
                <Text style={styles.coachRating}>{coach.rating}</Text>
              </View>
              <Text style={[styles.coachStatus, getStatusStyle(coach.status)]}>{coach.status}</Text>
            </View>
            <TouchableOpacity style={styles.appointmentButton} onPress={handlePress}>
              <Text style={styles.appointmentText}>Appointment</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIconContainer: {
    marginLeft: 10,
  },
  recentsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  recentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  recentName: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  expertName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  coachImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coachSpecialty: {
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachRating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  coachStatus: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  appointmentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  appointmentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
