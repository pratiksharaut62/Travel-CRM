import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Bills() {
  return <GenericListPage config={moduleConfigs.vendorBills} />;
}
