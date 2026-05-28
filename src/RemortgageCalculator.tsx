import { useMemo, useState } from "react";
import CalculatorInputPanel from "./components/CalculatorInputPanel";
import OverviewCards from "./components/OverviewCards";
import SummaryPanel from "./components/SummaryPanel";
import RepaymentTable from "./components/RepaymentTable";

type ScheduleEntry = {
  period: number;
  year: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

export type StaticStats = {
  loanAmount: number;
  monthlyPayment: number;
  remainingBalance: number;
  futureLTV: number;
  futureEquity: number;
  principalPaid: number;
  totalInterestPaid: number;
  cashTopUpFor90: number;
  fixTermYears: number;
  termYears: number;
  currency: (value: number) => string;
};

export default function RemortgageCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<number>(450000);
  const [deposit, setDeposit] = useState<number>(22500);
  const [termYears, setTermYears] = useState<number>(38);
  const [interestRate, setInterestRate] = useState<number>(5.7);
  const [fixTermYears, setFixTermYears] = useState<number>(2);
  const [futureValuation, setFutureValuation] = useState<number>(442500);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState<number>(0);

  const currency = (value: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(value);

  const { stats, repaymentSchedule } = useMemo(() => {
    const loanAmount = Math.max(0, purchasePrice - deposit);
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = termYears * 12;
    const fixTermMonths = fixTermYears * 12;
    const monthlyPayment =
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    const paymentWithOverpayment = Math.max(0, monthlyPayment + monthlyOverpayment);

    const schedule: ScheduleEntry[] = [];
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    for (let month = 1; month <= fixTermMonths; month += 1) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      let principalPayment = paymentWithOverpayment - interestPayment;
      let monthlyPaymentAmount = paymentWithOverpayment;

      if (principalPayment >= remainingBalance) {
        monthlyPaymentAmount = remainingBalance + interestPayment;
        principalPayment = remainingBalance;
      }

      const nextBalance = Math.max(0, remainingBalance - principalPayment);

      schedule.push({
        period: month,
        year: Math.ceil(month / 12),
        payment: monthlyPaymentAmount,
        interest: interestPayment,
        principal: principalPayment,
        balance: nextBalance,
      });

      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;
      remainingBalance = nextBalance;

      if (remainingBalance <= 0) {
        break;
      }
    }

    const futureLTV = futureValuation > 0 ? (remainingBalance / futureValuation) * 100 : 0;
    const futureEquity = futureValuation - remainingBalance;
    const cashTopUpFor90 = Math.max(0, remainingBalance - futureValuation * 0.9);

    return {
      stats: {
        loanAmount,
        monthlyPayment,
        remainingBalance,
        futureLTV,
        futureEquity,
        principalPaid: totalPrincipalPaid,
        totalInterestPaid,
        cashTopUpFor90,
        fixTermYears,
        termYears,
        currency,
      },
      repaymentSchedule: schedule,
    };
  }, [purchasePrice, deposit, termYears, interestRate, fixTermYears, futureValuation, monthlyOverpayment]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[2.5rem] bg-slate-900/95 px-8 py-8 shadow-[0_40px_120px_-50px_rgba(14,42,78,0.45)] backdrop-blur-xl border border-slate-800">
          <p className="mb-3 uppercase tracking-[0.3em] text-xs text-cyan-300">UK mortgage planning</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Remortgage & LTV Strategy Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Enter your purchase details, fixed-rate term and future valuation to see your amortisation profile, projected equity and LTV position for your next UK remortgage.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
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
            <SummaryPanel stats={stats} futureValuation={futureValuation} />
            <RepaymentTable
              schedule={repaymentSchedule}
              monthlyPayment={stats.monthlyPayment}
              fixTermYears={fixTermYears}
              currency={currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
