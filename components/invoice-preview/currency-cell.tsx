"use client";

import { useInvoice } from "@/context/invoice-context";
import { formatCurrency } from "@/utils/formatter";

/**
 * Formats and displays currency values based on user's locale
 */
export const CurrencyCell = ({ value }: { value?: number | string }) => {
  const { invoice } = useInvoice();
  const numValue = typeof value === "number" ? value : 0;

  return <>{formatCurrency(numValue, invoice.currency, invoice.locale)}</>;
};
