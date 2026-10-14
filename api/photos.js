const GBIF_API = `${process.env.NEXT_PUBLIC_GBIF_API}`;
import api from '../app/lib/axios'; // Pastikan api diimpor dari konfigurasi axios Anda

// export async function searchPhotos({ query }) {
//   try {
//     const response = await api.get(`${GBIF_API}/occurrence/search?scientificName=${query}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching photos:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani lebih lanjut
//   }
// }

export async function searchPhotos({ query }) {
  try {
    const res = await fetch(
      `${GBIF_API}/occurrence/search?scientificName=${query}`
    );
    if (!res.ok) {
      throw new Error("Failed to get photos");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}
