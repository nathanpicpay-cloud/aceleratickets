import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventDescription = async (
  title: string,
  category: string,
  keyDetails: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um copywriter profissional para uma plataforma de ingressos premium e futurista.
      Escreva uma descrição de evento envolvente, emocionante e otimizada para SEO em PORTUGUÊS (Brasil) com os seguintes detalhes:
      
      Título: ${title}
      Categoria: ${category}
      Detalhes Chave: ${keyDetails}
      
      Mantenha o tom profissional, mas empolgante e moderno. Use aproximadamente 150 palavras.
      Formate com parágrafos claros. Não use cabeçalhos Markdown (#), apenas texto simples com espaçamento.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Não foi possível gerar a descrição. Tente novamente.";
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    return "Ocorreu um erro ao gerar a descrição. Por favor, tente manualmente.";
  }
};