export const currencies = {
  Eswatini: {
    symbol: "E",
    rate: 1,
  },

  "South Africa": {
    symbol: "R",
    rate: 1,
  },

  Lesotho: {
    symbol: "L",
    rate: 1,
  },

  Kenya: {
    symbol: "KSh",
    rate: 9,
  },

  Botswana: {
    symbol: "P",
    rate: 0.73,
  },

  Namibia: {
    symbol: "N$",
    rate: 1,
  },

  Mozambique: {
    symbol: "MT",
    rate: 3.67,
  },

  Zambia: {
    symbol: "K",
    rate: 1.4,
  },

  Zimbabwe: {
    symbol: "US$",
    rate: 0.055,
  },
};

export function convertCurrency(amount, country) {
  const currency = currencies[country] || currencies.Eswatini;

  return Math.round(Number(amount) * currency.rate);
}

export function formatCurrency(amount, country) {
  const currency = currencies[country] || currencies.Eswatini;

  return `${currency.symbol}${Math.round(Number(amount)).toLocaleString()}`;
}
