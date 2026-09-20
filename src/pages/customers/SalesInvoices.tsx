import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function SalesInvoices() {
  return <GenericListPage config={moduleConfigs.salesInvoices} />;
}
