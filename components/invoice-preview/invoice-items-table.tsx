import { InvoiceData } from "@/types/invoice";
import { CurrencyCell } from "./currency-cell";

/**
 * Renders the items table with all line items
 */
export const InvoiceItemsTable = ({ invoice }: { invoice: InvoiceData }) => (
  <table className="w-full mb-8">
    <thead>
      <tr className="border-b-2">
        <th className="text-left py-2">Description</th>
        <th className="text-left py-2">Quantity</th>
        <th className="text-left py-2">Rate</th>
        <th className="text-left py-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      {invoice.items.map((item) => (
        <tr key={item.id} className="border-b py-2">
          <td className="py-2">{item.description}</td>
          <td className="py-2 text-center">{item.quantity}</td>
          <td className="py-2 text-right">
            <CurrencyCell value={item.rate} />
          </td>
          <td className="py-2 text-right">
            <CurrencyCell value={item.amount} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
