import api from '../app/lib/axios'; // Pastikan api axios sudah dikonfigurasi di tempat lain
import axios from 'axios';
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

// Fungsi untuk menambahkan lokasi baru
export async function insertLocation(data) {
  try {
    // Menyusun URL dengan query parameter
    const url = `${API_URL}/location?lat=${encodeURIComponent(data.lat)}&long=${encodeURIComponent(data.long)}&provinsi=${encodeURIComponent(data.provinsi)}&kab_kota=${encodeURIComponent(data.kab_kota)}&kecamatan=${encodeURIComponent(data.kecamatan)}&kel_desa=${encodeURIComponent(data.kel_desa)}&user_id=${encodeURIComponent(data.user_id)}`;

    // Melakukan request dengan query parameter
    const response = await api.post(url);

    // Mengembalikan data dari respons
    return response.data;
  } catch (error) {
    console.error("Error inserting method of use:", error); // Menangani error dengan logging
    throw error; // Lempar error untuk penanganan lebih lanjut
  }
}

// Fungsi untuk memperbarui lokasi berdasarkan ID
export async function updateLocation(data) {
  try {
    const response = await api.put(
      `${API_URL}/location/${data.id}`, // Menggunakan axios untuk PUT request
      data
    );
    return response.data; // Kembalikan data dari respons
  } catch (error) {
    console.error("Error updating location:", error); // Menangani error dengan logging
    throw error; // Lempar error agar bisa ditangani lebih lanjut
  }
}

export async function deleteLocation(id) {
  try {
    const response = await api.delete(`${API_URL}/location/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
}


// export async function insertLocation(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/location/`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Location");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updateLocation(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/location/{location_id}/${data.id}`,
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to Update Location");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }