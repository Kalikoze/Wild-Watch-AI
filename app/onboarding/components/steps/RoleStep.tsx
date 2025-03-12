import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { MdScience, MdPets } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepButtons } from '@/components/ui/step-buttons';
import { cn } from '@/lib/utils';
import { RoleData, RoleStepProps } from '@/app/onboarding/types';
import { roleOptions } from '@/app/onboarding/data/roleData';

const getRoleIcon = (iconType: string) => {
  switch (iconType) {
    case 'admin':
      return <FaUserShield className="w-6 h-6 " />;
    case 'researcher':
      return <MdScience className="w-6 h-6" />;
    case 'animalCare':
      return <MdPets className="w-6 h-6" />;
    case 'viewer':
      return <IoMdEye className="w-6 h-6" />;
    default:
      return null;
  }
};

export default function RoleStep({
  onNext,
  onBack
}: RoleStepProps) {
  const [roleData, setRoleData] = useState<RoleData>({
    role: '',
    title: ''
  });
  const [error, setError] = useState<string>('');

  const isValid = () => roleData.role !== '';

  const handleChange = (changes: Partial<RoleData>) => {
    setError('');
    setRoleData(prev => ({ ...prev, ...changes }));
  };

  const handleNext = () => {
    try {
      if (!isValid()) {
        setError('Please select a role');
        return;
      }
      onNext(roleData);
    } catch (err) {
      console.error('Role step error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="relative py-8 sm:py-12 bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20 overflow-hidden">
        {/* Decorative gradient bar at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green/30" />

        <CardContent className="max-w-lg mx-auto p-0 space-y-8 relative z-10">
          <header className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-light">
              What&apos;s your role?
            </h2>
            <p className="text-neutral-light/60 text-sm mt-2">
              This helps us customize your experience
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4">
            {roleOptions.map((role) => (
              <Button
                key={role.id}
                type="button"
                onClick={() => handleChange({ role: role.id })}
                variant="outline"
                iconSize="lg"
                color={roleData.role === role.id ? "green" : "neutral"}
                className={cn(
                  "w-full h-auto items-center gap-4 p-4 justify-start text-left"
                )}
                asChild
              >
                <button>
                  <div className={cn(
                    "transition-all duration-300",
                    roleData.role === role.id ? "text-accent-green" : "text-neutral-light/60"
                  )}>
                    {getRoleIcon(role.iconType)}
                  </div>
                  <div className="text-left">
                    <div className={cn(
                      "font-semibold transition-all duration-300",
                      roleData.role === role.id ? "text-accent-green" : "text-neutral-light"
                    )}>
                      {role.title}
                    </div>
                    <div className={cn(
                      "text-sm transition-all duration-300 whitespace-normal",
                      roleData.role === role.id
                        ? "text-accent-green/80"
                        : "text-neutral-light/70"
                    )}>
                      {role.description}
                    </div>
                  </div>
                </button>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-title" className="text-neutral-light">
              Your Job Title <span className="text-neutral-light/60">(Optional)</span>
            </Label>
            <Input
              id="job-title"
              type="text"
              placeholder="e.g., Senior Researcher, Lead Veterinarian"
              value={roleData.title}
              onChange={(e) => handleChange({ title: e.target.value })}
              className="h-10 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30"
            />
            <p className="text-sm text-neutral-light/60">
              If provided, this will be displayed on your profile and in communications
            </p>
          </div>

          {error && (
            <div className="text-accent-orange text-sm text-center px-4 py-2 bg-accent-orange/10 rounded-md border border-accent-orange/20">
              {error}
            </div>
          )}

          <StepButtons
            onBack={onBack}
            onNext={handleNext}
            isNextDisabled={!isValid()}
          />
        </CardContent>
      </Card>
    </motion.article>
  );
} 