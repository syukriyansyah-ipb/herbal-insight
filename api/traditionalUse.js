const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
import api from '../app/lib/axios';

export async function insertPlant(data) {
  try {
    const response = await api.post('/plants', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error inserting plant:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function insertPlantPart(data) {
  try {
    const response = await api.post('/plant-part/plant-part', data, {
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

export async function getPlant(limit = 1000) {
  try {
    const response = await api.get(`/plants/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getPlantPart(limit = 1000) {
  try {
    const response = await api.get(`/plant-parts?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching plant part:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getTradisionalUse(limit = 1000) {
  try {
    const response = await api.get(`/traditional-use/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching traditional use:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getMethodOfUse(limit = 1000) {
  try {
    const response = await api.get(`/method-of-use/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching method of use:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getEthnic(limit = 1000) {
  try {
    const response = await api.get(`/ethnic/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching ethnic:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getLocation(limit = 1000) {
  try {
    const response = await api.get(`/location/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getReference(limit = 1000) {
  try {
    const response = await api.get(`/reference/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching references:", error);
    return { data: [] }; // Mengembalikan nilai default jika terjadi error
  }
}

export async function getUser(limit = 1000) {
  try {
    const response = await api.get(`/user/?limit=${limit}`);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

// export async function insertTraditionalUse(data) {
//   try {
//     // Menyusun URL dengan query parameter
//     const url = `${API_URL}/traditional-use?label=${encodeURIComponent(data.label)}`;

//     // Melakukan request dengan query parameter
//     const response = await api.post(url);

//     // Mengembalikan data dari respons
//     console.log('data hasil: ', response.data);
//     return response.data;
// } catch (error) {
//     console.error("Error inserting method of use:", error); // Menangani error dengan logging
//     throw error; // Lempar error untuk penanganan lebih lanjut
// }
// }
  export async function insertTraditionalUse(data) {
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

export async function insertTraditionalUsePathAll(data) {
  try {
    const response = await api.post("/traditional-use/relationship/path-all", data);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error inserting traditional use:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function updateTraditionalUsePathAll(data) {
  try {
    const response = await api.put(`${API_URL}/traditional-use/relationship/path-all`, data);
    return response.data; // Langsung kembalikan data dari respons
  } catch (error) {
    console.error("Error inserting traditional use:", error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

// export async function insertPlant(data) {
//     try {
//         const res = await fetch(
//             `${API_URL}/plants`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data), 
//             }
//         );
//         if (!res.ok) {
//             throw new Error("Failed to insert plant");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

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
//             throw new Error("Failed to insert plant Part");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function getPlant(limit = 1000) {
//     try {
//       const res = await fetch(`${API_URL}/plants/?limit=${limit}`);
//       if (!res.ok) {
//         throw new Error("Failed to get plants");
//       }
//       return res.json();
//     } catch (error) {
//       console.log("error");
//     }
//   }
 
  // export async function getPlantPart(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/plant-part?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get plant Part");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }

  // export async function getTradisionalUse(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/traditional-use/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get Tradisional Use");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }

  // export async function getMethodOfUse(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/method-of-use/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get Method Of Use");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }

  // export async function getEthnic(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/ethnic/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get Ethnic");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }

  // export async function getLocation(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/location/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get Location");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }

  // export async function getReference(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/reference/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get Reference");
  //     }
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching references:", error);
  //     return { data: [] };
  //   }
  // }

  // export async function getUser(limit = 1000) {
  //   try {
  //     const res = await fetch(`${API_URL}/user/?limit=${limit}`);
  //     if (!res.ok) {
  //       throw new Error("Failed to get User");
  //     }
  //     return res.json();
  //   } catch (error) {
  //     console.log("error");
  //   }
  // }
  
//   export async function insertTraditionalUse(data) {
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
//             throw new Error("Failed to insert local name");
//         }
//         return res.json();
//     } catch (error) {
//         console.log("error server");
//     }
// }

// export async function insertTraditionalUsePathAll(data) {
//   try {
//       const res = await fetch(
//           `${API_URL}/traditional-use/relationship/path-all`,
//           {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify(data), 
//           }
//       );
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData?.detail || "Failed to register, please try again.");
//       }
//       return res.json();
//   } catch (error) {
//       console.log(error);
//   }
// }

