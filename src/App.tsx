// src/App.tsx
import React from 'react'
import { CampaignList } from './CampaignList'

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white shadow">
        <h1 className="text-3xl font-bold text-center">FundVerse</h1>
      </header>
      <CampaignList />
    </div>
  )
}
