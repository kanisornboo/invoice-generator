import { formatDate } from "@/utils/formatter";

export const InvoiceHeader = ({
  invoiceNumber,
  date,
}: {
  invoiceNumber: string;
  date: string;
}) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-2xl font-bold mb-2">INVOICE</h2>
      <p className="text-gray-600">#{invoiceNumber}</p>
    </div>
    <div className="text-right">
      <p className="text-gray-600">Date: {formatDate(date)}</p>
    </div>
  </div>
);
