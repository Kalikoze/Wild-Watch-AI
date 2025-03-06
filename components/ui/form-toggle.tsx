import { cn } from "@/lib/utils";

interface FormToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Array<{
    value: T;
    label: string;
  }>;
}

export function FormToggle<T extends string>({
  value,
  onChange,
  options
}: FormToggleProps<T>) {
  if (options.length !== 2) {
    console.warn('FormToggle currently only supports exactly 2 options');
  }

  return (
    <div className="relative flex bg-neutral-light/5 p-1 rounded-lg border border-neutral-dark/30">
      <div
        className={cn(
          "absolute inset-y-1 w-1/2 rounded-md bg-accent-green/10 border border-accent-green transition-all duration-300 ease-in-out",
          value === options[1]?.value && "translate-x-full"
        )}
        aria-hidden="true"
      />

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 relative py-2 px-4 text-center rounded transition-colors z-10",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
            value === option.value
              ? "text-accent-green"
              : "text-neutral-light/60 hover:text-neutral-light/80"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
} 