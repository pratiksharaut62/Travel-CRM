import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import QuoteBooking from "./pages/QuoteBooking";
import Itinerary from "./pages/Itinerary";
import Leads from "./pages/Leads";
import Bookings from "./pages/Bookings";

import AccountingEntries from "./pages/accounts/AccountingEntries";
import HiddenMarkup from "./pages/accounts/HiddenMarkup";
import AccountReports from "./pages/accounts/Reports";
import BankAccounts from "./pages/accounts/BankAccounts";
import ChartOfAccounts from "./pages/accounts/ChartOfAccounts";

import SalesInvoices from "./pages/customers/SalesInvoices";
import Receipts from "./pages/customers/Receipts";
import CustomersList from "./pages/customers/CustomersList";

import VendorDirectory from "./pages/vendors/Directory";
import VendorBills from "./pages/vendors/Bills";
import VendorPayments from "./pages/vendors/Payments";

import AllDatasets from "./pages/datasets/AllDatasets";
import Hotels from "./pages/datasets/Hotels";

import LeadReports from "./pages/LeadReports";
import LiveTrips from "./pages/LiveTrips";
import Tara from "./pages/Tara";
import AskAnything from "./pages/AskAnything";
import InteractiveDemo from "./pages/InteractiveDemo";
import Help from "./pages/Help";

import SettingsLayout from "./pages/settings/SettingsLayout";
import Profile from "./pages/settings/Profile";
import Company from "./pages/settings/Company";
import LeadSources from "./pages/settings/LeadSources";
import Nomenclature from "./pages/settings/Nomenclature";
import Team from "./pages/settings/Team";
import Connections from "./pages/settings/Connections";
import Billing from "./pages/settings/Billing";
import Branding from "./pages/settings/Branding";
import DataImport from "./pages/settings/DataImport";
import DeletedBookings from "./pages/settings/DeletedBookings";

import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quote-booking" element={<QuoteBooking />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="/accounts" element={<Navigate to="/accounts/entries" replace />} />
        <Route path="/accounts/entries" element={<AccountingEntries />} />
        <Route path="/accounts/hidden-markup" element={<HiddenMarkup />} />
        <Route path="/accounts/reports" element={<AccountReports />} />
        <Route path="/accounts/bank-accounts" element={<BankAccounts />} />
        <Route path="/accounts/chart-of-accounts" element={<ChartOfAccounts />} />

        <Route path="/customers" element={<Navigate to="/customers/list" replace />} />
        <Route path="/customers/sales-invoices" element={<SalesInvoices />} />
        <Route path="/customers/receipts" element={<Receipts />} />
        <Route path="/customers/list" element={<CustomersList />} />

        <Route path="/vendors" element={<Navigate to="/vendors/directory" replace />} />
        <Route path="/vendors/directory" element={<VendorDirectory />} />
        <Route path="/vendors/bills" element={<VendorBills />} />
        <Route path="/vendors/payments" element={<VendorPayments />} />

        <Route path="/datasets" element={<Navigate to="/datasets/all" replace />} />
        <Route path="/datasets/all" element={<AllDatasets />} />
        <Route path="/datasets/hotels" element={<Hotels />} />

        <Route path="/lead-reports" element={<LeadReports />} />
        <Route path="/live-trips" element={<LiveTrips />} />
        <Route path="/tara" element={<Tara />} />
        <Route path="/ask-anything" element={<AskAnything />} />
        <Route path="/interactive-demo" element={<InteractiveDemo />} />
        <Route path="/help" element={<Help />} />

        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="/settings/profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="company" element={<Company />} />
          <Route path="lead-sources" element={<LeadSources />} />
          <Route path="nomenclature" element={<Nomenclature />} />
          <Route path="team" element={<Team />} />
          <Route path="connections" element={<Connections />} />
          <Route path="billing" element={<Billing />} />
          <Route path="branding" element={<Branding />} />
          <Route path="data-import" element={<DataImport />} />
          <Route path="deleted-bookings" element={<DeletedBookings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
