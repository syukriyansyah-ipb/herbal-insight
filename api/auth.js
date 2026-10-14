const API_URL = `${process.env.NEXT_PUBLIC_APIAUTH_URL}`;
import api from '../app/lib/axios';

export async function register(data) {
  try {
    const response = await api.post("/authenticate/register", data);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error in register API:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function login(data) {
  try {
    const response = await api.post("/authenticate/login", data);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error in login API:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function verifyToken(data) {
  try {
    const response = await api.post("/authenticate/verify", { token: data });
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error in verifyToken API:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function resendToken(data) {
  try {
    const response = await api.post("/authenticate/resend-verify-link", { email: data });
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error in resendToken API:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

// export async function register(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/authenticate/register`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             }
//         );

//         // Jika status tidak ok (misalnya 4xx atau 5xx), lemparkan error dengan response detail
//         if (!res.ok) {
//             // Ambil detail error dari response JSON jika ada
//             const errorData = await res.json();
//             throw new Error(errorData?.detail || "Failed to register, please try again.");
//         }

//         // Jika berhasil, return data dari server (misalnya response JSON)
//         return res.json();
//     } catch (error) {
//         // Menangani error secara lebih rinci dan melemparnya kembali
//         console.error("Error in register API:", error);
//         throw error;  // Lemparkan error untuk ditangani oleh pemanggil (misalnya handleActionRegister)
//     }
// }

// export async function login(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/authenticate/login`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             }
//         );

//         // Jika status tidak ok (misalnya 4xx atau 5xx), lemparkan error dengan response detail
//         if (!res.ok) {
//             // Ambil detail error dari response JSON jika ada
//             const errorData = await res.json();
//             console.log("errorrr: ", errorData)
//             throw new Error(errorData?.detail || "Failed to login, please try again.");
//         }

//         // Jika berhasil, return data dari server (misalnya response JSON)
//         return res.json();
//     } catch (error) {
//         // Menangani error secara lebih rinci dan melemparnya kembali
//         console.error("Error in login API:", error);
//         throw error;  // Lemparkan error untuk ditangani oleh pemanggil (misalnya handleActionRegister)
//     }
// }


// export async function verifyToken(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/authenticate/verify`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({token : data}),
//             }
//         );

//         // Jika status tidak ok (misalnya 4xx atau 5xx), lemparkan error dengan response detail
//         if (!res.ok) {
//             // Ambil detail error dari response JSON jika ada
//             const errorData = await res.json();
//             throw new Error(errorData?.detail || "Failed to register, please try again.");
//         }

//         // Jika berhasil, return data dari server (misalnya response JSON)
//         return res.json();
//     } catch (error) {
//         throw error;  // Lemparkan error untuk ditangani oleh pemanggil (misalnya handleActionRegister)
//     }
// }

// export async function resendToken(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/authenticate/resend-verify-link`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({email : data}),
//             }
//         );

//         // Jika status tidak ok (misalnya 4xx atau 5xx), lemparkan error dengan response detail
//         if (!res.ok) {
//             // Ambil detail error dari response JSON jika ada
//             const errorData = await res.json();
//             throw new Error(errorData?.detail || "Failed to register, please try again.");
//         }

//         // Jika berhasil, return data dari server (misalnya response JSON)
//         return res.json();
//     } catch (error) {
//         throw error;  // Lemparkan error untuk ditangani oleh pemanggil (misalnya handleActionRegister)
//     }
// }