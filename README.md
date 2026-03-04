# Recipe-Finder

My Recipe Finder for when I don't know what to cook.
A simple and intuitive web application for discovering meals based on ingredients, categories, and favorites. Built with React + TypeScript, the app uses the public TheMealDB API to fetch real recipes, images, and instructions.

- Live Demo: https://celebrated-banoffee-38820f.netlify.app/

## Features

### Ingredient Search

Search for meals by typing one or more ingredients:

- chicken
- potatoes, tomatoes
- rice, beef, onion
  The app fetches meals for each ingredient and returns only the meals that contain all of them (intersection filtering).

### Category Filtering

Open the slide‑out sidebar and filter meals by category:

- Beef
- Chicken
- Pasta
- Seafood
- Vegan
- Dessert
  …and more.
  Category filtering intersects with ingredient filtering.

### Favorites

Save meals you like and access them anytime from the Favorites panel.

### Clean UI

- Centered search bar
- Centered recipe results
- Favorites on the left
- Categories slide‑out on the right
- Responsive layout

## Tech Stack

- React (Vite)
- TypeScript
- CSS
- TheMealDB API

## Getting Started

- Clone the repository
- Install dependencies with 'npm install'
- Run the server with 'npm run dev'
- App will be available at 'http://localhost:5173'
- Or run 'npm run build' for production

## Future Improvements

- Real‑time Search Suggestions - Enhance the search bar to update results as the user types, without requiring them to submit the full ingredient name.
- Smarter empty‑state handling - When the input becomes empty, the app should instantly clear results instead of waiting for the user to press Enter.
