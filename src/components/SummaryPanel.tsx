import type { StaticStats } from "../types/mortgage";
import SectionCard from "./ui/SectionCard";

type Props = {
  stats: StaticStats;
  futureValuation: number;
};

export default function SummaryPanel({ stats, futureValuation }: Props) {
  const ltvClass =
    stats.futureLTV > 90
      ? "text-rose-300"
      : stats.futureLTV > 85
      ? "text-cyan-200"
      : "text-emerald-300";

  return (
    <SectionCard
      title="Fixed rate position"
      titleSuffix={
        <div className="rounded-3xl bg-slate-900/90 px-4 py-3 text-right border border-slate-800">
          <p className="text-xs uppercase text-slate-500">Projected LTV</p>
          <p className={`text-4xl font-bold ${ltvClass}`}>{stats.futureLTV.toFixed(1)}%</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-slate-900/95 p-6 border border-slate-800">
          <p className="text-sm text-slate-400">Remaining balance</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {stats.currency(stats.remainingBalance)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {stats.currency(stats.principalPaid)} paid off from a starting loan of {stats.currency(stats.loanAmount)}.
          </p>
        </div>
        <div className="rounded-3xl bg-slate-900/95 p-6 border border-slate-800">
          <p className="text-sm text-slate-400">Predicted valuation</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {stats.currency(futureValuation)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Future equity estimated at {stats.currency(stats.futureEquity)}.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-900/90 border border-slate-800 p-5">
        {stats.futureLTV > 90 ? (
          <>
            <p className="text-sm font-semibold text-rose-200 mb-2">90% LTV warning</p>
            <p className="text-sm text-rose-100">
              Your projected LTV is above 90%. If your valuation is lower than expected, your remortgage options may move into a more expensive tier.
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Top-up to 90%: {stats.currency(stats.cashTopUpFor90)}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-cyan-200 mb-2">Healthy LTV</p>
            <p className="text-sm text-cyan-100">
              Your remortgage position is in a stronger bracket than the 95% market, which should leave you with better pricing and product choice.
            </p>
          </>
        )}
      </div>
    </SectionCard>
  );
}
