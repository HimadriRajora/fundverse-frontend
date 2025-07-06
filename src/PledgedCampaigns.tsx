import React, {useEffect,useState} from 'react'
import {fetchPledgedCampaigns} from './api'

type C = { id:number; title:string; description:string; goal_amount:string; created_at:string }

export function PledgedCampaigns({ userId }: {userId:number}) {
  const [items,set]=useState<C[]>([])
  useEffect(()=>{ fetchPledgedCampaigns(userId).then(r=>set(r.data)) },[userId])
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Pledged Campaigns</h2>
      <ul className="space-y-4">
        {items.map(c=>(
          <li key={c.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p>{c.description}</p>
            <p className="mt-2">Goal: ${c.goal_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}