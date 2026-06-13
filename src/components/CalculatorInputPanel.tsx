import type { Dispatch, SetStateAction } from "react";
import InputField from "./ui/InputField";
import SectionCard from "./ui/SectionCard";

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
    <SectionCard title="Mortgage inputs" className="lg:col-span-4">
      <div className="space-y-4">
        <InputField
          label="Purchase price"
          value={purchasePrice}
          onChange={setPurchasePrice}
        />
        <InputField
          label="Deposit"
          value={deposit}
          onChange={setDeposit}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Term (years)"
            value={termYears}
            onChange={setTermYears}
            className=""
          />
          <InputField
            label="Interest rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            step={0.01}
          />
        </div>
        <InputField
          label="Fixed term (years)"
          value={fixTermYears}
          onChange={setFixTermYears}
        />
        <InputField
          label="Monthly overpayment (£)"
          value={monthlyOverpayment}
          onChange={setMonthlyOverpayment}
          helpText="Optional extra monthly payment applied during the fixed term."
        />
        <div className="pt-5 border-t border-slate-800">
          <p className="text-sm font-semibold text-slate-300 mb-3">Remortgage projection</p>
          <InputField
            label="Future valuation (£)"
            value={futureValuation}
            onChange={setFutureValuation}
            className=""
            helpText="Use this value to estimate your LTV at remortgage based on future house price movement."
          />
        </div>
      </div>
    </SectionCard>
  );
}
