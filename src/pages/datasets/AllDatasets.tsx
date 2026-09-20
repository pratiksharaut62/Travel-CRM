import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function AllDatasets() {
  return <GenericListPage config={moduleConfigs.datasetsAll} />;
}
