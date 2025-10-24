import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, deleteCategory } from '../database/queries';
import { COLORS } from '../constants/colors';

export default function CategoriesScreen({ navigation }) {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('expense');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCategories();
    });

    return unsubscribe;
  }, [navigation, selectedTab]);

  const loadCategories = () => {
    const data = getCategories(user.id, selectedTab);
    setCategories(data);
  };

  const handleDelete = (category) => {
    if (category.is_default === 1) {
      Alert.alert('Error', 'No se pueden eliminar categorías predefinidas');
      return;
    }

    Alert.alert(
      'Eliminar Categoría',
      `¿Estás seguro que deseas eliminar "${category.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const result = deleteCategory(category.id);
            if (result.success) {
              loadCategories();
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  const handleEdit = (category) => {
    if (category.is_default === 1) {
      Alert.alert('Error', 'No se pueden editar categorías predefinidas');
      return;
    }

    navigation.navigate('AddCategory', { category });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleEdit(item)}
      onLongPress={() => handleDelete(item)}
    >
      <View style={styles.categoryLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: item.color },
          ]}
        >
          <Ionicons name={item.icon} size={28} color="#fff" />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          {item.is_default === 1 && (
            <Text style={styles.defaultBadge}>Predefinida</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'expense' && styles.tabActive,
            selectedTab === 'expense' && { borderBottomColor: COLORS.expense },
          ]}
          onPress={() => setSelectedTab('expense')}
        >
          <Ionicons
            name="arrow-up-circle"
            size={20}
            color={selectedTab === 'expense' ? COLORS.expense : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'expense' && { color: COLORS.expense },
            ]}
          >
            Gastos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'income' && styles.tabActive,
            selectedTab === 'income' && { borderBottomColor: COLORS.income },
          ]}
          onPress={() => setSelectedTab('income')}
        >
          <Ionicons
            name="arrow-down-circle"
            size={20}
            color={selectedTab === 'income' ? COLORS.income : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              selectedTab === 'income' && { color: COLORS.income },
            ]}
          >
            Ingresos
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddCategory')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    // borderBottomColor se aplica dinámicamente
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  list: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  defaultBadge: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});