import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (id: number, variant: string, quantity: number) => void;
  onCheckout: () => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <h2 className="text-2xl">Shopping Cart</h2>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <p className="text-muted-foreground mt-2">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-4"
                  >
                    <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                  </motion.div>
                  <h3 className="text-xl mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const variant = item.selectedSize || item.selectedColor || 'default';
                    return (
                      <motion.div
                        key={`${item.id}-${variant}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-accent flex-shrink-0">
                          <ImageWithFallback
                            src={item.image || item.images?.[0] || ''}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </p>
                          <p className="mb-3">${item.price}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => onUpdateQuantity(item.id, variant, item.quantity - 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <motion.button
                                onClick={() => onUpdateQuantity(item.id, variant, item.quantity + 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>

                            <motion.button
                              onClick={() => onUpdateQuantity(item.id, variant, 0)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  onClick={onCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full hover:shadow-xl transition-shadow"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
