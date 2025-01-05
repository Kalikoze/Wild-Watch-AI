export interface Feature {
  title: string;
  description: string;
  details: string[];
  iconName: 'video' | 'chart' | 'pencil' | 'warning';
}

export const features: Feature[] = [
  {
    title: "Video Analysis",
    description: "Upload and analyze videos to detect animal presence and basic movements. Perfect for daily monitoring needs.",
    details: [
      "Quick upload and processing of common video formats",
      "Basic animal presence detection",
      "Simple movement tracking",
      "Easy-to-use interface for staff"
    ],
    iconName: 'video'
  },
  {
    title: "Activity Tracking",
    description: "Record and organize animal activities with a straightforward logging system.",
    details: [
      "Time-stamped activity logging",
      "Basic movement pattern tracking",
      "Simple categorization of behaviors",
      "Daily activity summaries"
    ],
    iconName: 'warning'
  },
  {
    title: "Smart Reports",
    description: "Generate clear, actionable reports for your team.",
    details: [
      "One-click daily summaries",
      "Basic PDF and CSV exports",
      "Simple charts for activity patterns",
      "Easy sharing with team members"
    ],
    iconName: 'chart'
  },
  {
    title: "Video Management",
    description: "Keep your video records organized and accessible.",
    details: [
      "Centralized video storage",
      "Basic search and filtering",
      "Simple note-taking capability",
      "Secure access controls"
    ],
    iconName: 'pencil'
  }
];