import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    const loadOperator = async () => {
      const data = await AsyncStorage.getItem('operator');
      if (data) setOperator(JSON.parse(data));
    };
    loadOperator();
  }, []);

  const saveOperator = async (data) => {
    await AsyncStorage.setItem('operator', JSON.stringify(data));
    setOperator(data);
  };

  return (
    <AuthContext.Provider value={{ operator, saveOperator }}>
      {children}
    </AuthContext.Provider>
  );
};
