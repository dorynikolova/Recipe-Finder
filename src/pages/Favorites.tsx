export function Favorites({
  favorites,
  onSelect,
}: {
  favorites: any[];
  onSelect: (meal: any) => void;
}) {
  const validFavorites = favorites.filter((f) => f && f.idMeal);

  return (
    <div>
      <ul>
        {validFavorites.map((meal) => (
          <li
            key={meal.idMeal}
            onClick={() => onSelect(meal)}
            style={{ cursor: "pointer" }}
          >
            {meal.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}
