import type { ReactNode } from 'react';

interface HeaderProps {
  filterSlot?: ReactNode;
}

export function Header({ filterSlot }: HeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">Sales Dashboard</h1>
      {filterSlot && <div className="w-full sm:w-auto">{filterSlot}</div>}
    </div>
  );
}