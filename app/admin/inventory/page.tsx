'use client';

/*  PAGE: Admin ▸ Inventory ▸ Add
    ------------------------------------------
    A tiny client-side form that posts to
    /api/square-inventory (the route we created
    earlier).  
    – “size” → variation name (e.g. 32x30)  
    – “delta” → positive **or** negative integer  
*/

import { useState } from 'react';

type FormState = { size: string; delta: string };

const INITIAL: FormState = { size: '', delta: '' };

export default function AddInventory() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  /* ---------- handlers ---------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/square-inventory', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          size : form.size.trim(),
          delta: Number(form.delta),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Unknown error');

      setMessage('✅ Inventory updated!');
      setForm(INITIAL);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected error';
      setMessage(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- ui ---------- */
  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Adjust “Jeans&nbsp;1” Inventory
      </h1>

      {message && (
        <p
          className={`mb-4 ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* SIZE ------------------------------------------------ */}
        <div>
          <label htmlFor="size" className="block mb-1 font-medium">
            Size&nbsp;(e.g.&nbsp;32x30)
          </label>
          <input
            id="size"
            name="size"
            type="text"
            required
            value={form.size}
            onChange={handleChange}
            className="w-full text-black border px-3 py-2 rounded"
          />
        </div>

        {/* DELTA ---------------------------------------------- */}
        <div>
          <label htmlFor="delta" className="block mb-1 font-medium">
            Quantity Change&nbsp;(+ / −)
          </label>
          <input
            id="delta"
            name="delta"
            type="number"
            step="1"
            required
            value={form.delta}
            onChange={handleChange}
            className="w-full text-black border px-3 py-2 rounded"
          />
        </div>

        {/* SUBMIT --------------------------------------------- */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2 rounded w-full"
        >
          {submitting ? 'Submitting…' : 'Update Inventory'}
        </button>
      </form>
    </div>
  );
}
