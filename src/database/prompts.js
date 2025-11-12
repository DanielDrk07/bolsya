// src/database/prompts.js

export const getInitialPrompt = () => {
  return "Eres un asesor financiero personal. Analiza los siguientes datos de usuario y proporciona consejos claros y concisos.";
};

export const getFollowUpPrompt = () => {
  return "Basado en la conversación anterior, proporciona más detalles sobre...";
};
