import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function Team() {
  return <GenericListPage config={moduleConfigs.team} />;
}
