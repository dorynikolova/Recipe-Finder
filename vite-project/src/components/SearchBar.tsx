import { useState } from "react";

export function SearchBar({
  onSearch,
  className,
}: {
  onSearch: (query: string) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
