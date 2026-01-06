import { InvoiceData } from "@/types/invoice";

const ContactBlock = ({
  title,
  name,
  email,
}: {
  title: string;
  name: string;
  email: string;
}) => (
  <div>
    <h3 className="font-semibold mb-2">{title}:</h3>
    <p className="font-medium">{name}</p>
    <p className="text-gray-600">{email}</p>
  </div>
);

export const ContactInfo = ({ invoice }: { invoice: InvoiceData }) => (
  <div className="grid grid-cols-2 gap-8 mb-8">
    <ContactBlock
      title="From"
      name={invoice.fromName}
      email={invoice.fromEmail}
    />
    <ContactBlock title="To" name={invoice.toName} email={invoice.toEmail} />
  </div>
);
