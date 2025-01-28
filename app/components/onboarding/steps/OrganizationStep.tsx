import { motion } from 'framer-motion';
import { useState } from 'react';

type OrgData = {
  type: 'new' | 'existing';
  name: string;
  organizationType: string;
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
    organizationType: ''
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative sm:max-w-xl sm:mx-auto w-full px-4"
    >
      <div className="relative px-4 py-10 bg-primary-light shadow-xl sm:rounded-3xl sm:p-20 border border-neutral-dark/20">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-neutral-light text-center">
            Tell us about your organization
          </h2>

          <div className="space-y-4">
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
              <>
                <input
                  type="text"
                  placeholder="Organization Name"
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
                  <option value="research">Research Institution</option>
                  <option value="other">Other</option>
                </select>
              </>
            )}

            {orgData.type === 'existing' && (
              <input
                type="text"
                placeholder="Organization Code or Email Domain"
                className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
              />
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => onNext(orgData)}
              className="flex-1 px-4 py-3 rounded-lg bg-accent-green hover:bg-accent-green-light text-primary transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 