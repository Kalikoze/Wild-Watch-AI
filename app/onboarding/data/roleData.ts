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
    description: 'Can manage all organization, users, and video analysis settings',
    iconType: 'admin',
  },
  {
    id: 'researcher',
    title: 'Researcher',
    description: 'Can upload videos, run analysis, and generate behavioral reports',
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
    description: 'Can view latest analysis results and access behavioral reports',
    iconType: 'viewer',
  },
]; 