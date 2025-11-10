import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { formatCurrency } from '../utils/numberUtils';

export default function StatCard({ title, amount, icon, color, type }) {
  return (
    <View style={[styles.card, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.amount, { color }]}>
        {formatCurrency(amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});