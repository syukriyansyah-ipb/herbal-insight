import api from '../app/lib/axios';
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function insertPlantPart(data) {
  try {
    const response = await api.post(`${API_URL}/plant-parts/plant-part`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error inserting plant part:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function updatePlantPart(nodeId, data) {
    try {
      const response = await api.put(
        `${API_URL}/plant-parts/${nodeId}/${data.id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating plant part:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }
  
// export async function insertPlantPart(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/plant-part/plant-part`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Plant Part");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updatePlantPart(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/plant-part/{node_id}/${data.id}`,
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to Update common name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }