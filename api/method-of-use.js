import api from '../app/lib/axios'; // Pastikan api diimpor dari konfigurasi axios Anda

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/method-of-use`;

// Fungsi untuk mendapatkan method of use dengan pagination
// export async function getMethodOfUse({ skip = 0, limit = 10 } = {}) {
//   try {
//     const response = await api.get(`${API_URL}/?skip=${skip}&limit=${limit}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching method of use:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// // Fungsi untuk mencari method of use berdasarkan keyword
// export async function searchMethodOfUse(keyword) {
//   try {
//     const response = await api.get(`${API_URL}/search?keyword=${keyword}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error searching method of use:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// // Fungsi untuk mendapatkan method of use berdasarkan ID
// export async function searchMethodOfUseId(id) {
//   try {
//     const response = await api.get(`${API_URL}/${id}`); // Menggunakan axios untuk GET request
//     return response.data; // Kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching method of use by id:", error); // Menangani error dengan logging
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }


export async function getMethodOfUse({ skip = 0, limit = 10 } = {}) {
  try {
    const res = await fetch(`${API_URL}/?skip=${skip}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to get method of use");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function searchMethodOfUse(keyword) {
  try {
    const res = await fetch(`${API_URL}/search?keyword=${keyword}`);
    if (!res.ok) {
      throw new Error("Failed to search method of use");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function searchMethodOfUseId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to get method of use by id");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}