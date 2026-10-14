
// export const fetcher = url => fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(r => r.json())

import api from '../app/lib/axios';
// export const fetcher = url => api.get(`${url}`).then(r => r.json())
export const fetcher = url => api.get(`${url}`).then(r => r.data)