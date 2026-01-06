import { ArrowLeftIcon, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ActionButtons = ({ onBack }: { onBack: () => void }) => (
  <div className="space-x-2">
    <Button variant="outline" onClick={onBack}>
      <ArrowLeftIcon className="h-4 w-4" />
      Back to Edit
    </Button>
    <Button variant="outline">
      <DownloadIcon className="h-4 w-4" />
      Download
    </Button>
  </div>
);
