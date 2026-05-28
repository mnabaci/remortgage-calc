import type { ChangeEventHandler } from "react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function ToggleSwitch({ label, checked, onChange }: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.checked);
  };

  return (
    <label className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm ring-1 ring-slate-800 whitespace-nowrap">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-5 w-5 rounded border-slate-700 bg-slate-950 text-cyan-500 shadow-sm focus:ring-cyan-400"
      />
      <span>{label}</span>
    </label>
  );
}
