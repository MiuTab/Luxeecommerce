import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, ShoppingBag, Settings, LogOut, LogIn, UserPlus, Package } from 'lucide-react';
import { useState } from 'react';

interface UserMenuProps {
  onNavigate?: (page: string) => void;
}

export function UserMenu({ onNavigate }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  const menuItems = isLoggedIn
    ? [
        { icon: User, label: 'My Profile', action: () => console.log('Profile') },
        { icon: Package, label: 'My Orders', action: () => console.log('Orders') },
        { icon: Heart, label: 'Wishlist', action: () => console.log('Wishlist') },
        { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
        { icon: LogOut, label: 'Sign Out', action: handleLogout, danger: true },
      ]
    : [
        { icon: LogIn, label: 'Sign In', action: handleLogin },
        { icon: UserPlus, label: 'Create Account', action: () => console.log('Sign up') },
      ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 hover:bg-accent rounded-full transition-colors ${isOpen ? 'bg-accent' : ''}`}
      >
        <User className="w-5 h-5" />
        {isLoggedIn && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full ring-2 ring-background"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-full mt-2 w-64 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden z-40"
            >
              {isLoggedIn && (
                <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate">John Doe</h4>
                      <p className="text-sm text-muted-foreground truncate">john@example.com</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="py-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        item.action();
                        if (!item.danger && item.label !== 'Sign Out') {
                          setIsOpen(false);
                        }
                      }}
                      whileHover={{ x: 4 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left ${
                        item.danger ? 'text-destructive hover:bg-destructive/10' : ''
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {!isLoggedIn && (
                <div className="p-4 border-t border-border bg-accent/50">
                  <p className="text-xs text-muted-foreground text-center">
                    Sign in to access exclusive features and track your orders
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
