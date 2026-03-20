"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Home, Search, Bookmark, Settings, PanelLeftClose } from "lucide-react";
import { useDesktopNavStore } from "@/stores/useDesktopNavStore";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Saved", href: "/saved", icon: Bookmark },
];

const DesktopLink = memo(function DesktopLink({
  name,
  href,
  icon: Icon,
  active,
  showLabel,
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-start py-3 pl-6 transition-colors duration-200 ${
        active ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={22} strokeWidth={1.5} className="shrink-0" />
      <span
        className={`overflow-hidden whitespace-nowrap text-sm transition-[max-width,opacity,margin] duration-300 ease-in-out ${
          showLabel ? "ml-3 max-w-32 opacity-100" : "ml-0 max-w-0 opacity-0"
        }`}
      >
        {name}
      </span>
    </Link>
  );
});

const MobileLink = memo(function MobileLink({
  name,
  href,
  icon: Icon,
  active,
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center flex-1 transition-colors duration-200 pb-3"
    >
      <Icon
        size={22}
        strokeWidth={1.5}
        className={`h-full w-fit border-t-2 pt-3 px-3 pb-1 transition-all ${
          active
            ? "text-gray-800 border-gray-800"
            : "text-gray-600 border-transparent"
        }`}
      />
      <span className="text-xs">{name}</span>
    </Link>
  );
});

export default function Navbar() {
  const { isDesktopNavOpen, toggleDesktopNav } = useDesktopNavStore(
    useShallow((state) => ({
      isDesktopNavOpen: state.isDesktopNavOpen,
      toggleDesktopNav: state.toggleDesktopNav,
    })),
  );
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar - Left */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 z-40 h-screen flex-col overflow-hidden border-r border-gray-300 bg-gray-50 transition-[width] duration-300 ease-in-out will-change-[width] ${
          isDesktopNavOpen ? "w-56" : "w-18"
        }`}
      >
        <button
          type="button"
          onClick={toggleDesktopNav}
          aria-label={isDesktopNavOpen ? "Hide sidebar" : "Show sidebar"}
          className={`flex justify-center pt-2 transition-all duration-300 hover:text-gray-800 cursor-pointer ${isDesktopNavOpen ? "justify-end pr-2" : ""}`}
        >
          <PanelLeftClose
            size={22}
            strokeWidth={1.5}
            className={`transition-transform duration-300 text-gray-400 hover:text-gray-600 ease-in-out ${
              isDesktopNavOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        {/* Logo / Brand */}
        <div
          className={`overflow-hidden px-6 transition-[max-height,opacity,padding] duration-300 ease-in-out ${
            isDesktopNavOpen
              ? "max-h-40 pb-4 pt-0 opacity-100"
              : "max-h-0 pb-0 pt-0 opacity-0"
          }`}
        >
          <div className="w-44">
            <h1 className="text-4xl leading-none font-semibold text-gray-800 tracking-tight">
              LIO
              {/* <span className="text-gray-500 font-medium text-xl">.</span> */}
              {/* <span className="text-sm text-gray-400 font-medium">DEV</span> */}
            </h1>
            <p className="text-gray-600 text-sm">Portfolio Management</p>
          </div>
        </div>

        {/* Main Menu Items */}
        <nav className="flex-1">
          {menuItems.map((item) => (
            <DesktopLink
              key={item.name}
              name={item.name}
              href={item.href}
              icon={item.icon}
              active={isActive(item.href)}
              showLabel={isDesktopNavOpen}
            />
          ))}
        </nav>

        {/* Settings at Bottom */}
        <div className="mb-4">
          <DesktopLink
            name="Settings"
            href="/settings"
            icon={Settings}
            active={isActive("/settings")}
            showLabel={isDesktopNavOpen}
          />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 z-50">
        <div className="flex items-center justify-around">
          {menuItems.map((item) => (
            <MobileLink
              key={item.name}
              {...item}
              active={isActive(item.href)}
            />
          ))}
          <MobileLink
            href="/settings"
            icon={Settings}
            name="Settings"
            active={isActive("/settings")}
          />
        </div>
      </nav>
    </>
  );
}
