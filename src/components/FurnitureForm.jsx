import React, { useState } from 'react'

const initialState = {
  name: '',
  description: '',
  category: 'Chair',
  material: '',
  dimensions: '',
  price: '',
  stock: 0,
  image_url: '',
  is_featured: false,
}

function FurnitureForm({ onCreated }) {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price || 0),
        stock: parseInt(form.stock || 0, 10),
      }

      const res = await fetch(`${baseUrl}/api/furniture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to create item')
      const data = await res.json()
      onCreated && onCreated({ id: data.id, ...payload })
      setForm(initialState)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200 mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white">
            <option>Chair</option>
            <option>Table</option>
            <option>Sofa</option>
            <option>Bed</option>
            <option>Storage</option>
            <option>Lighting</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Material</label>
          <input name="material" value={form.material} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Dimensions</label>
          <input name="dimensions" value={form.dimensions} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" placeholder="L × W × H" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Price ($)</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200 mb-1">Image URL</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white" />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input id="is_featured" name="is_featured" type="checkbox" checked={form.is_featured} onChange={handleChange} className="accent-blue-500" />
          <label htmlFor="is_featured" className="text-blue-200">Feature this item</label>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition">
        {loading ? 'Adding...' : 'Add Furniture'}
      </button>
    </form>
  )
}

export default FurnitureForm
