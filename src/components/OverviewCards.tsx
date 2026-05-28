import type { StaticStats } from "../RemortgageCalculator";

type Props = {
  stats: StaticStats;
  purchasePrice: number;
};

export default function OverviewCards({ stats, purchasePrice }: Props) {
  const loanLTV = ((stats.loanAmount / purchasePrice) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Loan amount</p>
        <p className="mt-3 text-2xl font-semibold text-white">
          {stats.currency(stats.loanAmount)}
        </p>
        <p className="mt-2 text-xs text-slate-500">{loanLTV}% starting LTV</p>
      </div>
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Monthly payment</p>
        <p className="mt-3 text-2xl font-semibold text-cyan-300">
          {stats.currency(stats.monthlyPayment)}
        </p>
        <p className="mt-2 text-xs text-slate-500">Based on {stats.termYears} year term</p>
      </div>
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Interest paid</p>
        <p className="mt-3 text-2xl font-semibold text-rose-400">
          {stats.currency(stats.totalInterestPaid)}
        </p>
        <p className="mt-2 text-xs text-slate-500">During fixed term</p>
      </div>
      <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)]">
        <p className="text-sm font-medium text-slate-400">Projected equity</p>
        <p className="mt-3 text-2xl font-semibold text-emerald-300">
          {stats.currency(stats.futureEquity)}
        </p>
        <p className="mt-2 text-xs text-slate-500">After {stats.fixTermYears} years</p>
      </div>
    </div>
  );
}
