export interface StockQuote {
  symbol: string;
  apiSymbol: string;
  name: string | null;
  price: number | null;
  changePercent: number | null;
  error: string | null;
}
