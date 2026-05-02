import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '../styles/globalStyles';

// Same background as Home & Profile for consistency
const backgroundImage = { uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000' };
// Alternative calmer options if you prefer:
// const backgroundImage = { uri: 'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg' };
// const backgroundImage = { uri: 'https://www.rokform.com/cdn/shop/articles/landscape-phone-wallpaper_b8842cd8-bc8b-41cb-bdc7-d781b673fb6a.jpg?v=1765602993&width=1200' };

export default function ContactScreen() {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    Alert.alert('Success', `Email submitted: ${email}`);
    setEmail('');
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={globalStyles.container}
      resizeMode="cover"
      imageStyle={{ opacity: 0.85 }} // Slight fade so form elements are clear
    >
      {/* Semi-transparent overlay for better contrast */}
      <View style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay – adjust 0.3–0.5 if needed
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '85%',
          marginBottom: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // White-ish bg for input row
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1.5,
          borderColor: '#007bff',
        }}>
          <Ionicons name="mail-outline" size={28} color="#007bff" style={{ marginRight: 12 }} />
          <TextInput
            style={[globalStyles.input, {
              flex: 1,
              marginLeft: 0,
              backgroundColor: 'transparent', // No extra bg needed
              borderWidth: 0, // Remove border since we have container border
            }]}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[globalStyles.button, {
            backgroundColor: '#007bff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 5, // Android shadow
          }]}
          onPress={handleSubmit}
        >
          <Text style={globalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
