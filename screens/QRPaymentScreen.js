import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { generateNQR } from '../handlers/apiService';
import QRCode from 'react-native-qrcode-svg';

export default function QRPaymentScreen({ navigation }) {
  const { operator } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [nqrData, setNqrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const primaryColor = operator?.primaryColor || '#FF6B00'; // orange fallback
  const secondaryColor = operator?.secondaryColor || '#C8FF00'; // lemon fallback

  const handleGenerate = async () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    setLoading(true);
    const payload = {
      operatorId: operator._id,
      amount,
    };
    try {
      const res = await generateNQR(payload);
      setNqrData(res.data.qr_code || res.data.link); // Adjust based on your backend return
    } catch (err) {
      console.error(err);
      alert('Failed to generate NQR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      {!nqrData ? (
        <>
          <Text style={[styles.title, { color: primaryColor }]}>Enter Amount</Text>
          <TextInput
            style={[styles.input, { borderColor: secondaryColor }]}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="₦0.00"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: primaryColor }]}
            onPress={handleGenerate}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate QR Code'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.qrContainer}>
          <Text style={[styles.title, { color: primaryColor }]}>Scan to Pay</Text>
          <View style={styles.qrBox}>
            <QRCode value={nqrData} size={250} />
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: secondaryColor }]}
            onPress={() => navigation.navigate('PaymentStatus')}
          >
            <Text style={styles.buttonText}>Check Payment Status</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    width: '80%',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qrContainer: { alignItems: 'center' },
  qrBox: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    marginVertical: 20,
  },
});
