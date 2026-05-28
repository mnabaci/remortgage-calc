export type ScheduleEntry = {
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

export type MortgageInput = {
  purchasePrice: number;
  deposit: number;
  termYears: number;
  interestRate: number;
  fixTermYears: number;
  futureValuation: number;
  monthlyOverpayment: number;
};

export type YearlySummary = {
  year: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
  cumulativePayment: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
};
