import { motion } from 'framer-motion';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'react-hot-toast';
import Button from '@/app/components/common/Button';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

type OrgData = {
  type: 'new' | 'existing';
  name: string;
  organizationType: string;
  otherType?: string;
  organizationId?: string;
};

export function OrganizationStep({
  onNext,
  onBack
}: {
  onNext: (data: OrgData) => void;
  onBack: () => void;
}) {
  const [orgData, setOrgData] = useState<OrgData>({
    type: 'new',
    name: '',
    organizationType: '',
    otherType: ''
  });

  const isValid = () => {
    if (orgData.type === 'new') {
      if (orgData.organizationType === 'other_specify') {
        return orgData.name.trim().length >= 2 &&
          orgData.organizationType.length > 0 &&
          (orgData.otherType?.trim()?.length ?? 0) >= 2;
      }
      return orgData.name.trim().length >= 2 && orgData.organizationType.length > 0;
    }
    return true;
  };

  const handleNext = async () => {
    try {
      if (orgData.type === 'new') {
        if (!isValid()) {
          toast.error('Please fill out all required fields', {
            position: 'bottom-right',
          });
          return;
        }

        const supabase = createClient();
        const { data: existingOrgs, error: checkError } = await supabase
          .from('organizations')
          .select('id')
          .ilike('name', orgData.name);

        if (checkError) {
          console.error('Database error:', checkError);
          toast.error('An error occurred while checking organization name', {
            position: 'bottom-right',
          });
          return;
        }

        if (existingOrgs && existingOrgs.length > 0) {
          toast.error('An organization with this name already exists', {
            position: 'bottom-right',
          });
          return;
        }
      }

      onNext(orgData);

    } catch (err) {
      console.error('Organization step error:', err);
      toast.error('An unexpected error occurred. Please try again.', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-primary-light shadow-xl rounded-3xl p-8 sm:p-12 border border-neutral-dark/20">
        <div className="max-w-lg mx-auto space-y-8">
          <header className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-light">
              Tell us about your organization
            </h2>
          </header>

          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={() => setOrgData(d => ({ ...d, type: 'new' }))}
                className={`flex-1 px-4 py-3 rounded-lg border transition-all ${orgData.type === 'new'
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-neutral-dark/30 text-neutral-light/60 hover:bg-neutral-light/5'
                  }`}
              >
                New Organization
              </button>
              <button
                onClick={() => setOrgData(d => ({ ...d, type: 'existing' }))}
                className={`flex-1 px-4 py-3 rounded-lg border transition-all ${orgData.type === 'existing'
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-neutral-dark/30 text-neutral-light/60 hover:bg-neutral-light/5'
                  }`}
              >
                Join Existing
              </button>
            </div>

            {orgData.type === 'new' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Organization Name *"
                  value={orgData.name}
                  onChange={(e) => setOrgData(d => ({ ...d, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                />
                <select
                  value={orgData.organizationType}
                  onChange={(e) => setOrgData(d => ({ ...d, organizationType: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                >
                  <option value="">Select Organization Type</option>
                  <option value="sanctuary">Wildlife Sanctuary</option>
                  <option value="zoo">Zoo</option>
                  <option value="aquarium">Aquarium</option>
                  <option value="research">Research Institution</option>
                  <option value="conservation">Conservation Center</option>
                  <option value="rehabilitation">Wildlife Rehabilitation Center</option>
                  <option value="education">Educational Institution</option>
                  <option value="veterinary">Wildlife Veterinary Facility</option>
                  <option value="other_specify">Other</option>
                </select>

                {orgData.organizationType === 'other_specify' && (
                  <input
                    type="text"
                    placeholder="Please specify your organization type *"
                    value={orgData.otherType || ''}
                    onChange={(e) => setOrgData(d => ({ ...d, otherType: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
                  />
                )}
              </div>
            )}

            {orgData.type === 'existing' && (
              <input
                type="text"
                placeholder="Organization Code or Email Domain"
                className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button
              onClick={onBack}
              variant="neutral"
              icon={HiArrowLeft}
              iconPosition="left"
              className="w-full sm:w-1/2"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              icon={HiArrowRight}
              disabled={!isValid()}
              className="w-full sm:w-1/2 !bg-accent-green hover:!bg-accent-green-light text-primary"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
} 