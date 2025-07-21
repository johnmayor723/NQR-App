import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const paymentOptions = [
  { key: 'barcode', label: 'Barcode' },
  { key: 'qrcode', label: 'QR Code' },
  { key: 'ussd', label: 'USSD' },
  { key: 'transfer', label: 'Transfer' },
];

export default function PaymentOptionScreen({ route }) {
  const { amount } = route.params;
  const { operator } = useContext(AuthContext);
  const theme = useTheme();

  const primaryColor = operator?.primaryColor || theme.colors.primary;
  const secondaryColor = operator?.secondaryColor || '#C8FF00';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        { borderColor: primaryColor, backgroundColor: '#fff' },
      ]}
      onPress={() => {
        // Placeholder: Handle navigation or modal here
      }}
    >
      <Text variant="titleMedium" style={{ color: primaryColor, fontWeight: 'bold' }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={{
          color: primaryColor,
          marginBottom: 20,
          fontWeight: 'bold',
          fontSize: 24,
          textAlign: 'center',
        }}
      >
        Payment Options for ₦{amount || '0.00'}
      </Text>

      <FlatList
        data={paymentOptions}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 15 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  optionCard: {
    flex: 1,
    padding: 20,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});