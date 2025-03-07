import { HiHome, HiCurrencyDollar, HiSpeakerphone } from 'react-icons/hi';
import { FaLightbulb, FaTrophy } from 'react-icons/fa';
import { IconType } from 'react-icons';

export interface NavItem {
  href: string;
  label: string;
  icon: IconType;
  highlight?: boolean;
}

export const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: HiHome
  },
  {
    href: '/pricing',
    label: 'Pricing',
    icon: HiCurrencyDollar
  },
  {
    href: '/our-story',
    label: 'Our Story',
    icon: FaLightbulb
  },
  {
    href: '/updates',
    label: 'Updates',
    icon: HiSpeakerphone
  },
  {
    href: '/compare',
    label: 'Why WildWatch?',
    icon: FaTrophy,
    highlight: true
  },
]; 