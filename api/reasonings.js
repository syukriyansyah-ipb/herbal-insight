const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export async function getPlantNames(plant) {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/plant-name?plant=${plant}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch plant names");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}

export async function getTaxonomy(plant) {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/plant-taxonomy?plant=${plant}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch taxonomy");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}

export async function getTradisionalUse(skip = 0, limit = 3) {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/traditional-use?skip=${skip}&limit=${limit}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tradisional use");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}

export async function getTradisionalUsePlant(skip = 0, limit = 1, plant) {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/traditional-use?skip=${skip}&limit=${limit}&plant=${plant}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tradisional use");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}

export async function getTopPlant() {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/traditional-use/top-plant`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tradisional use");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}

export async function getTopTraditionalUse() {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/traditional-use/top-traditional-use`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tradisional use");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}


export async function getScientific(plant) {
  try {
    const res = await fetch(`${API_URL}/reasonings/plant-name?scientific_name=${plant}`)
    if (!res.ok) {
      throw new Error("Failed to fetch Scientific plant names")
    }
    return res.json()
  } catch (error) {
    console.log("error server");
  }
}

export async function getCommon(plant, code) {
  try {
    const res = await fetch(`${API_URL}/reasonings/plant-name?common_name=${plant}&language_code=${code}`)
    if (!res.ok) {
      throw new Error("Failed to fetch common plant names")
    }
    return res.json()
  } catch (error) {
    console.log("error server");
  }
}

export async function getLocal(plant, ethnic) {
  try {
    const res = await fetch(`${API_URL}/reasonings/plant-name?local_name=${plant}&ethnic=${ethnic}`)
    if (!res.ok) {
      throw new Error("Failed to fetch local plant names")
    }
    return res.json()
  } catch (error) {
    console.log("error server");
  }
}

export async function getPharmacology(plant) {
  try {
    const res = await fetch(
      `${API_URL}/reasonings/pharmacology?plant=${plant}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch pharmacology");
    }
    return res.json();
  } catch (error) {
    console.log("error server");
  }
}



// import api from '../app/lib/axios';

// export async function getPlantNames(plant) {
//   try {
//     const response = await api.get(`/reasonings/plant-name?plant=${plant}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching plant names:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getTaxonomy(plant) {
//   try {
//     const response = await api.get(`/reasonings/plant-taxonomy?plant=${plant}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching taxonomy:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getTradisionalUse(skip = 0, limit = 1) {
//   try {
//     const response = await api.get(`/reasonings/traditional-use?skip=${skip}&limit=${limit}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching traditional use:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getTradisionalUsePlant(skip = 0, limit = 1, plant) {
//   try {
//     const response = await api.get(`/reasonings/traditional-use?skip=${skip}&limit=${limit}&plant=${plant}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching traditional use for plant:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getTopPlant() {
//   try {
//     const response = await api.get(`/reasonings/traditional-use/top-plant`);
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching top plant:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getTopTraditionalUse() {
//   try {
//     const response = await api.get(`/reasonings/traditional-use/top-traditional-use`);
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching top traditional use:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// // export async function getScientific(plant) {
// //   try {
// //     const response = await api.get(`${API_URL}/reasonings/plant-name?scientific_name=${plant}`, );
// //     return response.data; // Langsung kembalikan data dari respons
// //   } catch (error) {
// //     console.error("Error fetching scientific plant names:", error);
// //     throw error; // Lempar error agar bisa ditangani di tempat lain
// //   }
// // }

// export async function getCommon(plant, code) {
//   try {
//     const response = await api.get(`/reasonings/plant-name?common_name=${plant}&language_code=${code}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching common plant names:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getLocal(plant, ethnic) {
//   try {
//     const response = await api.get(`/reasonings/plant-name?local_name=${plant}&ethnic=${ethnic}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching local plant names:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }

// export async function getPharmacology(plant) {
//   try {
//     const response = await api.get(`/reasonings/pharmacology?plant=${plant}`, );
//     return response.data; // Langsung kembalikan data dari respons
//   } catch (error) {
//     console.error("Error fetching pharmacology:", error);
//     throw error; // Lempar error agar bisa ditangani di tempat lain
//   }
// }
