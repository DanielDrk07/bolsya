import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { createCategory, updateCategory } from '../database/queries';
import { COLORS } from '../constants/colors';

const AVAILABLE_ICONS = [
  'fast-food', 'car', 'home', 'flash', 'game-controller', 'medical',
  'school', 'cart', 'cash', 'briefcase', 'trending-up', 'wallet',
  'card', 'gift', 'shirt', 'fitness', 'airplane', 'phone', 'laptop',
  'restaurant', 'cafe', 'pizza', 'beer', 'paw', 'construct', 'train',
];

const AVAILABLE_COLORS = [
  '#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e',
];

export default function AddCategoryScreen({ navigation, route }) {
  const { user } = useAuth();
  const { category } = route.params || {};
  const isEditing = !!category;

  const [name, setName] = useState(category?.name || '');
  const [type, setType] = useState(category?.type || 'expense');
  const [selectedColor, setSelectedColor] = useState(category?.color || AVAILABLE_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(category?.icon || AVAILABLE_ICONS[0]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría');
      return;
    }

    if (isEditing) {
      const result = updateCategory(category.id, name.trim(), selectedColor, selectedIcon);
      if (result.success) {
        Alert.alert('Éxito', 'Categoría actualizada', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', result.error);
      }
    } else {
      const result = createCategory(user.id, name.trim(), type, selectedColor, selectedIcon);
      if (result.success) {
        Alert.alert('Éxito', 'Categoría creada', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', result.error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.previewContainer}>
          <View
            style={[
              styles.preview,
              { backgroundColor: selectedColor },
            ]}
          >
            <Ionicons name={selectedIcon} size={48} color="#fff" />
          </View>
          <Text style={styles.previewName}>{name || 'Nombre de categoría'}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Restaurantes"
            value={name}
            onChangeText={setName}
            maxLength={30}
          />
        </View>

        {!isEditing && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'expense' && styles.typeButtonActive,
                  type === 'expense' && { backgroundColor: COLORS.expense },
                ]}
                onPress={() => setType('expense')}
              >
                <Ionicons
                  name="arrow-up-circle"
                  size={24}
                  color={type === 'expense' ? '#fff' : COLORS.expense}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    type === 'expense' && styles.typeButtonTextActive,
                  ]}
                >
                  Gasto
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === 'income' && styles.typeButtonActive,
                  type === 'income' && { backgroundColor: COLORS.income },
                ]}
                onPress={() => setType('income')}
              >
                <Ionicons
                  name="arrow-down-circle"
                  size={24}
                  color={type === 'income' ? '#fff' : COLORS.income}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    type === 'income' && styles.typeButtonTextActive,
                  ]}
                >
                  Ingreso
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorGrid}>
            {AVAILABLE_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Icono</Text>
          <View style={styles.iconGrid}>
            {AVAILABLE_ICONS.map((icon) => (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconOption,
                  selectedIcon === icon && {
                    backgroundColor: selectedColor,
                    borderColor: selectedColor,
                  },
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Ionicons
                  name={icon}
                  size={24}
                  color={selectedIcon === icon ? '#fff' : selectedColor}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Actualizar' : 'Crear'} Categoría
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  previewName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    gap: 8,
  },
  typeButtonActive: {
    borderColor: 'transparent',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorOptionSelected: {
    elevation: 4,
    shadowOpacity: 0.3,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});