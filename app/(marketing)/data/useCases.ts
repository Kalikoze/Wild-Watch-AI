export interface UseCase {
  title: string;
  iconName: 'paw' | 'tree' | 'microscope';
  description: string;
  benefits: string[];
}

export const useCases: UseCase[] = [
  {
    title: "Zoo Management",
    iconName: 'paw',
    description: "Streamline daily monitoring and record-keeping with automated video analysis tools.",
    benefits: [
      "Quick video behavior analysis",
      "Automated daily activity logging",
      "Simple report generation for staff",
      "Centralized video storage & notes"
    ]
  },
  {
    title: "Wildlife Sanctuaries",
    iconName: 'tree',
    description: "Monitor wildlife rehabilitation with AI tools while minimizing disruption to recovering animals.",
    benefits: [
      "Non-invasive behavior monitoring",
      "Basic activity pattern tracking",
      "Easy reporting for care plans",
      "Secure video management"
    ]
  },
  {
    title: "Research Institutions",
    iconName: 'microscope',
    description: "Support research projects with comprehensive tools for behavioral analysis and data collection.",
    benefits: [
      "Student educational resources",
      "Research data collection tools",
      "Exportable data for analysis",
      "Collaborative video library"
    ]
  }
];
