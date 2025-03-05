export interface ProcessStep {
  title: string;
  description: string;
  iconName: 'upload' | 'cog' | 'chart' | 'bell' | 'lightbulb';
}

export const processSteps: ProcessStep[] = [
  {
    title: "Upload Videos",
    description: "Securely upload and store your wildlife footage with cloud-based video management.",
    iconName: 'upload'
  },
  {
    title: "Basic Analysis",
    description: "Initial AI processing detects animal presence and tracks simple movement patterns.",
    iconName: 'cog'
  },
  {
    title: "Simple Insights",
    description: "View basic metrics about animal presence and movement patterns in an easy-to-read dashboard.",
    iconName: 'chart'
  },
  {
    title: "Team Access",
    description: "Share findings with your team through secure, role-based access controls.",
    iconName: 'bell'
  },
  {
    title: "Export Data",
    description: "Download simple CSV reports and share insights with stakeholders.",
    iconName: 'lightbulb'
  }
]; 