import { GoogleGenAI } from "@google/genai";

// IMPORTANTE: Reemplaza con tu API Key de Gemini
const API_KEY = "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAIResponse = async (userMessage, financialContext) => {
  try {
    // Construir el contexto financiero
    const context = buildFinancialContext(financialContext);

    // Prompt del sistema
    const prompt = `Eres un asistente financiero personal experto. Analiza los datos financieros del usuario y proporciona recomendaciones personalizadas, consejos de ahorro y análisis detallados.

DATOS FINANCIEROS DEL USUARIO:
${context}

INSTRUCCIONES:
- Sé conciso y directo
- Usa emojis cuando sea apropiado
- Proporciona consejos accionables
- Menciona cifras específicas del usuario
- Sé empático y motivador
- Responde en español
- Si no tienes suficiente información, pídela de manera amable

Pregunta del usuario: ${userMessage}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo gratuito correcto
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);

    // Manejo específico de errores de cuota
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      throw new Error(
        "⏳ Has alcanzado el límite de solicitudes. Por favor espera un momento e intenta de nuevo."
      );
    }

    // Error de modelo no encontrado
    if (
      error.message?.includes("404") ||
      error.message?.includes("not found")
    ) {
      throw new Error(
        "🔧 Modelo no disponible. Verifica tu API Key en Google AI Studio."
      );
    }

    throw new Error("No pude procesar tu mensaje. Por favor intenta de nuevo.");
  }
};

function buildFinancialContext(context) {
  if (!context) {
    return "No hay datos financieros disponibles.";
  }

  const { stats, recentTransactions, categories } = context;

  // Función local para formatear moneda
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  let contextText = "**RESUMEN DEL MES ACTUAL:**\n";
  contextText += `- Balance: ${formatMoney(stats.balance)}\n`;
  contextText += `- Ingresos totales: ${formatMoney(stats.totalIncome)}\n`;
  contextText += `- Gastos totales: ${formatMoney(stats.totalExpense)}\n\n`;

  if (stats.expensesByCategory.length > 0) {
    contextText += "**GASTOS POR CATEGORÍA:**\n";
    stats.expensesByCategory.forEach((cat) => {
      const percentage =
        stats.totalExpense > 0
          ? ((cat.total / stats.totalExpense) * 100).toFixed(1)
          : 0;
      contextText += `- ${cat.name}: ${formatMoney(
        cat.total
      )} (${percentage}%)\n`;
    });
    contextText += "\n";
  }

  if (stats.incomesByCategory.length > 0) {
    contextText += "**INGRESOS POR CATEGORÍA:**\n";
    stats.incomesByCategory.forEach((cat) => {
      contextText += `- ${cat.name}: ${formatMoney(cat.total)}\n`;
    });
    contextText += "\n";
  }

  if (recentTransactions.length > 0) {
    contextText += "**ÚLTIMAS 10 TRANSACCIONES:**\n";
    recentTransactions.forEach((tx) => {
      const sign = tx.type === "income" ? "+" : "-";
      contextText += `- ${tx.category_name}: ${sign}${formatMoney(tx.amount)}`;
      if (tx.description) {
        contextText += ` (${tx.description})`;
      }
      contextText += "\n";
    });
  }

  return contextText;
}
