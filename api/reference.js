import api from '../app/lib/axios'; // Pastikan api axios sudah dikonfigurasi di tempat lain
import axios from 'axios';
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function insertReference(data) {
  try {
    const response = await api.post(`/reference`, data); // Menggunakan axios POST request
    return response.data; // Mengembalikan data dari respons
} catch (error) {
    console.error("Error inserting reference:", error); // Menangani error dengan logging
    throw error; // Lempar error untuk penanganan lebih lanjut
}
}

export async function updateReference(data) {
    try {
      const response = await api.put(`/reference/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating reference:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }


// export async function insertReference(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/reference/`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Reference");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updateReference(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/location/{node_id}/${data.id}`,
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