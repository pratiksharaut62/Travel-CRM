import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function AccountingEntries() {
  return <GenericListPage config={moduleConfigs.accountingEntries} />;
}
