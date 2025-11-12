// src/services/aiService.js
import { getInitialPrompt, getFollowUpPrompt } from '../database/prompts';

/**
 * Obtiene consejos financieros de la IA basados en los datos y la entrada del usuario.
 * @param {object} userData - Datos financieros del usuario.
 * @param {string} userInput - La entrada del usuario desde el chat.
 * @returns {Promise<string>} - Una cadena con consejos financieros.
 */
export const getFinancialAdvice = async (userData, userInput) => {
  // Aquí es donde te comunicarías con tu modelo de IA.
  // Utilizaremos los prompts para construir la solicitud.
  const initialPrompt = getInitialPrompt();
  const followUpPrompt = getFollowUpPrompt();

  console.log('Datos del usuario para la IA:', userData);
  console.log('Entrada del usuario para la IA:', userInput);
  console.log('Prompt inicial:', initialPrompt);
  console.log('Prompt de seguimiento:', followUpPrompt);

  if (userInput.toLowerCase().includes('ahorrar')) {
    return Promise.resolve('Para ahorrar más, considera crear un presupuesto y hacer un seguimiento de tus gastos. Tu mayor gasto es en comida, con un total de 1500. Intenta reducir las salidas a comer.');
  } else if (userInput.toLowerCase().includes('ingresos')) {
    return Promise.resolve(`Tus ingresos son de 5000. Si quieres aumentarlos, podrías considerar un trabajo extra o pedir un aumento.`);
  } else {
    return Promise.resolve('Basado en tus gastos, parece que estás gastando más de lo que ganas. Intenta reducir tus gastos no esenciales.');
  }
};
