export const CurrencyCell = ({ value }: { value?: number | string }) => {
  const numValue = typeof value === "number" ? value : 0;
  return <>${numValue.toFixed(2)}</>;
};
