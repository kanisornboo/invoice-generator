import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/invoice-context";

export const BasicDetails = () => {
  const { invoice, updateInvoice } = useInvoice();

  console.log(invoice.date);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>Invoice Details</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoiceNumber" className="mb-2">
            Invoice Number
          </Label>
          <Input
            id="invoiceNumber"
            type="text"
            value={invoice?.invoiceNumber}
            onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="invoiceDate" className="mb-2">
            Date
          </Label>
          <Input
            id="invoiceDate"
            type="date"
            value={new Date(invoice.date).toISOString().split("T")[0]}
            onChange={(e) => updateInvoice({ date: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};
