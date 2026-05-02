import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const containerStyle = {
    ...globalStyles.container,
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
  };

  const titleStyle = {
    ...globalStyles.title,
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>Dark Mode</Text>
      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
}