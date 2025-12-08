import { JournalFinder } from "@/components/JournalFinder";
import { Activity } from "lucide-react";

export default function JournalFinderPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Journal Finder
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Find the perfect medical journal for your research. Compare impact factors, review speeds, and submission requirements to make informed decisions.
        </p>
      </div>
      
      <JournalFinder />
    </div>
  );
}
