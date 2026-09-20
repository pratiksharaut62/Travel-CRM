import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Directory() {
  return <GenericListPage config={moduleConfigs.vendorDirectory} />;
}
