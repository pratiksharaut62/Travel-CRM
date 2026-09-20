import type { ComponentType, SVGProps } from "react";
import {
  GridIcon,
  FileTextIcon,
  RouteIcon,
  InboxIcon,
  CalendarIcon,
  LayersIcon,
  SwapIcon,
  CardIcon,
  BarChartIcon,
  BankIcon,
  BookIcon,
  UsersIcon,
  ReceiptIcon,
  TruckIcon,
  ContactIcon,
  WalletIcon,
  ClockIcon,
  PlaneIcon,
  SparkleIcon,
  MessageSparkleIcon,
  PlayIcon,
  HelpIcon,
  GearIcon,
} from "./icons";

export const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  grid: GridIcon,
  file: FileTextIcon,
  route: RouteIcon,
  inbox: InboxIcon,
  calendar: CalendarIcon,
  layers: LayersIcon,
  swap: SwapIcon,
  card: CardIcon,
  "bar-chart": BarChartIcon,
  bank: BankIcon,
  book: BookIcon,
  users: UsersIcon,
  receipt: ReceiptIcon,
  truck: TruckIcon,
  contact: ContactIcon,
  wallet: WalletIcon,
  clock: ClockIcon,
  plane: PlaneIcon,
  sparkle: SparkleIcon,
  "message-sparkle": MessageSparkleIcon,
  play: PlayIcon,
  help: HelpIcon,
  gear: GearIcon,
};

export function NavIcon({ name, className }: { name: string; className?: string }) {
  const Cmp = iconMap[name] ?? GridIcon;
  return <Cmp className={className} />;
}
