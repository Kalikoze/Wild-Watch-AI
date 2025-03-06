import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextText?: string;
  backText?: string;
  nextIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
}

export function StepButtons({
  onBack,
  onNext,
  isNextDisabled = false,
  nextText = "Continue",
  backText = "Back",
  nextIcon = <HiArrowRight className="ml-2 h-5 w-5" />,
  backIcon = <HiArrowLeft className="mr-2 h-5 w-5" />
}: StepButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
      {onBack && (
        <Button
          onClick={onBack}
          variant="outline"
          size="xl"
          className={cn(
            "w-full sm:w-1/2 text-neutral-light border-neutral-dark/30 bg-transparent",
            "hover:bg-neutral-light/10 hover:text-neutral-light transition-all duration-300",
            "hover:border-neutral-light/20"
          )}
        >
          {backIcon}
          {backText}
        </Button>
      )}

      <Button
        onClick={onNext}
        variant="green"
        size="xl"
        disabled={isNextDisabled}
        className={cn(
          "w-full",
          onBack ? "sm:w-1/2" : "sm:w-full",
          "transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
          "hover:shadow-[0_0_15px_rgba(40,167,69,0.3)]",
          isNextDisabled && "opacity-70 cursor-not-allowed"
        )}
      >
        {nextText}
        {nextIcon}
      </Button>
    </div>
  );
} 