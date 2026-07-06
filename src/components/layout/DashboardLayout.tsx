import type { ReactNode } from 'react';
import { DashboardProvider } from '../../context/DashboardContext';

interface DashboardLayoutProps {
  header?: ReactNode;
  children: ReactNode;
}

export function DashboardLayout({ header, children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        {header && (
          <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{header}</div>
          </header>
        )}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </DashboardProvider>
  );
}