import React, { useEffect, useState } from 'react'

function FurnitureList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchItems = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (query) params.append('q', query)
      if (category) params.append('category', category)
      const res = await fetch(`${baseUrl}/api/furniture?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load items')
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white w-64" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 rounded bg-slate-900/60 border border-slate-700 text-white">
            <option value="">All</option>
            <option>Chair</option>
            <option>Table</option>
            <option>Sofa</option>
            <option>Bed</option>
            <option>Storage</option>
            <option>Lighting</option>
          </select>
          <button onClick={fetchItems} className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">Filter</button>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id || item._id} className="bg-slate-800/50 border border-blue-500/20 rounded-xl overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-slate-900/60 flex items-center justify-center text-blue-200/70">No Image</div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  {item.is_featured && <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Featured</span>}
                </div>
                <p className="text-sm text-blue-200/80 mt-1 line-clamp-2">{item.description}</p>
                <div className="mt-3 flex items-center justify-between text-blue-200">
                  <span className="font-semibold">${item.price}</span>
                  <span className="text-xs bg-slate-900/60 px-2 py-1 rounded border border-slate-700">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FurnitureList
