"use client"
import { dateFormat } from "@/helpers/currentTime";
import { useEffect } from "react";

export default function saveHistory({ plantName, img }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingHistory = JSON.parse(localStorage.getItem("history")) || [];
      const currentDate = dateFormat();
      const existingEntryIndex = existingHistory.findIndex((entry) => entry.date === currentDate);
      
      if (plantName !== undefined && img !== undefined) {
        if (existingEntryIndex !== -1) {
          const isPlantExist = existingHistory[existingEntryIndex].items.some((item) => item.plant === plantName);
          if (!isPlantExist) existingHistory[existingEntryIndex].items.push({ plant: plantName, url: img });
        } else {
          const newEntry = { date: currentDate, items: [{ plant: plantName, url: img }] };
          existingHistory.push(newEntry);
        }
        localStorage.setItem("history", JSON.stringify(existingHistory));
      }
    }
  }, [plantName, img]);
  
  return null;
}
