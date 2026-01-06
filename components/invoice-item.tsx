import { Trash, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { InvoiceItem as InvoiceItemType } from "../types/invoice";
import { useInvoice } from "@/context/invoice-context";
import { formatCurrency, getCurrencySymbol } from "@/utils/formatter";

interface InvoiceItemProps {
  item: InvoiceItemType;
  index: number;
  canRemove: boolean;
}

export default function InvoiceItem({
  item,
  index,
  canRemove,
}: InvoiceItemProps) {
  const { removeItem, updateItem, invoice } = useInvoice();
  const currencySymbol = getCurrencySymbol(invoice.currency);

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      updateItem(index, "quantity", "");
    } else {
      const numValue = Number.parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "quantity", numValue);
      }
    }
  };

  const handleQuantityBlur = () => {
    if (item.quantity === "" || item.quantity === 0) {
      updateItem(index, "quantity", 1);
    }
  };

  const handleOnRateChange = (value: string) => {
    if (value === "") {
      updateItem(index, "rate", "");
    } else {
      const numValue = Number.parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        updateItem(index, "rate", numValue);
      }
    }
  };

  const handleOnRateBlur = () => {
    if (item.rate === "") {
      updateItem(index, "rate", 0);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-4 border border-gray-200 rounded-md">
      <div className="col-span-5">
        <Label> Description </Label>
        <Input
          type="text"
          placeholder="Description"
          onChange={(e) => updateItem(index, "description", e.target.value)}
        />
      </div>
      <div className="col-span-2">
        <Label> Quantity </Label>
        <Input
          type="number"
          placeholder="Quantity"
          min="1"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          onBlur={handleQuantityBlur}
        />
      </div>
      <div className="col-span-2">
        <Label> Rate ({currencySymbol})</Label>
        <Input
          type="number"
          min={0}
          max={1000000}
          step={0.01}
          value={item.rate}
          placeholder="Rate"
          onChange={(e) => handleOnRateChange(e.target.value)}
          onBlur={handleOnRateBlur}
        />
      </div>
      <div className="col-span-2">
        <Label> Amount </Label>
        <div className="h-10 px-3 py-2 bg-gray-50 rounded-md flex items-center ">
          {formatCurrency(
            typeof item.amount === "number" ? item.amount : 0,
            invoice.currency,
            invoice.locale,
          )}
        </div>
      </div>
      <div className="col-span-1 flex items-end">
        <Button
          variant="outline"
          onClick={() => removeItem(index)}
          disabled={!canRemove}
        >
          <Trash size={10} />
        </Button>
      </div>
    </div>
  );
}
