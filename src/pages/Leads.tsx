import GenericListPage from "./GenericListPage";
import { moduleConfigs } from "../data/moduleConfigs";
export default function Leads() {
  return <GenericListPage config={moduleConfigs.leads} />;
}
