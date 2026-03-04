import { useEffect, useState } from "react";

type CategoriesProps = {
  onSelect: (category: string) => void;
};

type Category = {
  strCategory: string;
};

export const Categories = ({ onSelect }: CategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
      );
      const data = await res.json();
      setCategories(data.meals);
    }
    loadCategories();
  }, []);

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button key={cat.strCategory} onClick={() => onSelect(cat.strCategory)}>
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
};
