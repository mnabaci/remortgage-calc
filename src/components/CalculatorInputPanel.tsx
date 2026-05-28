import type { Dispatch, SetStateAction } from "react";

type Props = {
  purchasePrice: number;
  deposit: number;
  termYears: number;
  interestRate: number;
  fixTermYears: number;
  futureValuation: number;
  monthlyOverpayment: number;
  setPurchasePrice: Dispatch<SetStateAction<number>>;
  setDeposit: Dispatch<SetStateAction<number>>;
  setTermYears: Dispatch<SetStateAction<number>>;
  setInterestRate: Dispatch<SetStateAction<number>>;
  setFixTermYears: Dispatch<SetStateAction<number>>;
  setFutureValuation: Dispatch<SetStateAction<number>>;
  setMonthlyOverpayment: Dispatch<SetStateAction<number>>;
};

export default function CalculatorInputPanel({
  purchasePrice,
  deposit,
  termYears,
  interestRate,
  fixTermYears,
  futureValuation,
  monthlyOverpayment,
  setPurchasePrice,
  setDeposit,
  setTermYears,
  setInterestRate,
  setFixTermYears,
  setFutureValuation,
  setMonthlyOverpayment,
}: Props) {
  return (
    <div className="lg:col-span-4 bg-slate-900/95 p-6 rounded-3xl shadow-[0_24px_80px_-40px_rgba(15,23,42,0.55)] border border-slate-800">
      <h2 className="text-xl font-semibold mb-8 border-b border-slate-800 pb-3 text-cyan-200">
        Mortgage inputs
      </h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Purchase price
          </label>
          <input
            type="number"
            min="0"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Deposit
          </label>
          <input
            type="number"
            min="0"
            value={deposit}
            onChange={(e) => setDeposit(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Term (years)
            </label>
            <input
              type="number"
              min="0"
              value={termYears}
              onChange={(e) => setTermYears(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Interest rate (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Fixed term (years)
          </label>
          <input
            type="number"
            min="0"
            value={fixTermYears}
            onChange={(e) => setFixTermYears(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Monthly overpayment (£)
          </label>
          <input
            type="number"
            min="0"
            value={monthlyOverpayment}
            onChange={(e) => setMonthlyOverpayment(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
          <p className="mt-3 text-xs text-slate-500">
            Optional extra monthly payment applied during the fixed term.
          </p>
        </div>
        <div className="pt-5 border-t border-slate-800">
          <p className="text-sm font-semibold text-slate-300 mb-3">
            Remortgage projection
          </p>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Future valuation (£)
          </label>
          <input
            type="number"
            min="0"
            value={futureValuation}
            onChange={(e) => setFutureValuation(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-2xl border border-cyan-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
          <p className="mt-3 text-xs text-slate-500">
            Use this value to estimate your LTV at remortgage based on future house price movement.
          </p>
        </div>
      </div>
    </div>
  );
}
