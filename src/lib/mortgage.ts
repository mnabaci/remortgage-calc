import type { MortgageInput, ScheduleEntry, StaticStats } from "../types/mortgage";

export function createUKCurrencyFormatter() {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
}

export function generateCurrencyFormatter() {
  const formatter = createUKCurrencyFormatter();
  return (value: number) => formatter.format(value);
}

export function calculateRequiredMonthlyOverpaymentForLTV(
  inputs: MortgageInput,
  targetLTV: number
): number {
  const getLTV = (overpayment: number) =>
    buildRepaymentSchedule({ ...inputs, monthlyOverpayment: overpayment }).stats.futureLTV;

  const initialLTV = getLTV(0);

  if (initialLTV <= targetLTV) {
    return 0;
  }

  let low = 0;
  let high = Math.max(1, inputs.monthlyOverpayment, (inputs.purchasePrice - inputs.deposit) / Math.max(1, inputs.fixTermYears * 12));

  while (getLTV(high) > targetLTV && high < 100000) {
    high *= 2;
  }

  for (let i = 0; i < 60; i += 1) {
    const mid = (low + high) / 2;
    const ltv = getLTV(mid);
    if (ltv > targetLTV) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.ceil(high);
}

export function buildRepaymentSchedule({
  purchasePrice,
  deposit,
  termYears,
  interestRate,
  fixTermYears,
  futureValuation,
  monthlyOverpayment,
}: MortgageInput): { stats: StaticStats; schedule: ScheduleEntry[] } {
  const loanAmount = Math.max(0, purchasePrice - deposit);
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;
  const fixTermMonths = fixTermYears * 12;

  const monthlyPayment =
    totalMonths > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
      : 0;

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
      currency: generateCurrencyFormatter(),
    },
    schedule,
  };
}
