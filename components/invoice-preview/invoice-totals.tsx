"use client";

import { useInvoice } from "@/context/invoice-context";
import { formatCurrency } from "@/utils/formatter";
import { TotalRow } from "./total-row";

/**
 * Renders the totals breakdown (subtotal, tax, total)
 */
export const InvoiceTotals = () => {
  const { invoice } = useInvoice();
  const taxRate = typeof invoice.taxRate === "number" ? invoice.taxRate : 0;

  const formatAmount = (amount: number) =>
    formatCurrency(amount, invoice.currency, invoice.locale);

  return (
    <div className="flex justify-end">
      <div className="w-64 space-y-2">
        <TotalRow label="Subtotal" value={formatAmount(invoice.subtotal)} />
        <TotalRow
          label={`Tax (${taxRate}%)`}
          value={formatAmount(invoice.taxAmount)}
        />
        <TotalRow label="Total" value={formatAmount(invoice.total)} isTotal />
      </div>
    </div>
  );
};
