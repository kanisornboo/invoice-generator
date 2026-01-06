import { BasicDetails } from "./basic-details";
import { ContactDetails } from "./contact-details";
import { ItemsList } from "./items-list";
import { TaxAndTotals } from "./tax-and-totals";

export const InvoiceFrom = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <BasicDetails />
      <ContactDetails />
      <ItemsList />
      <TaxAndTotals />
    </div>
  );
};
