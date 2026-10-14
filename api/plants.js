const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/plants`;
export async function searchPlants(keyword) {
  try {
    const res = await fetch(`${API_URL}/search?keyword=${keyword}`);
    if (!res.ok) {
      throw new Error("Failed to get plants with keyword");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function searchPlantsId(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to get plant with id");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function getPlants(limit = 20) {
  try {
    const res = await fetch(`${API_URL}/?limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to get plants");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function addPlant(payload) {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Failed to add new plant");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}

export async function deletePlant(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete plant");
    }
    return res.json();
  } catch (error) {
    console.log("error");
  }
}


// import api from '../app/lib/axios';

// export async function searchPlants(keyword) {
//   try {
//     const response = await api.get(`${API_URL}/search?keyword=${keyword}`,);
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error searching plants:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function searchPlantsId(id) {
//   try {
//     const response = await api.get(`${API_URL}/${id}`);
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching plant with id:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getPlants(limit = 20) {
//   try {
//     const response = await api.get(`${API_URL}/?limit=${limit}`);
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching plants:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function addPlant(payload) {
//   try {
//     const response = await api.post(`${API_URL}`, payload, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error adding plant:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function deletePlant(id) {
//   try {
//     const response = await api.delete(`${API_URL}/${id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error deleting plant:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

