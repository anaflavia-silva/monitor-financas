export default function TransactionList({ transactions = [], onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="font-semibold mb-3">Suas transações recentes</h4>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{t.description}</div>
              <div className="text-xs text-slate-400">{t.category} • {new Date(t.date).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {t.type === 'income' ? '+' : '-'} R$ {Number(t.amount).toFixed(2)}
              </div>
              <button className="text-sm text-slate-500" onClick={() => onDelete(t.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
