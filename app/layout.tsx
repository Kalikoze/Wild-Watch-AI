import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "WildWatch AI",
  description: "Wildlife Monitoring with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: 'text-sm',
            style: {
              background: '#1E1E1E',
              color: '#F5F5F5',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '380px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            },
            success: {
              style: {
                background: 'rgba(40, 167, 69, 0.1)',
                border: '1px solid rgba(40, 167, 69, 0.2)',
              },
              iconTheme: {
                primary: '#28A745',
                secondary: '#1E1E1E',
              },
            },
            error: {
              style: {
                background: 'rgba(255, 87, 34, 0.1)',
                border: '1px solid rgba(255, 87, 34, 0.2)',
              },
              iconTheme: {
                primary: '#FF5722',
                secondary: '#1E1E1E',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
