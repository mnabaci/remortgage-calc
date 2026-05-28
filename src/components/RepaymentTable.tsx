import { useMemo, useState } from "react";
import type { YearlySummary } from "../types/mortgage";
import SectionCard from "./ui/SectionCard";
import ToggleSwitch from "./ui/ToggleSwitch";
import type { ScheduleEntry } from "../types/mortgage";

type Props = {
  schedule: ScheduleEntry[];
  monthlyPayment: number;
  currency: (value: number) => string;
};

export default function RepaymentTable({
  schedule,
  monthlyPayment,
  currency,
}: Props) {
  const [showCumulative, setShowCumulative] = useState(false);

  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal, 0);

  const yearlySummaries: YearlySummary[] = useMemo(() => {
    const yearlyMap = schedule.reduce((map, row) => {
      const existing = map.get(row.year);
      if (existing) {
        existing.payment += row.payment;
        existing.interest += row.interest;
        existing.principal += row.principal;
        existing.balance = row.balance;
      } else {
        map.set(row.year, {
          year: row.year,
          payment: row.payment,
          interest: row.interest,
          principal: row.principal,
          balance: row.balance,
          cumulativePayment: 0,
          cumulativeInterest: 0,
          cumulativePrincipal: 0,
        });
      }
      return map;
    }, new Map<number, YearlySummary>());

    return Array.from(yearlyMap.values())
      .sort((a, b) => a.year - b.year)
      .reduce<YearlySummary[]>((acc, yearRow) => {
        const previous = acc.at(-1);
        const cumulativePayment = (previous?.cumulativePayment ?? 0) + yearRow.payment;
        const cumulativeInterest = (previous?.cumulativeInterest ?? 0) + yearRow.interest;
        const cumulativePrincipal = (previous?.cumulativePrincipal ?? 0) + yearRow.principal;

        acc.push({
          ...yearRow,
          cumulativePayment,
          cumulativeInterest,
          cumulativePrincipal,
        });
        return acc;
      }, []);
  }, [schedule]);

  return (
    <SectionCard
      title="Repayment schedule"
      titleSuffix={
        <div className="rounded-3xl bg-slate-800 px-4 py-3 text-white border border-slate-700">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Fixed monthly payment</p>
          <p className="text-lg font-semibold mt-1">{currency(monthlyPayment)}</p>
        </div>
      }
      className="overflow-hidden"
    >
      <div className="max-h-[520px] overflow-x-auto bg-slate-950 rounded-3xl border border-slate-800">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-slate-900 text-slate-100">
            <tr>
              <th className="px-5 py-4 sticky left-0 bg-slate-900">Month</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Payment</th>
              <th className="px-5 py-4">Interest</th>
              <th className="px-5 py-4">Principal</th>
              <th className="px-5 py-4">Remaining balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.period} className="border-b border-slate-800 even:bg-slate-950 odd:bg-slate-900">
                <td className="px-5 py-4 font-medium text-slate-200">{row.period}</td>
                <td className="px-5 py-4 text-slate-400">{row.year}</td>
                <td className="px-5 py-4 text-slate-100">{currency(row.payment)}</td>
                <td className="px-5 py-4 text-rose-400">{currency(row.interest)}</td>
                <td className="px-5 py-4 text-emerald-400">{currency(row.principal)}</td>
                <td className="px-5 py-4 text-slate-100">{currency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 p-6 border-t border-slate-800 bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Total paid during fixed term</p>
          <p className="mt-1 text-xl font-semibold text-slate-100">
            {currency(totalInterest + totalPrincipal)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-4 border border-slate-800">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Principal</p>
            <p className="mt-2 text-lg font-semibold text-emerald-300">{currency(totalPrincipal)}</p>
          </div>
          <div className="rounded-3xl bg-slate-950 p-4 border border-slate-800">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Interest</p>
            <p className="mt-2 text-lg font-semibold text-rose-400">{currency(totalInterest)}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950 p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-200">Yearly totals</p>
            <p className="mt-1 text-xs text-slate-400">
              Yearly breakdown of payments, interest, principal and remaining balance.
            </p>
          </div>
          <ToggleSwitch
            label={showCumulative ? "Cumulative totals" : "Yearly totals"}
            checked={showCumulative}
            onChange={setShowCumulative}
          />
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-100">
              <tr>
                <th className="px-5 py-4">Year</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Interest</th>
                <th className="px-5 py-4">Principal</th>
                <th className="px-5 py-4">Closing balance</th>
              </tr>
            </thead>
            <tbody>
              {yearlySummaries.map((yearRow) => (
                <tr key={yearRow.year} className="border-b border-slate-800 even:bg-slate-900 odd:bg-slate-950">
                  <td className="px-5 py-4 font-medium text-slate-200">{yearRow.year}</td>
                  <td className="px-5 py-4 text-slate-100">
                    {currency(showCumulative ? yearRow.cumulativePayment : yearRow.payment)}
                  </td>
                  <td className="px-5 py-4 text-rose-400">
                    {currency(showCumulative ? yearRow.cumulativeInterest : yearRow.interest)}
                  </td>
                  <td className="px-5 py-4 text-emerald-400">
                    {currency(showCumulative ? yearRow.cumulativePrincipal : yearRow.principal)}
                  </td>
                  <td className="px-5 py-4 text-slate-100">{currency(yearRow.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}
