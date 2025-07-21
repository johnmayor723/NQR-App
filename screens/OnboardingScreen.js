import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import { onboardOperator } from '../handlers/apiService';

export default function OnboardingScreen({ navigation }) {
  const { saveOperator } = useContext(AuthContext);
  const [companyName, setCompanyName] = useState('');
  const [tid, setTid] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [logoUri, setLogoUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access media library is required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Skipping validation and API connection for now
    // Navigate to Home immediately for testing flow
    navigation.replace('Home');

    // If you want to reconnect API later, use this structure:
    /*
    const operatorData = {
      companyName,
      tids: [tid],
      companyEmail,
      primaryColor,
      secondaryColor,
      logoUri
    };
    try {
      const res = await onboardOperator(operatorData);
      saveOperator(res.operator);
      navigation.replace('Home');
    } catch (err) {
      console.error(err);
      alert('Onboarding failed.');
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="titleLarge"
        style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 24 }}
      >
        Operator Onboarding
      </Text>

      <Button mode="outlined" icon="image" onPress={pickImage} style={styles.button}>
        {logoUri ? "Change Logo" : "Upload Logo"}
      </Button>
      {logoUri && (
        <Image source={{ uri: logoUri }} style={styles.logo} />
      )}

      <TextInput
        label="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Terminal ID (TID)"
        value={tid}
        onChangeText={setTid}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Company Email"
        value={companyEmail}
        onChangeText={setCompanyEmail}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Primary Color (#hex)"
        value={primaryColor}
        onChangeText={setPrimaryColor}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Secondary Color (#hex)"
        value={secondaryColor}
        onChangeText={setSecondaryColor}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: { width: '100%', marginBottom: 10 },
  button: { marginVertical: 10, width: '100%' },
  logo: { width: 150, height: 150, borderRadius: 10, marginVertical: 15 },
});