import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import FloatingHelp from "../components/FloatingHelp";
import { MenuIcon, LogoMark } from "../components/icons";

export default function DashboardLayout() {
  const location = useLocation();
  const hideFloatingHelp = location.pathname === "/tara";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-canvas lg:overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-ink-100 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 text-ink-600"
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <LogoMark className="h-7 w-7" />
          <span className="text-[14px] font-semibold text-ink-900">MoonTrip</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            <Outlet />
          </div>
        </main>
      </div>
      {!hideFloatingHelp && <FloatingHelp />}
    </div>
  );
}
