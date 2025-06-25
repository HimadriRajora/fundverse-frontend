// src/CampaignList.tsx (and any other .tsx file with JSX)
import React, { useEffect, useState } from 'react';
import {
  fetchCampaigns,
  createCampaign,
  updateCampaign,
  pledgeCampaign,
} from './api';

type Campaign = {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  goal_amount: string;
  created_at: string;
};

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCampaigns(page).then((res) => setCampaigns(res.data));
  }, [page]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
      <ul className="space-y-4">
        {campaigns.map((c) => (
          <li
            key={c.id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>
            <p className="mt-2">
              Goal: <span className="font-medium">${c.goal_amount}</span>
            </p>
            <button
              className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                const amt = parseFloat(prompt('Pledge amount') || '0');
                if (amt > 0) pledgeCampaign(c.id, amt).then(() => {
                  alert('Pledged!');
                });
              }}
            >
              Pledge
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
