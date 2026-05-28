import { useEffect, useState } from "react";
import type { ChangeEventHandler } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: "text" | "number";
  min?: number;
  step?: number;
  helpText?: string;
  className?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  type = "number",
  min = 0,
  step,
  helpText,
  className = "",
}: Props) {
  const [displayValue, setDisplayValue] = useState(() => String(value));

  useEffect(() => {
    const normalized = String(value);
    if (normalized !== displayValue) {
      setDisplayValue(normalized);
    }
  }, [displayValue, value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const rawValue = event.target.value;
    const sanitizedValue = rawValue.replace(/^0+(?=\d)/, "") || "0";
    setDisplayValue(sanitizedValue);
    const parsed = Number(sanitizedValue);
    onChange(Number.isNaN(parsed) ? 0 : Math.max(min, parsed));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <input
        type={type}
        min={min}
        step={step}
        value={displayValue}
        onChange={handleChange}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
      />
      {helpText ? <p className="mt-3 text-xs text-slate-500">{helpText}</p> : null}
    </div>
  );
}
