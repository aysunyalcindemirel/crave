import { Clock, Flame, ChefHat, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MealCard({ recipe, onClose, isFavorite, onToggleFavorite }) {
    if (!recipe) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-md bg-card text-card-foreground rounded-2xl overflow-hidden shadow-2xl border relative"
        >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={onToggleFavorite}
                    className={`rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 border-none text-white ${isFavorite ? 'text-rose-500' : ''
                        }`}
                >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={onClose}
                    className="rounded-full backdrop-blur-md bg-black/40 hover:bg-black/60 border-none text-white"
                >
                    <X size={20} />
                </Button>
            </div>

            <div className="relative h-64 overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
                <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex gap-2 mb-3">
                        {recipe.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold leading-tight">{recipe.title}</h2>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                    <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Flame size={16} />
                        <span>{recipe.calories}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <ChefHat size={16} />
                        <span>{recipe.ingredients.length} ingredients</span>
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                    {recipe.description}
                </p>

                <div className="space-y-3">
                    <h3 className="font-semibold">Ingredients</h3>
                    <ul className="grid grid-cols-2 gap-2">
                        {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
