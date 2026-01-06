import { InvoiceData } from "@/types/invoice";

export const initialInvoice: InvoiceData = {
  invoiceNumber: `INV-${Date.now()}`,
  date: new Date().toISOString(),
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  toName: "",
  toEmail: "",
  toAddress: "",
  items: [
    {
      id: "1",
      description: "Item 1",
      quantity: "",
      rate: "",
      amount: "",
    },
  ],
  taxRate: 0,
  subtotal: 0,
  taxAmount: 0,
  total: 0,
  currency: "USD",
  locale: "en-US",
  notes: "",
};
