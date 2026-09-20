import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function LeadSources() {
  return <GenericListPage config={moduleConfigs.leadSources} />;
}
