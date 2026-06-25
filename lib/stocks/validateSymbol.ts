const SYMBOL_PATTERN = /^[A-Z0-9][A-Z0-9.-]{0,14}$/;

export type ValidateSymbolResult =
  | { success: true; symbol: string }
  | { success: false; error: string };

export const validateSymbol = (rawSymbol: string): ValidateSymbolResult => {
  const symbol = rawSymbol.trim().toUpperCase();

  if (!symbol) return { success: false, error: 'Symbol is required' };

  if (!SYMBOL_PATTERN.test(symbol)) return { success: false, error: 'Invalid symbol format' };

  return { success: true, symbol };
};
