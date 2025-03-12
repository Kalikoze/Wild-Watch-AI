import { Button } from '@/components/ui/button';

interface StepButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  hideBack?: boolean;
}

export function StepButtons({
  onBack,
  onNext,
  isNextDisabled = false,
  nextLabel = "Continue",
  backLabel = "Back",
  hideBack = false
}: StepButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {!hideBack && onBack && (
        <Button
          onClick={onBack}
          variant="outline"
          color="neutral"
          withArrow="left"
          className="w-full sm:w-1/2 order-2 sm:order-1"
        >
          {backLabel}
        </Button>
      )}

      <Button
        onClick={onNext}
        variant="solid"
        color="green"
        withArrow
        disabled={isNextDisabled}
        className={`w-full ${!hideBack && onBack ? 'sm:w-1/2' : 'sm:w-full'} order-1 sm:order-2`}
      >
        {nextLabel}
      </Button>
    </div>
  );
} 