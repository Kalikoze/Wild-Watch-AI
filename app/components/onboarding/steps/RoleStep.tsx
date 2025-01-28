import { motion } from 'framer-motion';
import { useState } from 'react';

type RoleData = {
  role: string;
  title: string;
};

const ROLE_OPTIONS = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full access to manage organization, users, and settings',
    icon: '👑'
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Access to analysis tools and data collection',
    icon: '🔬'
  },
  {
    id: 'staff',
    title: 'Staff Member',
    description: 'Daily operations and animal care tracking',
    icon: '👤'
  },
  {
    id: 'viewer',
    title: 'Viewer',
    description: 'View-only access to reports and data',
    icon: '👁️'
  }
];

export function RoleStep({
  onNext,
  onBack
}: {
  onNext: (data: RoleData) => void;
  onBack: () => void;
}) {
  const [roleData, setRoleData] = useState<RoleData>({
    role: '',
    title: ''
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
            What's your role?
          </h2>
          <p className="text-neutral-light/60 text-center text-sm">
            This helps us customize your experience
          </p>

          <div className="grid grid-cols-1 gap-4">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setRoleData({ role: option.id, title: option.title })}
                className={`p-4 rounded-lg border transition-all text-left flex items-center gap-4 ${roleData.role === option.id
                    ? 'border-accent-green bg-accent-green/10 text-accent-green'
                    : 'border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/5'
                  }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-neutral-light/60">{option.description}</div>
                </div>
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Your Job Title (Optional)"
            value={roleData.title}
            onChange={(e) => setRoleData(d => ({ ...d, title: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
          />

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => onNext(roleData)}
              disabled={!roleData.role}
              className="flex-1 px-4 py-3 rounded-lg bg-accent-green hover:bg-accent-green-light text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 