import { initialInvoice } from "@/lib/constant";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { calculateTotals } from "@/utils/calculations";
import {
  getUserLocale,
  getCurrencyFromLocale,
  getCurrencySymbol,
} from "@/utils/formatter";
import jsPDF from "jspdf";
import { createContext, useContext, useState, useEffect } from "react";

export type InvoiceContextType = {
  invoice: InvoiceData;
  updateInvoice: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (index: number, key: keyof InvoiceItem, value: any) => void;
  handleDownloadPDF: () => void;
  pdfUrl: string | null;
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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Detect user's locale and currency on mount
  useEffect(() => {
    const locale = getUserLocale();
    const currency = getCurrencyFromLocale(locale);
    setInvoice((prev) => ({
      ...prev,
      locale,
      currency,
    }));
  }, []);

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

  const handleDownloadPDF = () => {
    const url = generatePDF(invoice);
    setPdfUrl(url);
  };

  const generatePDF = (invoice: InvoiceData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 25;

    // Colors (LinkedIn-inspired blue)
    const primaryColor: [number, number, number] = [10, 102, 194];
    const darkGray: [number, number, number] = [51, 51, 51];
    const mediumGray: [number, number, number] = [102, 102, 102];
    const lightGray: [number, number, number] = [245, 245, 245];

    // Currency symbol based on invoice settings
    const currencySymbol = getCurrencySymbol(invoice.currency);

    // Company/Invoice Title
    doc.setFontSize(28);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", margin, y);

    // Invoice number and date (right aligned)
    doc.setFontSize(10);
    doc.setTextColor(...mediumGray);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, pageWidth - margin, y - 8, {
      align: "right",
    });
    doc.text(
      `Date: ${new Date(invoice.date).toLocaleDateString()}`,
      pageWidth - margin,
      y,
      { align: "right" },
    );

    y += 15;

    // Divider line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);

    y += 20;

    const colWidth = contentWidth / 2;

    // From Section
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("FROM", margin, y);

    doc.setTextColor(...darkGray);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(invoice.fromName || "Your Company", margin, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...mediumGray);
    doc.text(invoice.fromEmail || "", margin, y + 16);
    doc.text(invoice.fromName || "", margin, y + 24);

    // To Section
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", margin + colWidth, y);

    doc.setTextColor(...darkGray);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(invoice.toName || "Client Name", margin + colWidth, y + 8);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...mediumGray);
    doc.text(invoice.toEmail || "", margin + colWidth, y + 16);
    doc.text(invoice.toName || "", margin + colWidth, y + 24);

    y += 45;

    // =========================================================================
    // Items Table
    // =========================================================================

    // Table header background
    doc.setFillColor(...primaryColor);
    doc.rect(margin, y, contentWidth, 10, "F");

    // Table header text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    const col1 = margin + 3;
    const col2 = margin + 90;
    const col3 = margin + 115;
    const col4 = margin + 145;

    doc.text("DESCRIPTION", col1, y + 7);
    doc.text("QTY", col2, y + 7);
    doc.text("RATE", col3, y + 7);
    doc.text("AMOUNT", col4, y + 7);

    y += 10;

    // Table rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    invoice.items.forEach((item, index) => {
      // Alternate row background
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
        doc.rect(margin, y, contentWidth, 10, "F");
      }

      doc.setTextColor(...darkGray);
      doc.text(item.description || "-", col1, y + 7);
      doc.text(String(item.quantity), col2, y + 7);
      doc.text(`${currencySymbol}${Number(item.rate).toFixed(2)}`, col3, y + 7);
      doc.text(
        `${currencySymbol}${Number(item.amount).toFixed(2)}`,
        col4,
        y + 7,
      );

      y += 10;
    });

    // Table bottom border
    doc.setDrawColor(...mediumGray);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);

    y += 15;

    const totalsX = pageWidth - margin - 60;
    const valuesX = pageWidth - margin;

    // Subtotal
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...mediumGray);
    doc.text("Subtotal:", totalsX, y);
    doc.setTextColor(...darkGray);
    doc.text(
      `${currencySymbol}${Number(invoice.subtotal).toFixed(2)}`,
      valuesX,
      y,
      {
        align: "right",
      },
    );

    y += 8;

    // Tax
    const taxRate = typeof invoice.taxRate === "number" ? invoice.taxRate : 0;
    doc.setTextColor(...mediumGray);
    doc.text(`Tax (${taxRate}%):`, totalsX, y);
    doc.setTextColor(...darkGray);
    doc.text(
      `${currencySymbol}${Number(invoice.taxAmount).toFixed(2)}`,
      valuesX,
      y,
      {
        align: "right",
      },
    );

    y += 12;

    // Total with highlight
    doc.setFillColor(...primaryColor);
    doc.rect(totalsX - 5, y - 6, 70, 12, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("TOTAL:", totalsX, y + 2);
    doc.text(
      `${currencySymbol}${Number(invoice.total).toFixed(2)}`,
      valuesX,
      y + 2,
      {
        align: "right",
      },
    );

    y += 30;

    // if (invoice.notes) {
    //   doc.setFont("helvetica", "bold");
    //   doc.setTextColor(...primaryColor);
    //   doc.setFontSize(10);
    //   doc.text("NOTES", margin, y);

    //   doc.setFont("helvetica", "normal");
    //   doc.setTextColor(...mediumGray);
    //   doc.setFontSize(9);

    //   const splitNotes = doc.splitTextToSize(invoice.notes, contentWidth);
    //   doc.text(splitNotes, margin, y + 8);
    // }

    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...mediumGray);
    doc.text("Thank you for your business!", pageWidth / 2, footerY, {
      align: "center",
    });

    // Generate blob URL for preview
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);

    return url;
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        updateInvoice,
        addItem,
        removeItem,
        updateItem,
        handleDownloadPDF,
        pdfUrl,
      }}
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
