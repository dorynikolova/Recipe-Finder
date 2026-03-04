import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  function toggleFavorite(meal: any) {
    let updated;
    if (favorites.some((f) => f.idMeal === meal.idMeal)) {
      updated = favorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
  return { favorites, toggleFavorite };
}
