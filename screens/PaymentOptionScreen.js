import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const paymentOptions = [
  { key: 'barcode', label: 'Barcode', icon: 'barcode' },
  { key: 'qrcode', label: 'QR Code', icon: 'qrcode' },
  { key: 'ussd', label: 'USSD', icon: 'smartphone' },
  { key: 'transfer', label: 'Transfer', icon: 'repeat' },
];

export default function PaymentOptionScreen({ route }) {
  const { amount } = route.params;
  const { operator } = useContext(AuthContext);

  const primaryColor = operator?.primaryColor || '#FF6B00';
  const secondaryColor = operator?.secondaryColor || '#C8FF00';

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.optionCard, { borderColor: primaryColor }]}>
      <Feather name={item.icon} size={40} color={secondaryColor} />
      <Text variant="titleMedium" style={{ marginTop: 10 }}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ color: primaryColor, marginBottom: 20 }}>
        Payment Options for ₦{amount || '0.00'}
      </Text>

      <FlatList
        data={paymentOptions}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  optionCard: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
