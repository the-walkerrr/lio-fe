'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Search, Bookmark, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Portfolios', href: '/portfolios', icon: FileText },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Saved', href: '/saved', icon: Bookmark },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar - Left */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 flex-col bg-gray-50 border-r border-gray-300">
        {/* Logo / Brand */}
        <div className="p-6">
          <h1 className="text-4xl font-medium text-gray-800">LIO</h1>
          <p className="text-gray-600 text-sm">Portfolio Management</p>
        </div>

        {/* Main Menu Items */}
        <nav className="flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-gray-600 transition-colors duration-200 ${
                  active
                    ? 'bg-gray-200 text-gray-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={22} />
                <span className="font-normal">{item.name}</span>
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 z-50">
        <div className="flex items-center justify-around h-16">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full text-gray-600 transition-colors duration-200 ${
                  active
                    ? 'border-t-2 border-gray-800 text-gray-800'
                    : 'border-t-2 border-transparent hover:text-gray-800'
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="text-[10px] mt-1 font-normal">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
