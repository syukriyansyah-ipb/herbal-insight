import api from '../app/lib/axios'; // Pastikan api axios sudah dikonfigurasi di tempat lain
import axios from 'axios';
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export async function addPlant(data) {
    try {
        const response = await api.post(`${API_URL}/plants`, data); // Menggunakan axios POST request
        return response.data; // Mengembalikan data dari respons
    } catch (error) {
        console.error("Error inserting plant:", error); // Menangani error dengan logging
        throw error; // Lempar error untuk penanganan lebih lanjut
    }
}

export async function addPlantPart(data) {
    try {
        const response = await api.post(`${API_URL}/plant-part/plant-part`, data); // Menggunakan axios POST request
        return response.data; // Mengembalikan data dari respons
    } catch (error) {
        console.error("Error inserting plant part:", error); // Menangani error dengan logging
        throw error; // Lempar error untuk penanganan lebih lanjut
    }
}


export async function addTraditionalUse(data) {
    try {
      const response = await api.post('/traditional-use', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error inserting common name:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
}

export async function addMethodOfUse(data) {
    try {
        // Menyusun URL dengan query parameter
        const url = `${API_URL}/method-of-use?label=${encodeURIComponent(data.label)}`;

        // Melakukan request dengan query parameter
        const response = await axios.post(url);

        // Mengembalikan data dari respons
        return response.data;
    } catch (error) {
        console.error("Error inserting method of use:", error); // Menangani error dengan logging
        throw error; // Lempar error untuk penanganan lebih lanjut
    }
}

export async function addEthnic(data) {
    try {
        // Menyusun URL dengan query parameter
        const url = `${API_URL}/ethnic?label=${encodeURIComponent(data.label)}&province=${encodeURIComponent(data.province)}`;

        // Melakukan request dengan query parameter
        const response = await axios.post(url);

        // Mengembalikan data dari respons
        return response.data;
    } catch (error) {
        console.error("Error inserting method of use:", error); // Menangani error dengan logging
        throw error; // Lempar error untuk penanganan lebih lanjut
    }
}
// export async function addEthnic(data) {
//     try {
//         const response = await api.post(`${API_URL}/ethnic`, data); // Menggunakan axios POST request
//         return response.data; // Mengembalikan data dari respons
//     } catch (error) {
//         console.error("Error inserting ethnic:", error); // Menangani error dengan logging
//         throw error; // Lempar error untuk penanganan lebih lanjut
//     }
// }

export async function addLocation(data) {
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


// export async function addReference(data) {
//     try {
//         // Menyusun URL dengan query parameter
//         const url = `${API_URL}/reference`;

//         // Melakukan request dengan query parameter
//         const response = await axios.post(url, data);

//         // Mengembalikan data dari respons
//         return response.data;
//     } catch (error) {
//         console.error("Error inserting method of use:", error); // Menangani error dengan logging
//         throw error; // Lempar error untuk penanganan lebih lanjut
//     }
// }
export async function addReference(data) {
    try {
        const response = await api.post(`/reference`, data); // Menggunakan axios POST request
        return response.data; // Mengembalikan data dari respons
    } catch (error) {
        console.error("Error inserting reference:", error); // Menangani error dengan logging
        throw error; // Lempar error untuk penanganan lebih lanjut
    }
}
// export async function addLocation(data) {
//     try {
//         const response = await api.post(`${API_URL}/location`, data); // Menggunakan axios POST request
//         return response.data; // Mengembalikan data dari respons
//     } catch (error) {
//         console.error("Error inserting location:", error); // Menangani error dengan logging
//         throw error; // Lempar error untuk penanganan lebih lanjut
//     }
// }

// export async function addTraditionalUse(data) {
//     try {
//         const response = await api.post(`${API_URL}/traditional-use`, data); // Menggunakan axios POST request
//         return response.data; // Mengembalikan data dari respons
//     } catch (error) {
//         console.error("Error inserting traditional use:", error); // Menangani error dengan logging
//         throw error; // Lempar error untuk penanganan lebih lanjut
//     }
// }

// export async function addPlant(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/plants`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             },
            
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Plant");
//         }
//         return res.json();

//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function addPlantPart(data) {
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

// export async function addTraditionalUse(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/traditional-use`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Traditional Use");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function addMethodOfUse(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/method-of-use`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Method Of Use");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function addEthnic(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/ethnic`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert Ethnic");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function addLocation(data) {
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

// export async function addReference(data) {
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
