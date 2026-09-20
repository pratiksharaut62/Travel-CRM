export type NavLeaf = {
  label: string;
  path: string;
  icon: string;
  badge?: "BETA" | "PRO";
};

export type NavItem = NavLeaf & {
  children?: NavLeaf[];
};

export const navigation: NavItem[] = [
  { label: "Dashboard", path: "/", icon: "grid" },
  { label: "Quote/Booking", path: "/quote-booking", icon: "file" },
  { label: "Itinerary", path: "/itinerary", icon: "route" },
  { label: "Leads", path: "/leads", icon: "inbox", badge: "BETA" },
  { label: "Bookings", path: "/bookings", icon: "calendar" },
  {
    label: "Accounts",
    path: "/accounts",
    icon: "swap",
    children: [
      { label: "Accounting Entries", path: "/accounts/entries", icon: "swap", badge: "BETA" },
      { label: "Hidden Markup", path: "/accounts/hidden-markup", icon: "card" },
      { label: "Reports", path: "/accounts/reports", icon: "bar-chart" },
      { label: "Bank Accounts", path: "/accounts/bank-accounts", icon: "bank" },
      { label: "Chart of Accounts", path: "/accounts/chart-of-accounts", icon: "book" },
    ],
  },
  {
    label: "Customers",
    path: "/customers",
    icon: "users",
    children: [
      { label: "Sales Invoices", path: "/customers/sales-invoices", icon: "file" },
      { label: "Receipts", path: "/customers/receipts", icon: "receipt" },
      { label: "Customers", path: "/customers/list", icon: "users" },
    ],
  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: "truck",
    children: [
      { label: "Directory", path: "/vendors/directory", icon: "contact" },
      { label: "Bills", path: "/vendors/bills", icon: "file" },
      { label: "Payments", path: "/vendors/payments", icon: "wallet" },
    ],
  },
  {
    label: "Datasets",
    path: "/datasets",
    icon: "layers",
    children: [
      { label: "All Datasets", path: "/datasets/all", icon: "layers" },
      { label: "Hotels", path: "/datasets/hotels", icon: "bank" },
      { label: "Activities", path: "/datasets/activities", icon: "star" },
      { label: "Transportation", path: "/datasets/transportation", icon: "bus" },
    ],
  },
  { label: "Lead Reports", path: "/lead-reports", icon: "clock", badge: "BETA" },
  { label: "Live Trips", path: "/live-trips", icon: "plane" },
  { label: "Tara", path: "/tara", icon: "sparkle" },
  { label: "Ask Anything", path: "/ask-anything", icon: "message-sparkle", badge: "PRO" },
  { label: "Interactive Demo", path: "/interactive-demo", icon: "play" },
  { label: "Help", path: "/help", icon: "help" },
  {
    label: "Settings",
    path: "/settings",
    icon: "gear",
    
  },
];
