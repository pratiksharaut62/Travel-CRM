import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Receipts() {
  return <GenericListPage config={moduleConfigs.receipts} />;
}
