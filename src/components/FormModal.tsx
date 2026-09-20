import { useEffect, useState, type FormEvent } from "react";
import Modal from "./Modal";
import type { Field, Record as ModuleRecord } from "../types";

export default function FormModal({
  open,
  onClose,
  onSubmit,
  title,
  fields,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, string | number>) => void;
  title: string;
  fields: Field[];
  initial?: ModuleRecord | null;
}) {
  const [values, setValues] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (open) {
      const next: Record<string, string | number> = {};
      fields.forEach((f) => {
        next[f.key] = initial ? (initial[f.key] as string | number) ?? "" : "";
      });
      setValues(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  const setField = (key: string, val: string | number) =>
    setValues((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.span === 2 ? "col-span-2" : "col-span-1"}>
              <label className="label" htmlFor={field.key}>
                {field.label}
                {field.required && <span className="text-brand-500"> *</span>}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.key}
                  className="input"
                  required={field.required}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setField(field.key, e.target.value)}
                >
                  <option value="" disabled>
                    Select {field.label.toLowerCase()}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  className="input min-h-[80px] resize-none"
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setField(field.key, e.target.value)}
                />
              ) : (
                <input
                  id={field.key}
                  className="input"
                  type={field.type === "phone" ? "tel" : field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setField(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2 border-t border-ink-100 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initial ? "Save Changes" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
