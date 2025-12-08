import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-12 w-12 text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-1.5">404</h1>

          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            Page Not Found
          </h2>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg h-8 text-xs"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
