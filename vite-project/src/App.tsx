import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { useFavorites } from "./hooks/useFavorites";
import { Favorites } from "./pages/Favorites";
import { Categories } from "./components/Categories";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export function App() {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<any | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [ingredientResults, setIngredientResults] = useState<Meal[]>([]);

  async function handleSearch(query: string) {
    const ingredients = query
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    if (ingredients.length === 0) {
      setRecipes([]);
      setIngredientResults([]);
      return;
    }

    const results: Meal[][] = await Promise.all(
      ingredients.map((i) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`)
          .then((res) => res.json())
          .then((data) => data.meals || []),
      ),
    );

    const intersection = results.reduce<Meal[] | null>((acc, list) => {
      if (acc === null) return list;
      return acc.filter((meal) => list.some((m) => m.idMeal === meal.idMeal));
    }, null);

    setRecipes(intersection || []);
    setIngredientResults(intersection || []);
  }

  async function loadRecipeDetails(id: string) {
    console.log("Loading details for:", id);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await res.json();
    setSelectedMeal(data.meals[0]);
  }

  async function handleCategory(category: any) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await res.json();
    const categoryMeals: Meal[] = data.meals || [];
    if (ingredientResults.length === 0) {
      setRecipes(categoryMeals);
      return;
    }
    const intersection = ingredientResults.filter((meal) =>
      categoryMeals.some((c) => c.idMeal === meal.idMeal),
    );
    setRecipes(intersection);
  }

  return (
    <>
      <button
        className="categories-toggle"
        onClick={() => setShowCategories(!showCategories)}
      >
        Categories
      </button>

      <div className={`category-sidebar ${showCategories ? "open" : ""}`}>
        <Categories onSelect={handleCategory} />
      </div>
      <div className="layout">
        <div className="favorites-container">
          <button onClick={() => setShowFavorites(!showFavorites)}>
            Your Favorites
          </button>

          {showFavorites && (
            <Favorites
              onSelect={(meal) => loadRecipeDetails(meal.idMeal)}
              favorites={favorites}
            />
          )}
        </div>

        <div className="main-content">
          <SearchBar onSearch={handleSearch} className="search-bar" />

          {selectedMeal ? (
            <div>
              <button onClick={() => setSelectedMeal(null)}>Back</button>
              <button onClick={() => toggleFavorite(selectedMeal)}>
                {favorites.some((f) => f.idMeal === selectedMeal.idMeal)
                  ? "★ Remove from Favorites"
                  : "☆ Add to Favorites"}
              </button>

              <h2>{selectedMeal.strMeal}</h2>
              <img src={selectedMeal.strMealThumb} width={300} />
              <p>{selectedMeal.strInstructions}</p>
            </div>
          ) : (
            <div className="recipe-list">
              {recipes.map((meal) => (
                <div
                  key={meal.idMeal}
                  onClick={() => loadRecipeDetails(meal.idMeal)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={meal.strMealThumb} width={150} />
                  <p>{meal.strMeal}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// da se maha kato pochna da triq, readme, deploy
