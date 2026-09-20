export type Field = {
  key: string;
  label: string;
  type: "text" | "email" | "phone" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  span?: 1 | 2;
};

export type Column = {
  key: string;
  label: string;
};

export type Record = { id: string; [key: string]: string | number };

export type ModuleConfig = {
  key: string;
  title: string;
  subtitle: string;
  addLabel: string;
  emptyTitle: string;
  emptyDesc: string;
  columns: Column[];
  fields: Field[];
  searchPlaceholder: string;
  statusFilters?: string[];
  badge?: "BETA" | "PRO";
};
