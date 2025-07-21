import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import QRPaymentScreen from './screens/QRPaymentScreen';
import PaymentStatusScreen from './screens/PaymentStatusScreen';
import PaymentOptionScreen from './screens/PaymentOptionScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QRPayment" component={QRPaymentScreen} />
          <Stack.Screen name="PaymentStatus" component={PaymentStatusScreen} />
          <Stack.Screen name="PaymentOption" component={PaymentOptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}