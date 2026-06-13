import { useMemo, useState } from "react";
import CalculatorInputPanel from "./components/CalculatorInputPanel";
import OverviewCards from "./components/OverviewCards";
import SummaryPanel from "./components/SummaryPanel";
import RepaymentTable from "./components/RepaymentTable";
import { buildRepaymentSchedule } from "./lib/mortgage";
import type { MortgageInput } from "./types/mortgage";

export default function RemortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(450000);
  const [deposit, setDeposit] = useState<number>(22500);
  const [termYears, setTermYears] = useState<number>(38);
  const [interestRate, setInterestRate] = useState<number>(5.7);
  const [fixTermYears, setFixTermYears] = useState<number>(2);
  const [futureValuation, setFutureValuation] = useState<number>(442500);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState<number>(0);

  const inputs: MortgageInput = useMemo(
    () => ({
      purchasePrice,
      deposit,
      termYears,
      interestRate,
      fixTermYears,
      futureValuation,
      monthlyOverpayment,
    }),
    [
      deposit,
      fixTermYears,
      futureValuation,
      interestRate,
      monthlyOverpayment,
      purchasePrice,
      termYears,
    ],
  );

  const { stats, schedule: repaymentSchedule } = useMemo(
    () => buildRepaymentSchedule(inputs),
    [inputs],
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-8 text-slate-100 print:bg-white print:text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2.5rem] bg-slate-900/95 px-8 py-8 shadow-[0_40px_120px_-50px_rgba(14,42,78,0.45)] backdrop-blur-xl border border-slate-800 print:bg-white print:text-slate-900 print:shadow-none print:border-slate-200 print:px-4 print:py-6">
          <p className="mb-3 uppercase tracking-[0.3em] text-xs text-cyan-300 print:text-slate-700">
            UK mortgage planning
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl print:text-slate-900">
            Remortgage & LTV Strategy Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 print:text-slate-700">
            Enter your purchase details, fixed-rate term and future valuation to
            see your amortisation profile, projected equity and LTV position for
            your next UK remortgage.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center rounded-full border border-cyan-500 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
            >
              Print calculation
            </button>
            <p className="max-w-2xl text-sm text-slate-400">
              Print a clean version of your current mortgage inputs, projected
              LTV and repayment schedule.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <CalculatorInputPanel
            purchasePrice={purchasePrice}
            deposit={deposit}
            termYears={termYears}
            interestRate={interestRate}
            fixTermYears={fixTermYears}
            futureValuation={futureValuation}
            monthlyOverpayment={monthlyOverpayment}
            setPurchasePrice={setPurchasePrice}
            setDeposit={setDeposit}
            setTermYears={setTermYears}
            setInterestRate={setInterestRate}
            setFixTermYears={setFixTermYears}
            setFutureValuation={setFutureValuation}
            setMonthlyOverpayment={setMonthlyOverpayment}
          />

          <div className="lg:col-span-8 space-y-6">
            <OverviewCards stats={stats} purchasePrice={purchasePrice} />
            <SummaryPanel
              stats={stats}
              futureValuation={futureValuation}
              monthlyOverpayment={monthlyOverpayment}
              purchasePrice={purchasePrice}
              deposit={deposit}
              termYears={termYears}
              interestRate={interestRate}
              fixTermYears={fixTermYears}
            />
            <RepaymentTable
              schedule={repaymentSchedule}
              monthlyPayment={stats.monthlyPayment}
              currency={stats.currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
