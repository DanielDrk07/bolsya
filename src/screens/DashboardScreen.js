import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardStats } from '../database/queries';
import { COLORS } from '../constants/colors';
import { getStartOfMonth, getEndOfMonth, getCurrentMonthYear } from '../utils/dateUtils';
import StatCard from '../components/StatCard';
import CategoryChart from '../components/CategoryChart';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expensesByCategory: [],
    incomesByCategory: [],
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
    
    // Recargar stats cuando la pantalla recibe foco
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });

    return unsubscribe;
  }, [navigation]);

  const loadStats = () => {
    const startDate = getStartOfMonth();
    const endDate = getEndOfMonth();
    const data = getDashboardStats(user.id, startDate, endDate);
    setStats(data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStats();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {user?.email?.split('@')[0]}</Text>
        <Text style={styles.period}>{getCurrentMonthYear()}</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Balance"
          amount={stats.balance}
          icon="wallet"
          color={stats.balance >= 0 ? COLORS.success : COLORS.danger}
        />
        
        <View style={styles.row}>
          <View style={styles.halfCard}>
            <StatCard
              title="Ingresos"
              amount={stats.totalIncome}
              icon="arrow-down-circle"
              color={COLORS.income}
            />
          </View>
          
          <View style={styles.halfCard}>
            <StatCard
              title="Gastos"
              amount={stats.totalExpense}
              icon="arrow-up-circle"
              color={COLORS.expense}
            />
          </View>
        </View>
      </View>

      {stats.expensesByCategory.length > 0 && (
        <CategoryChart
          data={stats.expensesByCategory}
          title="Gastos por Categoría"
        />
      )}

      {stats.incomesByCategory.length > 0 && (
        <CategoryChart
          data={stats.incomesByCategory}
          title="Ingresos por Categoría"
        />
      )}

      {stats.expensesByCategory.length === 0 && stats.incomesByCategory.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>¡Comienza a registrar!</Text>
          <Text style={styles.emptyText}>
            No tienes transacciones este mes. Ve a la pestaña de Transacciones para agregar tu primera entrada.
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Transactions')}
          >
            <Text style={styles.emptyButtonText}>Agregar Transacción</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  period: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  emptyState: {
    backgroundColor: COLORS.card,
    margin: 20,
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});