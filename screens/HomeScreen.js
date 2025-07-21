import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { operator } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const theme = useTheme();
  const primaryColor = operator?.primaryColor || theme.colors.primary; // orange
  const secondaryColor = operator?.secondaryColor || '#C8FF00'; // lemon

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#fff' }]}
      behavior="padding"
    >
      <View style={styles.header}>
        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation.replace('Onboarding')}>
          <Feather name="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>

        {/* Logo */}
        {operator?.logoUri && (
          <Image source={{ uri: operator.logoUri }} style={styles.logo} />
        )}

        {/* Title */}
        <Text
          variant="titleLarge"
          style={{ color: primaryColor, fontWeight: 'bold', fontSize: 24 }}
        >
          Make Payment
        </Text>
      </View>

      <TextInput
        label="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        placeholder="₦0.00"
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon={() => <Feather name="credit-card" size={20} color={primaryColor} />} />}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate('PaymentOption', { amount })}
        style={[styles.button, { backgroundColor: primaryColor }]}
        labelStyle={{ fontSize: 18 }}
      >
        Proceed to Payment
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 40, height: 40, borderRadius: 5 },
  input: { marginVertical: 20, fontSize: 18 },
  button: { paddingVertical: 10 },
});
