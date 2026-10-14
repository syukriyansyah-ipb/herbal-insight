const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
import api from '../app/lib/axios';

export async function insertPlantName(data) {
  try {
    const response = await api.post('/scientific-name', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error inserting plant name:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function updatePlantName(data) {
    try {
      const response = await api.put(`/scientific-name/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating plant name:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }

  export async function insertLocalName(data) {
    try {
      const response = await api.post('/local-name', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error inserting local name:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }

  export async function updateLocalName(data) {
    try {
      const response = await api.put(`/local-name/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating local name:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }

  export async function insertCommonName(data) {
    try {
      const response = await api.post('/common-name', data, {
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

  export async function updateCommonName(data) {
    try {
      const response = await api.put(`/common-name/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating common name:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }
  export async function updateTraditionalUse(data) {
    try {
      const response = await api.put(`/traditional-use/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating traditional use:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }

  export async function updateDisease(data) {
    try {
      const response = await api.put(`/disease/${data.id}?label_id=${data.label_id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Langsung kembalikan data dari respons
    } catch (error) {
      console.error("Error updating disease:", error);
      throw error; // Lempar error agar bisa ditangani di tempat lain
    }
  }
  

// //Scientific Names
// export async function insertPlantName(data) {
//     try {
//         const res = await fetch(
//             `/plant-name/scientific-name/node`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert plant name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updatePlantName(data) {
//     try {
//         const res = await fetch(
//             `/plant-name/scientific-name/node/${data.id}`,
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to update plant name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// //Local Names
// export async function insertLocalName(data) {
//     try {
//         const res = await fetch(
//             `/plant-name/local-name`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert local name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updateLocalName(data) {
//     try {
//         const res = await fetch(
//             `/plant-name/local-name/${data.id}`,
//             {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to update local name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }


// export async function insertCommonName(data) {
//     try {
//         const res = await fetch(
//             `//common-name/relationship/create`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert common name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function updateCommonName(data) {
//     try {
//         const res = await fetch(
//             `/common-name/${data.id}`,
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


// export async function updateTraditionalUse(data) {
//     try {
//         const res = await fetch(
//             `/traditional-use/{node_id}/${data.id}`,
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

// export async function updateDisease(data) {
//     try {
//         const res = await fetch(
//             `/disease/${data.id}?label_id=${data.label_id}`,
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

