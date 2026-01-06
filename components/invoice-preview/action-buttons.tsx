"use client";

import { ArrowLeftIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { useInvoice } from "@/context/invoice-context";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { useState } from "react";

export const ActionButtons = ({ onBack }: { onBack: () => void }) => {
  const { handleDownloadPDF } = useInvoice();

  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Edit
      </Button>
      <Button variant="outline" onClick={handleDownloadPDF}>
        <DownloadIcon className="h-4 w-4" />
        Download
      </Button>

      {/*{pdfUrl && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <iframe src={pdfUrl} width="100%" height="800px" />
        </div>
      )}*/}
    </div>
  );
};
