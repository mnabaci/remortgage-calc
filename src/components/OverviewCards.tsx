import type { StaticStats } from "../types/mortgage";
import StatCard from "./ui/StatCard";

type Props = {
  stats: StaticStats;
  purchasePrice: number;
};

export default function OverviewCards({ stats, purchasePrice }: Props) {
  const loanLTV = ((stats.loanAmount / purchasePrice) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Loan amount"
        value={stats.currency(stats.loanAmount)}
        detail={`${loanLTV}% starting LTV`}
      />
      <StatCard
        label="Monthly payment"
        value={stats.currency(stats.monthlyPayment)}
        detail={`Based on ${stats.termYears} year term`}
        accent="text-cyan-300"
      />
      <StatCard
        label="Interest paid"
        value={stats.currency(stats.totalInterestPaid)}
        detail="During fixed term"
        accent="text-rose-400"
      />
      <StatCard
        label="Projected equity"
        value={stats.currency(stats.futureEquity)}
        detail={`After ${stats.fixTermYears} years`}
        accent="text-emerald-300"
      />
    </div>
  );
}
