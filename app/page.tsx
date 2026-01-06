"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import InvoicePreview from "@/components/invoice-preview";
import { Eye } from "lucide-react";
import { InvoiceFrom } from "@/components/invoice-from";

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);

  if (showPreview) {
    return <InvoicePreview onBack={() => setShowPreview(false)} />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center m-6">
          <div>
            <h1 className="text-3xl font-bold">Invoice Generator</h1>
            <p className="text-gray-600">
              Create professional invoices quickly and easily.
            </p>
          </div>

          <Button onClick={() => setShowPreview(true)}>
            <Eye className="h-6 w-6 mr-2" /> Preview
          </Button>
        </div>

        <InvoiceFrom />
      </div>
    </div>
  );
}
