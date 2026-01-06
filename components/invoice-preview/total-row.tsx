export const TotalRow = ({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) => (
  <div
    className={`flex justify-between ${isTotal ? "font-bold text-lg border-t pt-2" : ""}`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
