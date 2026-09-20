import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Record as ModuleRecord } from "../types";

type Store = Record<string, ModuleRecord[]>;

type DataContextValue = {
  getRecords: (moduleKey: string) => ModuleRecord[];
  addRecord: (moduleKey: string, record: Omit<ModuleRecord, "id">) => void;
  updateRecord: (moduleKey: string, id: string, record: Omit<ModuleRecord, "id">) => void;
  deleteRecord: (moduleKey: string, id: string) => void;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>({});

  const getRecords = useCallback((moduleKey: string) => store[moduleKey] ?? [], [store]);

  const addRecord = useCallback((moduleKey: string, record: Omit<ModuleRecord, "id">) => {
    setStore((prev) => {
      const existing = prev[moduleKey] ?? [];
      const id = `${moduleKey}-${Date.now()}-${Math.round(Math.random() * 1000)}`;
      return { ...prev, [moduleKey]: [{ id, ...record }, ...existing] };
    });
  }, []);

  const updateRecord = useCallback((moduleKey: string, id: string, record: Omit<ModuleRecord, "id">) => {
    setStore((prev) => {
      const existing = prev[moduleKey] ?? [];
      return {
        ...prev,
        [moduleKey]: existing.map((r) => (r.id === id ? { id, ...record } : r)),
      };
    });
  }, []);

  const deleteRecord = useCallback((moduleKey: string, id: string) => {
    setStore((prev) => {
      const existing = prev[moduleKey] ?? [];
      return { ...prev, [moduleKey]: existing.filter((r) => r.id !== id) };
    });
  }, []);

  const value = useMemo(
    () => ({ getRecords, addRecord, updateRecord, deleteRecord }),
    [getRecords, addRecord, updateRecord, deleteRecord]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
