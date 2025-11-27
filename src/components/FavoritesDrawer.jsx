import { Trash2 } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FavoritesDrawer({ isOpen, onClose, favorites, onRemove, onSelect }) {
    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col gap-0">
                <SheetHeader className="p-6 border-b bg-muted/30">
                    <SheetTitle className="flex items-center gap-2">
                        Your Favorites
                        <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {favorites.length}
                        </Badge>
                    </SheetTitle>
                    <SheetDescription>
                        Manage your saved meal ideas.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {favorites.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-12 space-y-2">
                            <p>No favorites yet.</p>
                            <p className="text-sm">Start exploring to save some meals!</p>
                        </div>
                    ) : (
                        favorites.map(recipe => (
                            <div
                                key={recipe.id}
                                className="bg-card rounded-xl p-3 flex gap-4 border hover:border-primary/50 transition-all cursor-pointer group shadow-sm"
                                onClick={() => onSelect(recipe)}
                            >
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">{recipe.title}</h3>
                                        <p className="text-xs text-muted-foreground">{recipe.time} • {recipe.calories}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemove(recipe.id);
                                            }}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                            title="Remove from favorites"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
