import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:8080/api' });

export const fetchCampaigns = (page = 1, limit = 10) =>
  API.get('/campaigns', { params: { page, limit } });

export const createCampaign = (data: {
  title: string; description: string; goal_amount: number;
}) => API.post('/campaigns', data);

export const updateCampaign = (id: number, data: {
  title: string; description: string; goal_amount: number;
}) => API.put(`/campaigns/${id}`, data);

export const pledgeCampaign = (id: number, amount: number) =>
  API.post(`/campaigns/${id}/pledge`, { amount });

export const translateText = (q: string, target: string) =>
  API.post('/ml/translate', { q, target });

export const fetchMyCampaigns     = (uid:number) => API.get(`/users/${uid}/campaigns`)
export const fetchPledgedCampaigns= (uid:number) => API.get(`/users/${uid}/pledges`)