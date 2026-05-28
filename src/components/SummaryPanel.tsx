import type { StaticStats } from "../types/mortgage";
import SectionCard from "./ui/SectionCard";
import GoalStatusCard from "./ui/GoalStatusCard";
import { calculateRequiredMonthlyOverpaymentForLTV } from "../lib/mortgage";
import type { MortgageInput } from "../types/mortgage";

type Props = {
  stats: StaticStats;
  futureValuation: number;
  monthlyOverpayment: number;
  purchasePrice: number;
  deposit: number;
  termYears: number;
  interestRate: number;
  fixTermYears: number;
};

export default function SummaryPanel({
  stats,
  futureValuation,
  monthlyOverpayment,
  purchasePrice,
  deposit,
  termYears,
  interestRate,
  fixTermYears,
}: Props) {
  const ltvClass =
    stats.futureLTV <= 90
      ? "text-emerald-300"
      : stats.futureLTV <= 96
      ? "text-amber-300"
      : "text-rose-300";

  const cashTopUpFor90 = Math.max(0, stats.remainingBalance - futureValuation * 0.9);
  const cashTopUpFor95 = Math.max(0, stats.remainingBalance - futureValuation * 0.95);

  const baselineInputs: MortgageInput = {
    purchasePrice,
    deposit,
    termYears,
    interestRate,
    fixTermYears,
    futureValuation,
    monthlyOverpayment: 0,
  };

  const requiredMonthlyOverpayment90 = calculateRequiredMonthlyOverpaymentForLTV(baselineInputs, 90);
  const requiredMonthlyOverpayment95 = calculateRequiredMonthlyOverpaymentForLTV(baselineInputs, 95);

  return (
    <SectionCard
      title="Fixed rate position"
      titleSuffix={
        <div className="rounded-3xl bg-slate-900/90 px-4 py-2 border border-slate-800">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Projected LTV</p>
            <p className={`text-3xl font-bold ${ltvClass}`}>{stats.futureLTV.toFixed(1)}%</p>
          </div>
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

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <GoalStatusCard
          title="Goal: stay below 95% LTV"
          currentLTV={stats.futureLTV}
          targetLTV={95}
          topUpAmount={cashTopUpFor95}
          currentMonthlyOverpayment={monthlyOverpayment}
          requiredMonthlyOverpayment={requiredMonthlyOverpayment95}
          currency={stats.currency}
          description="This target keeps you out of the most constrained remortgage tier."
        />
        <GoalStatusCard
          title="Goal: stay below 90% LTV"
          currentLTV={stats.futureLTV}
          targetLTV={90}
          topUpAmount={cashTopUpFor90}
          currentMonthlyOverpayment={monthlyOverpayment}
          requiredMonthlyOverpayment={requiredMonthlyOverpayment90}
          currency={stats.currency}
          description="This target aims for a stronger remortgage position with better pricing options."
        />
      </div>
    </SectionCard>
  );
}
