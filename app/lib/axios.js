// lib/axios.js
import axios from "axios";
import { getSession } from "next-auth/react";

// Membuat instance axios
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // URL API diambil dari .env
// });

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL API diambil dari .env
  headers: {
    'Content-Type': 'application/json',
  },
});
// Interceptor untuk menambahkan Authorization header dengan token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();  // Mendapatkan session dari NextAuth

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`; // Tambahkan token ke header
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;