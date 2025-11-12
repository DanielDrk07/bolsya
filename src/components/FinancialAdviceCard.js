
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFinancialAdvice } from '../services/aiService';
import { getUserFinancialData } from '../services/userService';

const FinancialAdviceCard = () => {
  const [advice, setAdvice] = useState('Cargando consejo...');

  const fetchAdvice = async () => {
    const userData = await getUserFinancialData();
    const newAdvice = await getFinancialAdvice(userData);
    setAdvice(newAdvice);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Consejo del Día</Text>
      <Text style={styles.adviceText}>{advice}</Text>
      <TouchableOpacity onPress={fetchAdvice} style={styles.button}>
        <Text style={styles.buttonText}>Nuevo Consejo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FinancialAdviceCard;
