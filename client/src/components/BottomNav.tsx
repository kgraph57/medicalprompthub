import { cn } from "@/lib/utils";
import { Home, GraduationCap, Lightbulb, ArrowRight, Bookmark } from "lucide-react";
import { useLocation } from "wouter";

export function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: GraduationCap, label: "Courses", path: "/courses" },
    { icon: Lightbulb, label: "Tips", path: "/tips" },
    { icon: ArrowRight, label: "Workflow", path: "/guides" },
    { icon: Bookmark, label: "Fav", path: "/favorites" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = 
            item.path === "/" 
              ? location === "/" 
              : location.startsWith(item.path);

          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              <Icon className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
