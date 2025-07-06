import React, { useEffect, useState } from 'react';
import {
  fetchCampaigns,
  pledgeCampaign,
  translateText,
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
  // store translations by campaign id
  const [translations, setTranslations] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchCampaigns(page).then((res) => setCampaigns(res.data));
  }, [page]);

  const onTranslate = async (id: number, text: string) => {
    try {
      const res = await translateText(text, 'fr'); // hard-coded to French
      setTranslations((t) => ({ ...t, [id]: res.data.translatedText }));
    } catch {
      setTranslations((t) => ({ ...t, [id]: 'Translation error' }));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Campaigns</h2>
      <ul className="space-y-4">
        {campaigns.map((c) => (
          <li key={c.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>
            {/* translation result */}
            {translations[c.id] && (
              <p className="mt-2 italic text-blue-600">
                {translations[c.id]}
              </p>
            )}
            <p className="mt-2">
              Goal: <span className="font-medium">${c.goal_amount}</span>
            </p>
            <div className="mt-3 space-x-2">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  const amt = parseFloat(
                    prompt('Pledge amount') || '0'
                  );
                  if (amt > 0) {
                    pledgeCampaign(c.id, amt).then(() =>
                      alert('Pledged!')
                    );
                  }
                }}
              >
                Pledge
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => onTranslate(c.id, c.description)}
              >
                Translate
              </button>
            </div>
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
