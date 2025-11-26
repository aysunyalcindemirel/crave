import { X, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FavoritesDrawer({ isOpen, onClose, favorites, onRemove, onSelect }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--color-surface)] border-l border-[var(--color-border)] z-50 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-bg)]/50">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                Your Favorites
                                <span className="bg-[var(--color-primary)] text-white text-xs px-2 py-0.5 rounded-full">
                                    {favorites.length}
                                </span>
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-[var(--color-bg)] rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {favorites.length === 0 ? (
                                <div className="text-center text-[var(--color-text-muted)] mt-12">
                                    <p>No favorites yet.</p>
                                    <p className="text-sm mt-2">Start exploring to save some meals!</p>
                                </div>
                            ) : (
                                favorites.map(recipe => (
                                    <div
                                        key={recipe.id}
                                        className="bg-[var(--color-bg)] rounded-xl p-3 flex gap-4 group hover:ring-1 hover:ring-[var(--color-primary)] transition-all cursor-pointer"
                                        onClick={() => onSelect(recipe)}
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="font-semibold line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">{recipe.title}</h3>
                                                <p className="text-xs text-[var(--color-text-muted)]">{recipe.time} • {recipe.calories}</p>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onRemove(recipe.id);
                                                    }}
                                                    className="p-1.5 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                                    title="Remove from favorites"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
