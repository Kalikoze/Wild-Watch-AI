import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StyledSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  options: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
}

export function StyledSelect({
  value,
  onValueChange,
  placeholder = "Select an option",
  id,
  className,
  options,
}: StyledSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className={cn(
          "h-10 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30",
          "focus:border-accent-green focus:ring-accent-green focus-visible:ring-1 focus-visible:ring-offset-0 ring-offset-0",
          "data-[state=open]:border-accent-green/50",
          value === 'placeholder' && "text-neutral-light/50",
          value !== 'placeholder' && "border-neutral-dark/50",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className="bg-primary-dark border border-neutral-dark/50 text-neutral-light shadow-lg rounded-md overflow-hidden"
        position="popper"
        sideOffset={4}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={option.disabled
              ? "text-neutral-light/50"
              : "text-neutral-light hover:bg-accent-green/10 hover:text-accent-green focus:bg-accent-green/10 focus:text-accent-green"
            }
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 