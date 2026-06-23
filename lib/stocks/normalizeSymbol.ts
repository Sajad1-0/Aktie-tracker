const toFinnhubSymbol = (symbol: string): string => {
  const upper = symbol.trim().toUpperCase();

  // Already has exchange suffix (AAPL, VOLV-B.ST, etc.)
  if (upper.includes('.')) return upper;

  // Heuristic: Swedish share classes often end with -A / -B
  if (/^[A-Z0-9]+-[A-Z]$/.test(upper)) return `${upper}.ST`;

  return upper;
};

export default toFinnhubSymbol;
