import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './style.css'
import { CampaignList } from './CampaignList'
import { MyCampaigns } from './MyCampaigns'
import { PledgedCampaigns } from './PledgedCampaigns'
import { App } from './App'  // if you have a main App wrapper

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link to="/">All</Link>
      <Link to="/mine">My Campaigns</Link>
      <Link to="/pledged">Pledged</Link>
    </nav>
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path="/mine" element={<MyCampaigns userId={1} />} />
      <Route path="/pledged" element={<PledgedCampaigns userId={1} />} />
    </Routes>
  </BrowserRouter>
)
