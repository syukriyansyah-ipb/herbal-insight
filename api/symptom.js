const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/symptom`;
import api from '../app/lib/axios'; // Pastikan api diimpor dari konfigurasi axios Anda

export async function getSymptoms() {
  try {
    const response = await api.get(`${API_URL}`); // Menggunakan axios untuk GET request
    return response.data; // Kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching symptoms:", error); // Menangani error dengan logging
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

// export async function getSymptoms() {
//   try {
//     const res = await fetch(`${API_URL}`);
//     if (!res.ok) {
//       throw new Error("Failed to get symptoms");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("error");
//   }
// }
