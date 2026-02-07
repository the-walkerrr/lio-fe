'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Search, Bookmark, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Portfolios', href: '/portfolios', icon: FileText },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Saved', href: '/saved', icon: Bookmark },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  // Desktop Sidebar Link
  const SidebarLink = ({ name, href, icon: Icon }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
        isActive(href) 
          ? 'bg-gray-200 text-gray-800' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={22} strokeWidth={1.5} />
      <span className="font-normal">{name}</span>
    </Link>
  );

  // Mobile Bottom Link
  const MobileLink = ({ href, icon: Icon }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className="flex flex-col items-center justify-center flex-1 transition-colors duration-200"
      >
        <Icon 
          size={20} 
          strokeWidth={1.5} 
          className={`h-full w-fit border-t-2 py-3 px-3 transition-all ${
            active ? 'text-gray-800 border-gray-800' : 'text-gray-600 border-transparent'
          }`} 
        />
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar - Left */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 flex-col bg-gray-50 border-r border-gray-300">
        {/* Logo / Brand */}
        <div className="p-6">
          <h1 className="text-4xl font-medium text-gray-800 tracking-tight">LIO</h1>
          <p className="text-gray-600 text-sm">Portfolio Management</p>
        </div>

        {/* Main Menu Items */}
        <nav className="flex-1 mt-2">
          {menuItems.map((item) => (
            <SidebarLink key={item.name} {...item} />
          ))}
        </nav>

        {/* Settings at Bottom */}
        <div className="mb-4">
          <SidebarLink name="Settings" href="/settings" icon={Settings} />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 z-50">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => (
            <MobileLink key={item.name} {...item} />
          ))}
          <MobileLink href="/settings" icon={Settings} />
        </div>
      </nav>
    </>
  );
}
