'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

/* ------------------------------------------------------------------ */
/* 1 ▸  Types                                                         */
/* ------------------------------------------------------------------ */
interface FormState {
  size: string;          // Jeans size label
  quantity: number | ''; // empty string = “unset” (for <input type="number">)
}

type ApiResponse =
  | { ok: true }
  | { error: string };

/* ------------------------------------------------------------------ */
/* 2 ▸  Constants                                                     */
/* ------------------------------------------------------------------ */
const SIZE_OPTIONS = [
  '24', '25', '26', '27', '28',
  '29', '30', '31', '32', '33',
  '34', '36', '38', '40',
];

/* ------------------------------------------------------------------ */
/* 3 ▸  Component                                                     */
/* ------------------------------------------------------------------ */
export default function AddInventoryPage() {
  const [form, setForm] = useState<FormState>({ size: '', quantity: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ------------------------ */
  /* Handlers                 */
  /* ------------------------ */
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'quantity'
          ? value === '' ? '' : Number(value)          // keep number | ''
          : value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          size: form.size,
          quantity: form.quantity,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) throw new Error((data as any).error ?? res.statusText);

      setMessage('✅ Inventory updated');
      setForm({ size: '', quantity: '' }); // reset
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unknown error';
      setMessage(`❌ ${msg}`);
    } finally {
      setSubmitting(false);
    }
  }

  /* ------------------------ */
  /* Render                   */
  /* ------------------------ */
  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Add / Update Jeans 1 Inventory
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-neutral-900/20 p-6 rounded-lg"
      >
        {/* Size ------------- */}
        <label className="block">
          <span className="text-sm">Size</span>
          <select
            name="size"
            value={form.size}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 text-black border rounded"
          >
            <option value="" disabled>
              -- choose size --
            </option>
            {SIZE_OPTIONS.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </label>

        {/* Quantity ---------- */}
        <label className="block">
          <span className="text-sm">Quantity</span>
          <input
            name="quantity"
            type="number"
            min={0}
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 text-black border rounded"
          />
        </label>

        {/* Submit ------------ */}
        <button
          disabled={submitting}
          className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting…' : 'Save'}
        </button>

        {message && (
          <p
            className={`text-center text-sm ${
              message.startsWith('✅') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
