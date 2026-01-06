import { Card, CardContent } from "./ui/card";
import { useInvoice } from "@/context/invoice-context";
import {
  ActionButtons,
  ContactInfo,
  InvoiceHeader,
  InvoiceItemsTable,
  InvoiceTotals,
} from "./invoice-preview/index";

export default function InvoicePreview({ onBack }: { onBack: () => void }) {
  const { invoice } = useInvoice();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Invoice Preview</h1>
          <ActionButtons onBack={onBack} />
        </div>

        {/* Invoice Card */}
        <Card>
          <CardContent>
            <InvoiceHeader
              invoiceNumber={invoice.invoiceNumber}
              date={invoice.date}
            />
            <ContactInfo invoice={invoice} />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceTotals />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
