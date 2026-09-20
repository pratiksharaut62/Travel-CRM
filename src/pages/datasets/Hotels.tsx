import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Hotels() {
  return <GenericListPage config={moduleConfigs.datasetsHotels} />;
}
