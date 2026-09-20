import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function ChartOfAccounts() {
  return <GenericListPage config={moduleConfigs.chartOfAccounts} />;
}
