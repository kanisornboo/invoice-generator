import { useInvoice } from "@/context/invoice-context";
import { Plus } from "lucide-react";
import InvoiceItem from "./invoice-item";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const ItemsList = () => {
  const { invoice, addItem } = useInvoice();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Invoice Items</CardTitle>

        <Button onClick={addItem} size={"sm"}>
          <Plus /> Add Item
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {invoice.items.map((item, idex) => (
          <InvoiceItem
            key={item.id}
            item={item}
            index={idex}
            canRemove={invoice.items.length > 1}
          />
        ))}
      </CardContent>
    </Card>
  );
};
