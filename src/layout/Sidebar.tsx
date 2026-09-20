import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navigation } from "../data/navigation";
import { NavIcon } from "../components/IconMap";
import { ChevronDownIcon, XIcon, LogoMark } from "../components/icons";

function isChildActive(children: { path: string }[] | undefined, pathname: string) {
  return !!children?.some((c) => pathname.startsWith(c.path));
}

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach((item) => {
      if (item.children && isChildActive(item.children, location.pathname)) {
        initial[item.label] = true;
      }
    });
    return initial;
  });

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[260px] shrink-0 -translate-x-full flex-col bg-[#0b1320] text-[#8d99ae] transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : ""
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-5 pb-4 pt-5">
          <LogoMark className="h-8 w-8 text-[#f06744]" />
          <div className="flex-1">
            <div className="text-[17px] font-bold tracking-tight text-white">MoonTrip</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8d99ae] hover:bg-[#1a2332] hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Agency Subheader */}
        <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl bg-[#141d2b] px-3 py-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#253141] text-[12px] font-semibold text-white">
            T
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-white">Travel Agency</div>
            <div className="text-[11px] text-[#8d99ae]">Dashboard</div>
          </div>
        </div>

        <div className="my-1 border-t border-[#182130]" />

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const hasChildren = !!item.children?.length;
              const active = hasChildren
                ? isChildActive(item.children, location.pathname)
                : location.pathname === item.path;
              const isOpen = openGroups[item.label] ?? false;

              if (!hasChildren) {
                return (
                  <li key={item.label} className="relative">
                    {/* Active Left Indicator Bar */}
                    {active && (
                      <span className="absolute -left-2 top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-r-full bg-[#f06744]" />
                    )}
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                          isActive
                            ? "bg-[#202b3c] font-semibold text-white"
                            : "text-[#8d99ae] hover:bg-[#141d2b] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <NavIcon
                            name={item.icon}
                            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                              isActive ? "text-[#f06744]" : "text-[#8d99ae] group-hover:text-white"
                            }`}
                          />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                item.badge === "PRO"
                                  ? "bg-[#0e3a38] text-[#22c55e]"
                                  : "bg-[#3c2222] text-[#f87171]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggle(item.label)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                      active
                        ? "text-white"
                        : "text-[#8d99ae] hover:bg-[#141d2b] hover:text-white"
                    }`}
                  >
                    <NavIcon
                      name={item.icon}
                      className={`h-[18px] w-[18px] shrink-0 ${
                        active ? "text-[#f06744]" : "text-[#8d99ae] group-hover:text-white"
                      }`}
                    />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="mt-0.5 space-y-0.5 pl-9">
                      {item.children!.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                                isActive
                                  ? "bg-[#202b3c] font-semibold text-white"
                                  : "text-[#8d99ae] hover:bg-[#141d2b] hover:text-white"
                              }`
                            }
                          >
                            <span className="flex-1 truncate">{child.label}</span>
                            {child.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                  child.badge === "PRO"
                                    ? "bg-[#0e3a38] text-[#22c55e]"
                                    : "bg-[#3c2222] text-[#f87171]"
                                }`}
                              >
                                {child.badge}
                              </span>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Profile Container */}
        <div className="p-3">
          <div className="rounded-2xl border border-[#182333] bg-[#0e1726] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f06744] text-xs font-bold text-white shadow-sm">
                PR
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[13px] font-semibold text-white">Pratiksha Raut</div>
                <div className="truncate text-[11px] text-[#8d99ae]">Owner · Administrator</div>
              </div>
            </div>

            {/* Free Plan Badge */}
            <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#182232] py-1.5 text-[11px] font-medium text-[#8d99ae]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#526075]" />
              Free Plan
            </div>

            {/* Sign Out Button */}
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-[#212e42] bg-[#141d2b] py-1.5 text-[12px] font-medium text-[#8d99ae] transition-colors hover:bg-[#1f2b3e] hover:text-white">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>

            {/* Version Text */}
            <div className="mt-2.5 text-center text-[10px] text-[#526075]">v3.0.0</div>
          </div>
        </div>
      </aside>
    </>
  );
}