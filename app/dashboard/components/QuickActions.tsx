'use client';

import {
  RiUploadCloud2Line,
  RiBarChartBoxLine,
  RiFileChartLine,
  RiVideoLine,
  RiArrowRightSLine,
  RiFlashlightLine
} from 'react-icons/ri';

// Color styles for icons
const iconStyles = [
  {
    bg: 'bg-accent-green/10',
    color: 'text-accent-green',
    hoverColor: 'group-hover:text-accent-green-light'
  },
  {
    bg: 'bg-accent-orange/10',
    color: 'text-accent-orange',
    hoverColor: 'group-hover:text-accent-orange-light'
  },
  {
    bg: 'bg-accent-gold/10',
    color: 'text-accent-gold',
    hoverColor: 'group-hover:text-accent-gold-light'
  },
  {
    bg: 'bg-accent-blue/10',
    color: 'text-accent-blue',
    hoverColor: 'group-hover:text-accent-blue-light'
  }
];

const actions = [
  {
    label: 'Upload Video',
    description: 'Add new wildlife footage',
    href: '/dashboard/videos/upload',
    icon: RiUploadCloud2Line,
    style: iconStyles[0]
  },
  {
    label: 'New Analysis',
    description: 'Analyze animal behavior',
    href: '/dashboard/analysis/new',
    icon: RiBarChartBoxLine,
    style: iconStyles[1]
  },
  {
    label: 'View Reports',
    description: 'See behavior insights',
    href: '/dashboard/analysis/reports',
    icon: RiFileChartLine,
    style: iconStyles[2]
  },
  {
    label: 'Browse Videos',
    description: 'Access your video library',
    href: '/dashboard/videos',
    icon: RiVideoLine,
    style: iconStyles[3]
  }
];

export const QuickActions = () => {
  return (
    <div className="bg-primary-light rounded-lg shadow-md border border-neutral-light/10 overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-neutral-light/10 flex items-center gap-2">
        <RiFlashlightLine className="text-neutral-light" />
        <h2 className="text-lg font-semibold text-neutral-light">Quick Actions</h2>
      </div>

      <div className="overflow-auto p-3 flex-grow">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg bg-primary hover:bg-primary-dark transition-colors duration-200 border border-neutral-light/10 group"
            >
              <div className={`p-2 rounded-full ${action.style.bg} flex-shrink-0 flex items-center justify-center`}>
                <action.icon className={`text-lg ${action.style.color} ${action.style.hoverColor} transition-colors`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-neutral-light group-hover:text-accent-green transition-colors">
                  {action.label}
                </div>
                <div className="text-xs text-neutral mt-1">
                  {action.description}
                </div>
              </div>
              <RiArrowRightSLine className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-light" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}; 