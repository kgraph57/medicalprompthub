import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchAutocomplete({
  value,
  onChange,
  onSearch,
  placeholder = "プロンプトを検索...",
  className,
}: SearchAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: suggestions = [], isLoading } = trpc.prompts.searchSuggestions.useQuery(
    { query: value },
    { enabled: value.length >= 2 && open }
  );

  useEffect(() => {
    if (value.length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setOpen(false);
    if (onSearch) {
      onSearch(suggestion);
    }
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      setOpen(false);
      if (onSearch) {
        onSearch(value);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => value.length >= 2 && setOpen(true)}
              className={`pl-12 ${className}`}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandList>
              {isLoading ? (
                <CommandEmpty>検索中...</CommandEmpty>
              ) : suggestions.length === 0 ? (
                <CommandEmpty>候補が見つかりません</CommandEmpty>
              ) : (
                <CommandGroup heading="検索候補">
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      value={suggestion}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer"
                    >
                      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                      {suggestion}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}







