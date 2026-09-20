import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function CustomersList() {
  return <GenericListPage config={moduleConfigs.customersList} />;
}
