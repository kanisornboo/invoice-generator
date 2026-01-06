import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useInvoice } from "@/context/invoice-context";

export const TaxAndTotals = () => {
  const { updateInvoice, invoice } = useInvoice();

  /**
   * Handles tax rate input changes, validates range 0-100
   * Allows empty string for better UX during typing
   */
  const handleTaxRateChange = (value: string) => {
    // Allow clearing the field
    if (value === "") {
      updateInvoice({ taxRate: "" });
      return;
    }

    const numValue = Number.parseFloat(value);

    // Only update if valid number within range
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      updateInvoice({ taxRate: numValue });
    }
  };

  /**
   * Ensures tax rate defaults to 0 when user leaves field empty or invalid
   * Prevents empty string in final state
   */
  const handleTaxRateBlur = () => {
    const taxRate = invoice.taxRate;

    // Reset to 0 if empty string or invalid number
    if (taxRate === "" || (typeof taxRate === "number" && isNaN(taxRate))) {
      updateInvoice({ taxRate: 0 });
    }
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Tax & Totals</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            min={0}
            max={100}
            value={invoice.taxRate}
            onChange={(e) => handleTaxRateChange(e.target.value)}
            onBlur={handleTaxRateBlur}
            placeholder="Tax Rate"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${invoice.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>
              Tax (
              {typeof invoice.taxRate === "number" ? `${invoice.taxRate}%` : 0})
            </span>
            <span>${invoice.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
