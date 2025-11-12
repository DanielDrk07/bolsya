// src/services/userService.js

/**
 * Obtiene los datos financieros del usuario.
 * @returns {Promise<object>} - Un objeto con los datos financieros del usuario.
 */
export const getUserFinancialData = async () => {
  // En una aplicación real, obtendrías estos datos de tu base de datos.
  // Por ahora, devolveremos datos simulados.
  return Promise.resolve({
    income: 5000,
    expenses: 4500,
    spendingByCategory: {
      food: 1500,
      transport: 800,
      entertainment: 1200,
      utilities: 1000,
    },
    savings: 500,
  });
};
