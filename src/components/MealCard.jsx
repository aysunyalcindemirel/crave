import { Clock, Flame, ChefHat, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function MealCard({ recipe, onClose, isFavorite, onToggleFavorite }) {
    if (!recipe) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-md bg-[var(--color-surface)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] relative"
        >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={onToggleFavorite}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isFavorite
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-black/50 text-white hover:bg-black/70'
                        }`}
                >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={onClose}
                    className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="relative h-64 overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 mb-2">
                        {recipe.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{recipe.title}</h2>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
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

                <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {recipe.description}
                </p>

                <div className="space-y-3">
                    <h3 className="font-semibold text-white">Ingredients</h3>
                    <ul className="grid grid-cols-2 gap-2">
                        {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
