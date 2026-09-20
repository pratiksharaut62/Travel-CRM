import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Payments() {
  return <GenericListPage config={moduleConfigs.vendorPayments} />;
}
