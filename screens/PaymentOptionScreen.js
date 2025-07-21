import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const paymentOptions = [
  { key: 'barcode', label: 'Barcode' },
  { key: 'qrcode', label: 'QR Code' },
  { key: 'ussd', label: 'USSD' },
  { key: 'transfer', label: 'Transfer' },
];

export default function PaymentOptionScreen({ route, navigation }) {
  const { amount } = route.params;
  const { operator } = useContext(AuthContext);
  const theme = useTheme();

  const primaryColor = operator?.primaryColor || theme.colors.primary;
  const secondaryColor = operator?.secondaryColor || '#C8FF00';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        { backgroundColor: primaryColor },
      ]}
      onPress={() => {
        // Placeholder: Handle navigation or modal here
      }}
    >
      <Text
        variant="titleMedium"
        style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <IconButton
          icon="arrow-left"
          size={28}
          iconColor={primaryColor}
          onPress={() => navigation.goBack()}
        />
        <Text
          variant="titleLarge"
          style={{
            color: primaryColor,
            fontWeight: 'bold',
            fontSize: 26,
            marginLeft: 10,
          }}
        >
          Payment Options
        </Text>
      </View>

      <Text
        style={{
          color: primaryColor,
          fontWeight: '600',
          fontSize: 18,
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Pay ₦{amount || '0.00'}
      </Text>

      {/* FlatList */}
      <FlatList
        data={paymentOptions}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listContent: {
    paddingTop: 50, // creates space between header and list
  },
  optionCard: {
    flex: 1,
    paddingVertical: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});