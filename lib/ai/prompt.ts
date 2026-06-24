interface BuildStockSummaryPromptInput {
  symbol: string;
  companyName: string | null;
  price: number | null;
  changePercent: number | null;
}

export const buildStockSummaryPrompt = (input: BuildStockSummaryPromptInput): string => {
  const { symbol, companyName, price, changePercent } = input;

  return `
    Du är en finansassistent. Skriv en kort sammanfattning på svenska om aktien ${symbol}, Vad företaget gör och hur det har prestat de senaste dagarna.
    ${companyName ? `Företaget heter ${companyName}.` : ''}
    ${price !== null ? `Aktien har nu en pris på ${price}.` : ''}
    ${changePercent !== null ? `Aktien har ändrats med ${changePercent}%.` : ''}
    
    Regler:
    - Max 4 meningar.
    - Enkelt språk för en privat investerare.
    - Försök att ge en uppfattning om hur företaget presterat de senaste dagarna och i relation till branschen.
    - Inkludera information om aktien om den har stigit eller fallit i pris de senaste dagarna.
    - Rekommendera att köpa, sälja eller hålla aktien baserat på din analys.
    - Inkludera en kort analys av företagets finansiella situation.
    - Svara bara med sammanfattningen, ingen inledning eller slutning.
    `.trim();
};
