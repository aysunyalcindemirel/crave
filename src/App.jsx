
import { useState, useEffect } from 'react';
import { recipes } from './data/recipes';
import { Sparkles, ChefHat, Heart } from 'lucide-react';
import { MealCard } from './components/MealCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('crave_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('crave_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const suggestMeal = () => {
    setIsAnimating(true);
    // Simulate "thinking" time for effect
    setTimeout(() => {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setCurrentRecipe(randomRecipe);
      setIsAnimating(false);
    }, 600);
  };

  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const exists = prev.find(r => r.id === recipe.id);
      if (exists) {
        return prev.filter(r => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  const isCurrentFavorite = currentRecipe ? favorites.some(r => r.id === currentRecipe.id) : false;

  return (
    <div className="min-h-screen flex flex-col">
      <FavoritesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        favorites={favorites}
        onRemove={(id) => setFavorites(prev => prev.filter(r => r.id !== id))}
        onSelect={(recipe) => {
          setCurrentRecipe(recipe);
          setIsDrawerOpen(false);
        }}
      />

      {/* Header */}
      <header className="h-[80px] border-b border-[var(--color-border)] flex items-center justify-center sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentRecipe(null)}>
            <ChefHat className="text-[var(--color-primary)]" size={32} />
            <h1 className="text-2xl font-bold tracking-tight">Crave</h1>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors relative"
          >
            <Heart size={24} className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-bg)]" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12 flex flex-col items-center justify-center text-center relative">
        <AnimatePresence mode="wait">
          {!currentRecipe ? (
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
                  Don't know <br />
                  <span className="text-gradient">what to eat?</span>
                </h2>
                <p className="text-xl text-[var(--color-text-muted)]">
                  Discover delicious meals tailored to your taste.
                </p>
              </div>

              <button
                onClick={suggestMeal}
                disabled={isAnimating}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-lg font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Sparkles size={20} className={isAnimating ? "animate-spin" : ""} />
                <span>{isAnimating ? "Finding the perfect meal..." : "Suggest a Meal"}</span>
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-8">
              <MealCard
                recipe={currentRecipe}
                onClose={() => setCurrentRecipe(null)}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={() => toggleFavorite(currentRecipe)}
              />
              <button
                onClick={suggestMeal}
                className="text-[var(--color-text-muted)] hover:text-white transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} />
                Try another
              </button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[var(--color-text-muted)] text-sm">
        <p>&copy; {new Date().getFullYear()} Crave App. Bon Appétit.</p>
      </footer>
    </div>
  );
}

export default App;
