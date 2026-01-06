import { initialInvoice } from "@/lib/constant";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { calculateTotals } from "@/utils/calculations";
import { log } from "console";
import { createContext, useContext, useState } from "react";

export type InvoiceContextType = {
  invoice: InvoiceData;
  updateInvoice: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (index: number, key: keyof InvoiceItem, value: any) => void;
};

export const InvoiceContext = createContext<InvoiceContextType | undefined>(
  undefined,
);

export const InvoiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoice);

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const newInvoice: InvoiceData = { ...invoice, ...updates };

    if (updates.items || updates.taxRate !== undefined) {
      const { subTotal, taxAmount, total } = calculateTotals(
        updates.items || invoice.items,
        updates.taxRate !== undefined ? updates.taxRate : invoice.taxRate,
      );
      newInvoice.subtotal = subTotal;
      newInvoice.taxAmount = taxAmount;
      newInvoice.total = total;
    }
    setInvoice(newInvoice);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      amount: 0,
      rate: 0,
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      updateInvoice({ items: newItems });
    }
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    // Create a shallow copy of the items array to avoid mutating state directly
    const newItems = [...invoice.items];

    // Create a new item object with the updated field
    // Using spread operator to preserve all other fields
    const updatedItem = { ...newItems[index], [field]: value };

    // Auto-calculate the amount when quantity or rate changes
    // This ensures the total is always accurate
    if (field === "quantity" || field === "rate") {
      // Convert string inputs to numbers safely
      const quantity = parseNumericValue(updatedItem.quantity);
      const rate = parseNumericValue(updatedItem.rate);

      // Calculate total: amount = quantity × rate
      updatedItem.amount = quantity * rate;
    }

    // Replace the item at the specified index with the updated version
    newItems[index] = updatedItem;

    // Update the invoice state with the new items array
    updateInvoice({ items: newItems });
  };

  const parseNumericValue = (value: string | number): number => {
    // If already a number, return as-is
    if (typeof value === "number") return value;

    // Treat empty string as 0 to avoid NaN
    if (value === "") return 0;

    // Convert string to number
    return Number(value);
  };

  return (
    <InvoiceContext.Provider
      value={{ invoice, updateInvoice, addItem, removeItem, updateItem }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

// custom hook to get the invoice context from the provider
// this is used to get the invoice data and set the invoice data from the provider
export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};
