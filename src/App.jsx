import { useState, useEffect } from 'react';
import { recipes } from './data/recipes';
import { Sparkles, ChefHat, Heart } from 'lucide-react';
import { MealCard } from './components/MealCard';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Button } from "@/components/ui/button";
import { AnimatePresence } from 'framer-motion';

import confetti from 'canvas-confetti';

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

      // Trigger confetti when adding to favorites
      console.log('Confetti triggered');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'], // Rose colors to match theme
        zIndex: 9999
      });

      return [...prev, recipe];
    });
  };

  const isCurrentFavorite = currentRecipe ? favorites.some(r => r.id === currentRecipe.id) : false;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
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
      <header className="h-20 border-b flex items-center justify-center sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between px-6">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setCurrentRecipe(null)}>
            <ChefHat className="text-primary" size={32} />
            <h1 className="text-2xl font-bold tracking-tight">Crave</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDrawerOpen(true)}
            className="relative rounded-full hover:bg-secondary"
          >
            <Heart size={24} className="text-muted-foreground hover:text-primary transition-colors" />
            {favorites.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12 flex flex-col items-center justify-center text-center relative px-6">
        <AnimatePresence mode="wait">
          {!currentRecipe ? (
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                  Don't know <br />
                  <span className="bg-gradient-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent">what to eat?</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Discover delicious meals tailored to your taste.
                </p>
              </div>

              <Button
                size="lg"
                onClick={suggestMeal}
                disabled={isAnimating}
                className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300"
              >
                <Sparkles size={20} className={`mr-2 ${isAnimating ? "animate-spin" : ""}`} />
                {isAnimating ? "Finding the perfect meal..." : "Suggest a Meal"}
              </Button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-8">
              <MealCard
                recipe={currentRecipe}
                onClose={() => setCurrentRecipe(null)}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={() => toggleFavorite(currentRecipe)}
              />
              <Button
                variant="ghost"
                onClick={suggestMeal}
                className="text-muted-foreground hover:text-foreground"
              >
                <Sparkles size={16} className="mr-2" />
                Try another
              </Button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Crave App. Bon Appétit.</p>
      </footer>
    </div>
  );
}

export default App;
