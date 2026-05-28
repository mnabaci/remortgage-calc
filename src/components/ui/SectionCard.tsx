import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  titleSuffix?: ReactNode;
  className?: string;
};

export default function SectionCard({
  title,
  children,
  titleSuffix,
  className = "",
}: Props) {
  return (
    <section className={`bg-slate-950 rounded-3xl border border-slate-800 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.55)] ${className}`}>
      <div className="p-6 border-b border-slate-800 bg-slate-900 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">{title}</p>
        </div>
        {titleSuffix ? <div>{titleSuffix}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
