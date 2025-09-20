import { useState } from 'react';

export default function AddTransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Geral');

  const submit = (e) => {
    e.preventDefault();
    if (!description || !amount) return alert('Preencha descricao e valor');
    onAdd({ description, amount: Number(amount), type, category });
    setDescription(''); setAmount('');
  };

  return (
    <form onSubmit={submit} className="mb-4 p-4 bg-white rounded-xl shadow">
      <div className="flex gap-3">
        <input className="flex-1 p-2 border rounded" placeholder="Descricao" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="w-32 p-2 border rounded" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} />
        <select className="p-2 border rounded" value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Despesa</option>
          <option value="income">Entrada</option>
        </select>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Adicionar</button>
      </div>
    </form>
  );
}
