'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  RiDashboardLine,
  RiVideoLine,
  RiFileChartLine,
  RiUploadCloud2Line,
  RiBearSmileLine,
  RiTeamLine,
  RiSettings4Line,
  RiDownload2Line
} from 'react-icons/ri';
import { useEffect, useState, useMemo } from 'react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  subItems?: Omit<NavItem, 'subItems'>[];
};

export const DashboardSidebar = ({
  userEmail,
  isOrganization
}: {
  userEmail: string;
  isOrganization: boolean;
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Use useMemo to stabilize navItems reference
  const navItems = useMemo(() => {
    const items: NavItem[] = [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <RiDashboardLine className="text-xl" />,
      },
      {
        label: 'Videos',
        href: '#',
        icon: <RiVideoLine className="text-xl" />,
        subItems: [
          {
            label: 'Browse Videos',
            href: '/dashboard/videos',
            icon: <RiVideoLine className="text-lg" />,
          },
          {
            label: 'Upload New',
            href: '/dashboard/videos/upload',
            icon: <RiUploadCloud2Line className="text-lg" />,
          },
        ],
      },
      {
        label: 'Analysis',
        href: '#',
        icon: <RiFileChartLine className="text-xl" />,
        subItems: [
          {
            label: 'Wildlife Tracking',
            href: '/dashboard/analysis/tracking',
            icon: <RiBearSmileLine className="text-lg" />,
          },
          {
            label: 'Reports',
            href: '/dashboard/analysis/reports',
            icon: <RiFileChartLine className="text-lg" />,
          },
          {
            label: 'Export Data',
            href: '/dashboard/analysis/export',
            icon: <RiDownload2Line className="text-lg" />,
          },
        ],
      },
    ];

    // Only show organization section if user is part of an organization
    if (isOrganization) {
      items.push({
        label: 'Organization',
        href: '/dashboard/organization',
        icon: <RiTeamLine className="text-xl" />,
      });
    }

    // Add settings as the last item
    items.push({
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <RiSettings4Line className="text-xl" />,
    });

    return items;
  }, [isOrganization]); // Only recompute if isOrganization changes

  useEffect(() => {
    // Set the active item based on current path
    setActiveItem(pathname);

    // Expand parent items if a child is active
    const newExpandedItems: Record<string, boolean> = {};
    navItems.forEach(item => {
      if (item.subItems) {
        const isSubItemActive = item.subItems.some(subItem =>
          pathname === subItem.href || pathname.startsWith(subItem.href + '/')
        );

        if (isSubItemActive) {
          newExpandedItems[item.label] = true;
        }
      }
    });

    setExpandedItems(prev => ({ ...prev, ...newExpandedItems }));
  }, [pathname, navItems]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <div className="h-full flex flex-col text-neutral-light">
      <div className="p-4 border-b border-neutral-light/10">
        <h2 className="text-xl font-semibold flex items-center">
          <RiBearSmileLine className="mr-2 text-accent-green" />
          Wild Watch AI
        </h2>
        <p className="text-xs text-neutral mt-1 truncate">{userEmail}</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              {!item.subItems ? (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${activeItem === item.href
                      ? 'bg-primary-dark text-accent-green'
                      : 'hover:bg-primary-light'
                    }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${expandedItems[item.label] ? 'bg-primary-dark' : 'hover:bg-primary-light'
                      }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                    <span className="text-xs">
                      {expandedItems[item.label] ? '▼' : '▶'}
                    </span>
                  </button>

                  {expandedItems[item.label] && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center px-3 py-2 rounded-md transition-colors ${activeItem === subItem.href
                                ? 'bg-primary-dark text-accent-green'
                                : 'hover:bg-primary-light'
                              }`}
                          >
                            {subItem.icon}
                            <span className="ml-2 text-sm">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-light/10 mt-auto">
        <div className="flex items-center text-sm">
          <div className="h-2 w-2 rounded-full bg-accent-green mr-2"></div>
          <span>Status: Online</span>
        </div>
      </div>
    </div>
  );
}; 