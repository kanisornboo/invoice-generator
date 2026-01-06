import { InvoiceItem } from "@/types/invoice";

export const calculateTotals = (items: InvoiceItem[], taxRate: number) => {
  const subTotal = items.reduce((sum, item) => {
    const amount = typeof item.amount === "number" ? item.amount : 0;
    return sum + amount;
  }, 0);

  const taxAmount = subTotal * (taxRate / 100);
  const total = subTotal + taxAmount;

  return { subTotal, taxAmount, total };
};
