import React, { useState } from 'react';
import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';

// Same background as other screens for consistency
const backgroundImage = { uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000' };
// Alternatives (uncomment if you prefer):
// const backgroundImage = { uri: 'https://picsum.photos/800/1600' };
// const backgroundImage = { uri: 'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?auto=format&fit=crop&q=80&w=2000' };

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sapId, setSapId] = useState('');

  const handleSubmit = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }
    if (!sapId.trim()) {
      Alert.alert('Error', 'Please enter your SAP ID.');
      return;
    }
    if (!age.trim()) {
      Alert.alert('Error', 'Please enter your age.');
      return;
    }

    // Show success with entered details
    Alert.alert(
      'Logged in successfully!',
      `Welcome!\n\nName: ${name}\nSAP ID: ${sapId}\nAge: ${age}`
    );

    // Optional: Uncomment to clear fields after success
    // setName(''); setSapId(''); setAge('');
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={globalStyles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 0.85 }} // Slight transparency for readability
    >
      <View style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.35)', // Dark overlay
      }}>
        <Image
          source={{ uri: 'https://riphah.rozee.pk/i/riphah/fb-logo.gif' }} // Riphah logo GIF
          // Alternative static logo if you prefer:
          // source={{ uri: 'https://jrcrs.riphah.edu.pk/wp-content/uploads/2017/05/RIU-logo.png' }}
          style={{
            width: 140,
            height: 140,
            marginBottom: 40,
            borderRadius: 70,
            borderWidth: 4,
            borderColor: '#ffffff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
          }}
        />

        <TextInput
          style={[globalStyles.input, {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#007bff',
            borderWidth: 2,
          }]}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[globalStyles.input, {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#007bff',
            borderWidth: 2,
          }]}
          placeholder="Enter your SAP ID "
          placeholderTextColor="#666"
          value={sapId}
          onChangeText={(text) => {
            // Allow only numbers
            if (/^\d*$/.test(text)) {
              setSapId(text);
            }
          }}
          keyboardType="numeric"
        />

        <TextInput
          style={[globalStyles.input, {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#007bff',
            borderWidth: 2,
          }]}
          placeholder="Enter your age"
          placeholderTextColor="#666"
          value={age}
          onChangeText={(text) => {
            // Allow only numbers
            if (/^\d*$/.test(text)) {
              setAge(text);
            }
          }}
          keyboardType="numeric"
        />

        {/* Live display – using array + React.Fragment for line breaks */}
        <Text
          style={{
            marginTop: 30,
            marginBottom: 40,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          }}
        >
          {[
            name ? `Name: ${name}` : 'Name= ',
            sapId ? `SAP ID: ${sapId}` : 'SAP ID= ',
            age ? `Age: ${age}` : 'Age= ',
          ].map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {'\n'}
            </React.Fragment>
          ))}
        </Text>

        {/* Submit Button */}
        <TouchableOpacity
          style={[globalStyles.button, {
            backgroundColor: '#28a745', // Green for success/login feel
            width: '70%',
            paddingVertical: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 5,
          }]}
          onPress={handleSubmit}
        >
          <Text style={[globalStyles.buttonText, { fontSize: 18 }]}>
            Submit / Log In
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}