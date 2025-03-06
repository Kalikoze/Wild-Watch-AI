import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormToggle } from '@/components/ui/form-toggle';
import { AnimatedSection } from '@/components/ui/animated-section';
import { StepButtons } from '@/components/ui/step-buttons';
import { StyledSelect } from '@/components/ui/styled-select';
import { validateOrganizationData } from '@/app/onboarding/utils';
import { organizationTypes } from '@/app/onboarding/data/organizationTypes';
import { OrgData, OrganizationStepProps } from '@/app/onboarding/types';

export default function OrganizationStep({
  onNext,
  onBack
}: OrganizationStepProps) {
  const [orgData, setOrgData] = useState<OrgData>({
    type: 'new',
    name: '',
    organizationType: 'placeholder',
    otherType: ''
  });
  const [isChecking, setIsChecking] = useState(false);
  const isSubmitting = useRef<boolean>(false);

  const isValid = () => validateOrganizationData(orgData);

  const handleChange = (changes: Partial<OrgData>) => {
    setOrgData(prev => ({ ...prev, ...changes }));
  };


  const checkOrganizationName = async (name: string): Promise<boolean> => {
    setIsChecking(true);
    try {
      const supabase = createClient();
      const { data: nameExists, error } = await supabase
        .rpc('check_organization_name_exists', {
          org_name: name.trim()
        });

      if (error) {
        toast.error('An error occurred while checking organization name', {
          position: 'bottom-right',
        });
        return false;
      }

      if (nameExists === true) {
        toast.error('An organization with this name already exists', {
          position: 'bottom-right',
        });
        return false;
      }

      return true;
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.', {
        position: 'bottom-right',
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    try {
      if (orgData.type !== 'new') {
        onNext(orgData);
        return;
      }

      if (!isValid()) {
        toast.error('Please fill out all required fields', {
          position: 'bottom-right',
        });
        return;
      }

      const isNameAvailable = await checkOrganizationName(orgData.name);
      if (!isNameAvailable) return;

      onNext(orgData);
    } finally {
      isSubmitting.current = false;
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green via-accent-green-light to-accent-green/30" />

        <CardContent className="max-w-lg mx-auto p-0 space-y-8 relative z-10">
          <header className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-light">
              Tell us about your organization
            </h2>
          </header>

          <div className="space-y-6">
            <FormToggle
              value={orgData.type}
              onChange={(type) => handleChange({ type })}
              options={[
                { value: 'new', label: 'New Organization' },
                { value: 'existing', label: 'Join Existing' }
              ]}
            />

            <AnimatedSection isVisible={orgData.type === 'new'}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name" className="text-neutral-light">
                    Organization Name <span className="text-accent-orange">*</span>
                  </Label>
                  <Input
                    id="org-name"
                    type="text"
                    placeholder="Enter your organization name"
                    value={orgData.name}
                    onChange={(e) => handleChange({ name: e.target.value })}
                    className="h-10 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org-type" className="text-neutral-light">
                    Organization Type <span className="text-accent-orange">*</span>
                  </Label>
                  <StyledSelect
                    id="org-type"
                    placeholder="Select organization type"
                    value={orgData.organizationType}
                    onValueChange={(value) => handleChange({ organizationType: value })}
                    options={organizationTypes}
                  />
                </div>

                {orgData.organizationType === 'other_specify' && (
                  <div className="space-y-2">
                    <Label htmlFor="org-other-type" className="text-neutral-light">
                      Specify Organization Type <span className="text-accent-orange">*</span>
                    </Label>
                    <Input
                      id="org-other-type"
                      type="text"
                      placeholder="Please specify your organization type"
                      value={orgData.otherType || ''}
                      onChange={(e) => handleChange({ otherType: e.target.value })}
                      className="h-10 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30"
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection isVisible={orgData.type === 'existing'}>
              <div className="space-y-2">
                <Label htmlFor="org-code" className="text-neutral-light">
                  Organization Code or Email Domain
                </Label>
                <Input
                  id="org-code"
                  type="text"
                  placeholder="Enter organization code or email domain"
                  value={orgData.organizationId || ''}
                  onChange={(e) => handleChange({
                    organizationId: e.target.value,
                    organizationType: 'existing_org'
                  })}
                  className="h-10 bg-neutral-light/5 border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30"
                />
              </div>
            </AnimatedSection>
          </div>

          <StepButtons
            onBack={onBack}
            onNext={handleNext}
            isNextDisabled={!isValid() || isChecking}
          />
        </CardContent>
      </Card>
    </motion.article>
  );
} 