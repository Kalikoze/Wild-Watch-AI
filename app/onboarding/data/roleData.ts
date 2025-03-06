export interface RoleOption {
  id: string;
  title: string;
  description: string;
  iconType: 'admin' | 'researcher' | 'animalCare' | 'viewer';
}

export const roleOptions: RoleOption[] = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full access to manage organization, users, and video analysis settings',
    iconType: 'admin',
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Can upload videos, conduct analysis, and generate behavioral reports',
    iconType: 'researcher',
  },
  {
    id: 'animal_care',
    title: 'Animal Care Specialist',
    description: 'Can view analysis, add notes, and download behavioral reports',
    iconType: 'animalCare',
  },
  {
    id: 'viewer',
    title: 'Viewer',
    description: 'View-only access to analysis results and reports',
    iconType: 'viewer',
  },
]; 