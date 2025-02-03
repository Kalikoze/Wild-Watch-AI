import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { MdScience, MdPets } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

type RoleData = {
  role: string;
  title: string;
};

const roles = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full access to manage organization, users, and video analysis settings',
    icon: <FaUserShield className="w-6 h-6" />,
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Can upload videos, conduct analysis, and generate behavioral reports',
    icon: <MdScience className="w-6 h-6" />,
  },
  {
    id: 'animal_care',
    title: 'Animal Care Specialist',
    description: 'Can view analysis, add notes, and download behavioral reports',
    icon: <MdPets className="w-6 h-6" />,
  },
  {
    id: 'viewer',
    title: 'Viewer',
    description: 'View-only access to analysis results and reports',
    icon: <IoMdEye className="w-6 h-6" />,
  },
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
  const [error, setError] = useState<string>('');

  const isValid = () => roleData.role !== '';

  const handleNext = () => {
    try {
      if (!isValid()) {
        setError('Please select a role');
        return;
      }
      onNext(roleData);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

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
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setError('');
                  setRoleData(d => ({
                    ...d,
                    role: role.id
                  }));
                }}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${roleData.role === role.id
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-neutral-dark/30 text-neutral-light/60 hover:bg-neutral-light/5'
                  }`}
              >
                <div className="text-2xl">
                  {role.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{role.title}</div>
                  <div className="text-sm opacity-80">{role.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-light mb-2">
              Your Job Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Senior Researcher, Lead Veterinarian"
              value={roleData.title}
              onChange={(e) => {
                setError('');
                setRoleData(d => ({ ...d, title: e.target.value }));
              }}
              className="w-full px-4 py-3 rounded-lg bg-neutral-light/5 border border-neutral-dark/30 text-neutral-light placeholder-neutral-light/30 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
            />
            <p className="mt-2 text-sm text-neutral-light/60">
              If provided, this will be displayed on your profile and in communications
            </p>
          </div>

          {error && (
            <div className="text-accent-orange text-sm text-center mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 rounded-lg border border-neutral-dark/30 text-neutral-light hover:bg-neutral-light/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!isValid()}
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