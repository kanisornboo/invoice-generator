import { TotalRow } from "./total-row";

export const InvoiceTotals = () => (
  <div className="flex justify-end">
    <div className="w-64 space-y-2">
      <TotalRow label="Subtotal" value="$99" />
      <TotalRow label="Tax (10%)" value="$99" />
      <TotalRow label="Total" value="$99" isTotal />
    </div>
  </div>
);
