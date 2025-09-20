export default function BalanceCard({ summary }) {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <h3 className="text-sm text-slate-500">SALDO</h3>
      <div className="mt-2 text-3xl font-semibold">R$ {Number(summary.balance).toFixed(2)}</div>
      <div className="mt-4 flex gap-4">
        <div>
          <div className="text-xs text-slate-400">ENTRADAS</div>
          <div className="font-medium">R$ {Number(summary.totalIncome).toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400">SAÍDAS</div>
          <div className="font-medium">R$ {Number(summary.totalExpense).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
