import { useEffect, useState } from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionList from '../components/TransactionList';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });

  const fetchData = async () => {
    try {
      const resT = await fetch(`${API}/api/transactions`);
      const dataT = await resT.json();
      setTransactions(dataT);
    } catch (err) { console.error('Erro ao buscar transações', err); setTransactions([]); }

    try {
      const resS = await fetch(`${API}/api/summary`);
      const dataS = await resS.json();
      setSummary(dataS);
    } catch (err) { console.error('Erro ao buscar resumo', err); setSummary({ totalIncome:0,totalExpense:0,balance:0}); }
  };

  useEffect(() => { fetchData(); }, []);

  const addTransaction = async (tx) => {
    await fetch(`${API}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    });
    await fetchData();
  };

  const deleteTransaction = async (id) => {
    await fetch(`${API}/api/transactions/${id}`, { method: 'DELETE' });
    await fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50 p-6">
      <Header />
      <main className="max-w-5xl mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard summary={summary} />
          <div className="md:col-span-2">
            <AddTransactionForm onAdd={addTransaction} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </div>
      </main>
    </div>
  );
}
