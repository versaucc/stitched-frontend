"use client";

import { useState, useEffect } from "react";

export default function InventoryEditPage() {
    type InventoryForm = {
      [key: string]: string | number | null; // ✅ this enables dynamic key access
      id: null;
      name: string;
      SKU: string;
      quantity: number;
      status: string;
      price: string;
      cost: string;
      category: string;
      brand: string;
      wash: string;
      size: string;
      description: string;
      image_url: string;
      square_item_id: string;
      patches: string;
    };

const [form, setForm] = useState<InventoryForm>({
  id: null,
  name: '',
  SKU: '',
  quantity: 0,
  status: '',
  price: '',
  cost: '',
  category: '',
  brand: '',
  wash: '',
  size: '',
  description: '',
  image_url: '',
  square_item_id: '',
  patches: '',
});

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Optional: preload data here if editing existing item (based on URL param or selection)
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');




    try {
      const method = editingId ? "PATCH" : "POST";
      const url = "/api/square-inventory";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cost: parseFloat(form.cost),
          price: parseFloat(form.price),
          quantity: form.quantity,
          patches: JSON.parse(form.patches || "{}"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setMessage(editingId ? "✅ Inventory updated" : "✅ Inventory created");

      if (!editingId) {
        setForm({
          id: null,
          name: "",
          SKU: "",
          quantity: 0,
          status: "",
          price: "",
          cost: "",
          category: "",
          brand: "",
          wash: "",
          size: "",
          description: "",
          image_url: "",
          square_item_id: "",
          patches: "{}",
        });
      }
    } catch (err) {
        if (err instanceof Error) {
          setMessage(`❌ ${err.message}`);
      } else {
          setMessage('❌ Unknown error occurred');
      }
}
 finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Inventory" : "Add Inventory"}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(form).map((key) => (
          key !== "id" && (
            <div key={key} className="col-span-1">
              <label className="block text-sm text-white font-medium mb-1" htmlFor={key}>
                {key}
              </label>
              <input
                id={key}
                name={key}
                type={key === "quantity" || key === "cost" || key === "price" ? "number" : "text"}
                value={form[key] ?? ''}
                onChange={handleChange}
                className="w-full text-black border p-2 rounded"
              />
            </div>
          )
        ))}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-black py-2 px-4 rounded hover:bg-gray-800"
          >
            {submitting ? (editingId ? "Updating..." : "Submitting...") : (editingId ? "Update Inventory" : "Submit Inventory")}
          </button>
        </div>
        {message && <p className="col-span-2 text-center mt-2">{message}</p>}
      </form>
    </div>
  );
}
