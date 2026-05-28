import type { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
  detail?: string;
  accent?: string;
};

export default function StatCard({ label, value, detail, accent = "text-slate-100" }: Props) {
  return (
    <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className={`mt-3 text-2xl font-semibold ${accent}`}>{value}</p>
      {detail ? <p className="mt-2 text-xs text-slate-500">{detail}</p> : null}
    </div>
  );
}
