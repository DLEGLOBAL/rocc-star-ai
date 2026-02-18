import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export function MobileSelect({ 
  value, 
  onValueChange, 
  options = [], 
  placeholder = "Select...",
  label,
  triggerClassName 
}) {
  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find(opt => opt.value === value);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (!isMobile) {
    return null; // Fallback to regular select on desktop
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm select-none",
          !selectedOption && "text-muted-foreground",
          triggerClassName
        )}
      >
        <span className="truncate">
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className="h-4 w-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{label || "Select an option"}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors select-none",
                    value === option.value
                      ? "bg-violet-50 dark:bg-violet-950 text-violet-900 dark:text-violet-100"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  {value === option.value && (
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}