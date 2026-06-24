import { StockQuote } from '../stocks/types';
import { buildStockSummaryPrompt } from './prompt';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const generateStockSummary = async (quote: StockQuote): Promise<string | null> => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = buildStockSummaryPrompt({
    symbol: quote.symbol,
    companyName: quote.name,
    price: quote.price,
    changePercent: quote.changePercent,
  });

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt,
    });

    const summary = text.trim();

    if (summary.length === 0) throw new Error('AI returned an empty summary');

    return summary;
  } catch (error) {
    console.error(error);
    return null;
  }
};
