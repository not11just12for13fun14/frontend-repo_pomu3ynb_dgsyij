import React, { useState } from 'react'
import Header from './components/Header'
import FurnitureForm from './components/FurnitureForm'
import FurnitureList from './components/FurnitureList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 md:p-10">
        <Header />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FurnitureForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </div>
          <div className="lg:col-span-2">
            <FurnitureList key={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
