type Props = {
  title: string;
  currentLTV: number;
  targetLTV: number;
  topUpAmount: number;
  currentMonthlyOverpayment: number;
  requiredMonthlyOverpayment: number;
  currency: (value: number) => string;
  description: string;
};

export default function GoalStatusCard({
  title,
  currentLTV,
  targetLTV,
  topUpAmount,
  currentMonthlyOverpayment,
  requiredMonthlyOverpayment,
  currency,
  description,
}: Props) {
  const achieved = currentLTV <= targetLTV;
  const close = !achieved && currentLTV <= targetLTV + 1;

  const accentClass = achieved
    ? "text-emerald-300"
    : close
    ? "text-amber-300"
    : "text-rose-300";

  const panelClass = achieved
    ? "bg-emerald-950/40 border-emerald-600/30"
    : close
    ? "bg-amber-950/35 border-amber-600/25"
    : "bg-rose-950/30 border-rose-600/25";

  return (
    <div className={`rounded-3xl border p-5 ${panelClass}`}>
      <p className={`text-sm font-semibold mb-2 ${accentClass}`}>{title}</p>
      <p className="text-sm text-slate-200">{description}</p>
      <div className="mt-4 rounded-2xl bg-slate-900/90 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Target LTV</p>
          <p className={`text-lg font-semibold ${accentClass}`}>{targetLTV}%</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">
        {achieved
          ? `Goal reached. No additional top-up is needed to stay under ${targetLTV}%.`
          : close
          ? `Close to target — a small payment may be enough to get under ${targetLTV}%.`
          : `Goal still out of reach. Reducing the balance will improve your position.`}
      </p>
      <p className="mt-4 text-lg font-semibold text-white">
        Top-up to {targetLTV}%: {currency(topUpAmount)}
      </p>
      {requiredMonthlyOverpayment > 0 ? (
        <p className="mt-3 text-sm text-slate-300">
          {currentMonthlyOverpayment >= requiredMonthlyOverpayment ? (
            <>Your current monthly overpayment of {currency(currentMonthlyOverpayment)} is enough to meet this goal.</>
          ) : currentMonthlyOverpayment > 0 ? (
            <>Your current monthly overpayment is {currency(currentMonthlyOverpayment)}. To reach this goal, use a total monthly overpayment of {currency(requiredMonthlyOverpayment)} during the fixed term.</>
          ) : (
            <>If you make a monthly overpayment of {currency(requiredMonthlyOverpayment)} during the fixed term on top of your regular mortgage payment, this goal can be achieved.</>
          )}
        </p>
      ) : null}
    </div>
  );
}
