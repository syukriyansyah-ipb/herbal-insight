import api from '../app/lib/axios'; // Pastikan api diimpor dari konfigurasi axios Anda

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ethnic`;

// Fungsi untuk mendapatkan data etnis dengan pagination
// export async function getEthnics({ skip = 0, limit = 10 } = {}) {
//   try {
//     const response = await api.get(`${API_URL}/?skip=${skip}&limit=${limit}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching ethnics:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani lebih lanjut
//   }
// }

// // Fungsi untuk mencari etnis berdasarkan keyword
// export async function searchEthnic(keyword) {
//   try {
//     const response = await api.get(`${API_URL}/search?keyword=${keyword}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error searching ethnic:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani lebih lanjut
//   }
// }

// // Fungsi untuk mendapatkan data etnis berdasarkan ID
// export async function searchEthnicId(id) {
//   try {
//     const response = await api.get(`${API_URL}/${id}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching ethnic by id:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani lebih lanjut
//   }
// }


export async function getEthnics({ skip = 0, limit = 10 } = {}) {
  try {
    const res = await fetch(`${API_URL}/?skip=${skip}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to get ethnics");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function searchEthnic(keyword) {
  try {
    const res = await fetch(`${API_URL}/search?keyword=${keyword}`);
    if (!res.ok) {
      throw new Error("Failed to get ethnic");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function searchEthnicId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to get ethnic by id");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}