const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
import api from '../app/lib/axios';
export async function getUser(data) {
    try {
      const response = await api.get('/traditional-use/relationship/path-all', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: data, // Kirimkan data sebagai query parameters
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }

// export async function getUser(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/traditional-use/relationship/path-all`,
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData?.detail || "Failed to register, please try again.");
//         }
//         return res.json();
//     } catch (error) {
//         console.log(error);
//     }
//   }