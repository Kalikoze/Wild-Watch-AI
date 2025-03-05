export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "How does WildWatch AI store and manage video data?",
    answer: "Videos are securely stored using Cloudinary's enterprise-grade cloud storage, while metadata and analysis results are managed in our secure database. Access is controlled through user authentication, ensuring your data remains private and accessible only to authorized team members."
  },
  {
    question: "What kind of animal behaviors can the AI currently detect?",
    answer: "In our initial release, we focus on basic movement detection and presence tracking. Our AI model can identify when animals enter or leave frame and track simple movement patterns. More complex behavior analysis features will be added in future updates."
  },
  {
    question: "What file formats and video sizes are supported?",
    answer: "We support common video formats including MP4, MOV, and AVI through our Cloudinary integration. For optimal performance, we recommend videos under 100MB per upload, though larger files are supported."
  },
  {
    question: "How can I access and share the analysis results?",
    answer: "Analysis results are available through our dashboard, where you can view basic metrics and download simple CSV reports. Team members can access shared videos and results through their authorized accounts."
  },
  {
    question: "What technical requirements are needed to use WildWatch AI?",
    answer: "You just need a modern web browser and internet connection. Our cloud-based platform handles all the processing - no special software installation required. Simply upload your videos and access results through our web interface."
  },
  {
    question: "Can multiple team members collaborate on the platform?",
    answer: "Yes! Our authentication system supports multiple users, allowing team members to access shared videos and analysis results. Each user gets their own secure login while working with the same dataset."
  }
];