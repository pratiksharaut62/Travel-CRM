import { NavLink, Outlet, useNavigate } from "react-router-dom";
import UserChip from "../../components/UserChip";
import { ChevronLeftIcon } from "../../components/icons";

const tabs = [
  { label: "Profile", path: "/settings/profile" },
  { label: "Company", path: "/settings/company" },
  { label: "Lead Sources", path: "/settings/lead-sources", badge: "BETA" },
  { label: "Nomenclature", path: "/settings/nomenclature" },
  { label: "Team", path: "/settings/team" },
  { label: "Connections", path: "/settings/connections" },
  { label: "Billing", path: "/settings/billing" },
  { label: "Branding", path: "/settings/branding" },
  { label: "Data Import", path: "/settings/data-import" },
  { label: "Deleted Bookings", path: "/settings/deleted-bookings" },
];

export default function SettingsLayout() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate(-1)}
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-100"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-[17px] font-semibold text-ink-900 sm:text-[19px]">Settings</h1>
            <p className="mt-0.5 text-[12.5px] text-ink-500 sm:text-[13px]">Manage your account and company settings</p>
          </div>
        </div>
        <UserChip />
      </div>

      <div className="mb-5 flex gap-1.5 overflow-x-auto border-b border-ink-100 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors ${
                isActive
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`
            }
          >
            {tab.label}
            {tab.badge && <span className="badge-beta">{tab.badge}</span>}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  );
}
