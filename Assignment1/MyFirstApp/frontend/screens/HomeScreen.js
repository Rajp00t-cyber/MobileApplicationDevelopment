import React, { useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import globalStyles from '../styles/globalStyles';

// Keep the splash screen visible until fonts are ready
SplashScreen.preventAutoHideAsync();

const backgroundImage = { uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000' };

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Bold': Roboto_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (fontError) {
      console.warn('Font loading error:', fontError);
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={globalStyles.container}
      resizeMode="cover"
      onLayout={onLayoutRootView}
    >
      <Text
        style={[
          globalStyles.title,
          {
            fontFamily: 'Roboto-Bold',
            color: '#fff',
            textShadowColor: 'rgba(0,0,0,0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
          },
        ]}
      >
        Student App
      </Text>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={globalStyles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={globalStyles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Contact')}
      >
        <Text style={globalStyles.buttonText}>Go to Contact</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}