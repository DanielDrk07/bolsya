import db from './database';
import * as Crypto from 'expo-crypto';
import { DEFAULT_CATEGORIES } from '../constants/defaultCategories';

// ============ USUARIOS ============

export const createUser = async (email, password) => {
  try {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const result = db.runSync(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );

    // Crear categorías predefinidas para el nuevo usuario
    const userId = result.lastInsertRowId;
    createDefaultCategories(userId);

    return { success: true, userId };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    const user = db.getFirstSync(
      'SELECT * FROM users WHERE email = ? AND password_hash = ?',
      [email, passwordHash]
    );

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Credenciales incorrectas' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

// ============ CATEGORÍAS ============

export const createDefaultCategories = (userId) => {
  try {
    DEFAULT_CATEGORIES.forEach((category) => {
      db.runSync(
        'INSERT INTO categories (user_id, name, type, color, icon, is_default) VALUES (?, ?, ?, ?, ?, 1)',
        [userId, category.name, category.type, category.color, category.icon]
      );
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating default categories:', error);
    return { success: false, error: error.message };
  }
};

export const createCategory = (userId, name, type, color, icon) => {
  try {
    const result = db.runSync(
      'INSERT INTO categories (user_id, name, type, color, icon, is_default) VALUES (?, ?, ?, ?, ?, 0)',
      [userId, name, type, color, icon]
    );
    return { success: true, categoryId: result.lastInsertRowId };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: error.message };
  }
};

export const getCategories = (userId, type = null) => {
  try {
    let query = 'SELECT * FROM categories WHERE user_id = ?';
    let params = [userId];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY name ASC';

    const categories = db.getAllSync(query, params);
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

export const updateCategory = (categoryId, name, color, icon) => {
  try {
    db.runSync(
      'UPDATE categories SET name = ?, color = ?, icon = ? WHERE id = ?',
      [name, color, icon, categoryId]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message };
  }
};

export const deleteCategory = (categoryId) => {
  try {
    // Verificar si es categoría predefinida
    const category = db.getFirstSync('SELECT is_default FROM categories WHERE id = ?', [categoryId]);
    
    if (category && category.is_default === 1) {
      return { success: false, error: 'No se pueden eliminar categorías predefinidas' };
    }

    db.runSync('DELETE FROM categories WHERE id = ?', [categoryId]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message };
  }
};

// ============ TRANSACCIONES ============

export const createTransaction = (userId, categoryId, amount, type, date, description = '') => {
  try {
    const result = db.runSync(
      'INSERT INTO transactions (user_id, category_id, amount, type, date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, categoryId, amount, type, date, description]
    );
    return { success: true, transactionId: result.lastInsertRowId };
  } catch (error) {
    console.error('Error creating transaction:', error);
    return { success: false, error: error.message };
  }
};

export const getTransactions = (userId, startDate = null, endDate = null) => {
  try {
    let query = `
      SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
    `;
    let params = [userId];

    if (startDate && endDate) {
      query += ' AND t.date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY t.date DESC, t.created_at DESC';

    const transactions = db.getAllSync(query, params);
    return transactions;
  } catch (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
};

export const getTransactionById = (transactionId) => {
  try {
    const transaction = db.getFirstSync(
      'SELECT * FROM transactions WHERE id = ?',
      [transactionId]
    );
    return transaction;
  } catch (error) {
    console.error('Error getting transaction:', error);
    return null;
  }
};

export const updateTransaction = (transactionId, categoryId, amount, date, description) => {
  try {
    db.runSync(
      'UPDATE transactions SET category_id = ?, amount = ?, date = ?, description = ? WHERE id = ?',
      [categoryId, amount, date, description, transactionId]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating transaction:', error);
    return { success: false, error: error.message };
  }
};

export const deleteTransaction = (transactionId) => {
  try {
    db.runSync('DELETE FROM transactions WHERE id = ?', [transactionId]);
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return { success: false, error: error.message };
  }
};

// ============ ESTADÍSTICAS ============

export const getDashboardStats = (userId, startDate, endDate) => {
  try {
    // Total de ingresos
    const incomeResult = db.getFirstSync(
      'SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = ? AND type = "income" AND date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );

    // Total de gastos
    const expenseResult = db.getFirstSync(
      'SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = ? AND type = "expense" AND date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );

    // Gastos por categoría
    const expensesByCategory = db.getAllSync(
      `SELECT c.name, c.color, c.icon, COALESCE(SUM(t.amount), 0) as total
       FROM categories c
       LEFT JOIN transactions t ON c.id = t.category_id AND t.date BETWEEN ? AND ?
       WHERE c.user_id = ? AND c.type = "expense"
       GROUP BY c.id, c.name, c.color, c.icon
       HAVING total > 0
       ORDER BY total DESC`,
      [startDate, endDate, userId]
    );

    // Ingresos por categoría
    const incomesByCategory = db.getAllSync(
      `SELECT c.name, c.color, c.icon, COALESCE(SUM(t.amount), 0) as total
       FROM categories c
       LEFT JOIN transactions t ON c.id = t.category_id AND t.date BETWEEN ? AND ?
       WHERE c.user_id = ? AND c.type = "income"
       GROUP BY c.id, c.name, c.color, c.icon
       HAVING total > 0
       ORDER BY total DESC`,
      [startDate, endDate, userId]
    );

    return {
      totalIncome: incomeResult.total,
      totalExpense: expenseResult.total,
      balance: incomeResult.total - expenseResult.total,
      expensesByCategory,
      incomesByCategory,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      expensesByCategory: [],
      incomesByCategory: [],
    };
  }
};