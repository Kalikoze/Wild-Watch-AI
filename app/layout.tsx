import type { Metadata } from "next";
import Navigation from '@/app/components/navigation/Navigation';
import "./globals.css";
import AuthProvider from "@/app/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Wild Watch AI",
  description: "Wildlife Monitoring with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
