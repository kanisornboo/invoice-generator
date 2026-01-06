/**
 * Detects user's locale from browser
 */
export const getUserLocale = (): string => {
  if (typeof window !== "undefined") {
    return navigator.language || "en-US";
  }
  return "en-US";
};

/**
 * Gets currency code based on locale
 */
export const getCurrencyFromLocale = (locale: string): string => {
  const currencyMap: Record<string, string> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-AU": "AUD",
    "en-CA": "CAD",
    "en-NZ": "NZD",
    "de-DE": "EUR",
    "fr-FR": "EUR",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "nl-NL": "EUR",
    "pt-PT": "EUR",
    "ja-JP": "JPY",
    "zh-CN": "CNY",
    "ko-KR": "KRW",
    "th-TH": "THB",
    "in-IN": "INR",
    "hi-IN": "INR",
    "ru-RU": "RUB",
    "pl-PL": "PLN",
    "se-SE": "SEK",
    "sv-SE": "SEK",
    "da-DK": "DKK",
    "no-NO": "NOK",
    "fi-FI": "EUR",
    "ch-CH": "CHF",
    "de-CH": "CHF",
    "fr-CH": "CHF",
    "pt-BR": "BRL",
    "es-MX": "MXN",
    "en-SG": "SGD",
    "zh-HK": "HKD",
    "en-ZA": "ZAR",
    "ar-AE": "AED",
    "ar-SA": "SAR",
  };

  // Try exact match first
  if (currencyMap[locale]) {
    return currencyMap[locale];
  }

  // Try language-only match (e.g., "en" from "en-US")
  const language = locale.split("-")[0];
  const fallbackLocale = Object.keys(currencyMap).find((key) =>
    key.startsWith(language + "-"),
  );

  if (fallbackLocale) {
    return currencyMap[fallbackLocale];
  }

  return "USD";
};

/**
 * Gets currency symbol for a given currency code
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  const symbolMap: Record<string, string> = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    JPY: "¥",
    CNY: "¥",
    KRW: "₩",
    THB: "฿",
    INR: "₹",
    RUB: "₽",
    PLN: "zł",
    SEK: "kr",
    DKK: "kr",
    NOK: "kr",
    CHF: "CHF",
    BRL: "R$",
    MXN: "$",
    AUD: "A$",
    CAD: "C$",
    NZD: "NZ$",
    SGD: "S$",
    HKD: "HK$",
    ZAR: "R",
    AED: "د.إ",
    SAR: "﷼",
  };

  return symbolMap[currencyCode] || currencyCode;
};

/**
 * Formats date based on locale
 */
export const formatDate = (date: string, locale?: string): string => {
  const userLocale = locale || getUserLocale();
  return new Date(date).toLocaleDateString(userLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats currency amount based on locale and currency code
 */
export const formatCurrency = (
  amount: number,
  currencyCode?: string,
  locale?: string,
): string => {
  const userLocale = locale || getUserLocale();
  const currency = currencyCode || getCurrencyFromLocale(userLocale);

  try {
    return new Intl.NumberFormat(userLocale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback if Intl fails
    const symbol = getCurrencySymbol(currency);
    return `${symbol}${amount.toFixed(2)}`;
  }
};

/**
 * Detects and returns user's currency info
 */
export const getUserCurrencyInfo = (): {
  locale: string;
  currencyCode: string;
  symbol: string;
} => {
  const locale = getUserLocale();
  const currencyCode = getCurrencyFromLocale(locale);
  const symbol = getCurrencySymbol(currencyCode);

  return { locale, currencyCode, symbol };
};
