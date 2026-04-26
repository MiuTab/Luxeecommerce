import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CategoryHighlights } from './components/CategoryHighlights';
import { PromoBanner } from './components/PromoBanner';
import { ShopPage } from './components/ShopPage';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { CheckoutFlow } from './components/CheckoutFlow';
import { CollectionsPage } from './components/CollectionsPage';
import { AboutPage } from './components/AboutPage';
import { ScrollStory } from './components/ScrollStory';

type Page = 'home' | 'shop' | 'product' | 'checkout' | 'collections' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const variant = product.selectedSize || product.selectedColor || 'default';
      const existing = prev.find(item => {
        const itemVariant = item.selectedSize || item.selectedColor || 'default';
        return item.id === product.id && itemVariant === variant;
      });
      if (existing) {
        return prev.map(item => {
          const itemVariant = item.selectedSize || item.selectedColor || 'default';
          return item.id === product.id && itemVariant === variant
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: number, variant: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => {
        const itemVariant = item.selectedSize || item.selectedColor || 'default';
        return !(item.id === id && itemVariant === variant);
      }));
    } else {
      setCartItems(prev =>
        prev.map(item => {
          const itemVariant = item.selectedSize || item.selectedColor || 'default';
          return item.id === id && itemVariant === variant ? { ...item, quantity } : item;
        })
      );
    }
  };

  const navigateTo = (page: Page, productId?: number) => {
    setCurrentPage(page);
    if (productId !== undefined) setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onNavigate={navigateTo}
        onProductClick={(id) => navigateTo('product', id)}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <>
          <Hero onShopClick={() => navigateTo('shop')} />
          <ScrollStory />
          <FeaturedProducts onProductClick={(id) => navigateTo('product', id)} onAddToCart={addToCart} />
          <CategoryHighlights onCategoryClick={() => navigateTo('shop')} />
          <PromoBanner />
        </>
      )}

      {currentPage === 'shop' && (
        <ShopPage onProductClick={(id) => navigateTo('product', id)} onAddToCart={addToCart} />
      )}

      {currentPage === 'product' && selectedProductId !== null && (
        <ProductDetail
          productId={selectedProductId}
          onAddToCart={addToCart}
          onRelatedProductClick={(id) => navigateTo('product', id)}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutFlow
          cartItems={cartItems}
          onBack={() => navigateTo('home')}
        />
      )}

      {currentPage === 'collections' && (
        <CollectionsPage onProductClick={(id) => navigateTo('product', id)} onAddToCart={addToCart} />
      )}

      {currentPage === 'about' && (
        <AboutPage />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          navigateTo('checkout');
        }}
      />
    </div>
  );
}
