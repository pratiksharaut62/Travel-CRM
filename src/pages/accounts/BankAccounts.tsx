import GenericListPage from "../GenericListPage";
import { moduleConfigs } from "../../data/moduleConfigs";
export default function BankAccounts() {
  return <GenericListPage config={moduleConfigs.bankAccounts} />;
}
