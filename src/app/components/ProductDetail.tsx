import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Star, Heart, ShoppingCart, Check, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  productId: number;
  onAddToCart: (product: any) => void;
  onRelatedProductClick: (id: number) => void;
  onBackToShop: () => void;
}

const productCatalog = [
  { id: 1, name: 'Premium Wireless Headphones', price: 299, rating: 4.8, category: 'Audio', image: 'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 2, name: 'Luxury Smartwatch', price: 599, rating: 4.9, category: 'Watches', image: 'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 3, name: 'Minimalist Sneakers', price: 189, rating: 4.7, category: 'Footwear', image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 4, name: 'Modern Tech Backpack', price: 159, rating: 4.6, category: 'Accessories', image: 'https://images.unsplash.com/photo-1594299447935-e5b840f54b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 5, name: 'Wireless Earbuds Pro', price: 249, rating: 4.8, category: 'Audio', image: 'https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 6, name: 'Classic Leather Watch', price: 449, rating: 4.9, category: 'Watches', image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 7, name: 'Performance Running Shoes', price: 199, rating: 4.7, category: 'Footwear', image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 8, name: 'Premium Tech Bag', price: 189, rating: 4.8, category: 'Accessories', image: 'https://images.unsplash.com/photo-1667411424961-a942201b77ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

const productData: any = {
  1: {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299,
    rating: 4.8,
    reviews: 247,
    description: 'Experience unparalleled audio quality with our premium wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and exceptional comfort for all-day wear.',
    images: [
      'https://images.unsplash.com/photo-1765279327575-bc9e453514dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1763822085725-0b065668d7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1761005653657-0885604ddbcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    colors: ['Beige', 'Black', 'White'],
    features: ['Active Noise Cancellation', '40-Hour Battery', 'Premium Drivers', 'Comfortable Ear Cups'],
  },
  2: {
    id: 2,
    name: 'Luxury Smartwatch',
    price: 599,
    rating: 4.9,
    reviews: 412,
    description: 'A perfect blend of elegance and technology. Track your fitness, stay connected, and make a statement with this luxurious smartwatch.',
    images: [
      'https://images.unsplash.com/photo-1749831754129-3a84b9fdeb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1741288070480-914dfbc642e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    colors: ['Silver', 'Gold', 'Black'],
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Waterproof', 'Premium Materials'],
  },
};

const relatedProducts = [
  { id: 5, name: 'Wireless Earbuds Pro', price: 249, image: 'https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 6, name: 'Classic Leather Watch', price: 449, image: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
  { id: 7, name: 'Performance Running Shoes', price: 199, image: 'https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
];

export function ProductDetail({ productId, onAddToCart, onRelatedProductClick, onBackToShop }: ProductDetailProps) {
  const catalogProduct = productCatalog.find((item) => item.id === productId);
  const fallbackCatalogProduct = productCatalog[0];
  const product = productData[productId] || (catalogProduct
    ? {
        ...catalogProduct,
        reviews: Math.round(catalogProduct.rating * 80),
        description: `Discover refined ${catalogProduct.category.toLowerCase()} design with premium materials and performance built for everyday luxury.`,
        images: [catalogProduct.image, catalogProduct.image, catalogProduct.image],
        colors: ['Black', 'Sand', 'Ivory'],
        features: ['Premium Materials', 'Modern Design', 'Comfort-Focused Build', '2 Year Warranty'],
      }
    : {
        ...productData[1],
        image: fallbackCatalogProduct.image,
      });
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...product, selectedColor, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={onBackToShop}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="h-fit lg:sticky lg:top-32"
          >
            <div className="aspect-square mb-4 rounded-3xl overflow-hidden bg-accent">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-xl overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                  } transition-all`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl mb-4 tracking-tight">{product.name}</h1>
            <p className="text-3xl mb-6">${product.price}</p>
            <p className="text-muted-foreground text-lg mb-8">{product.description}</p>

            <div className="mb-6">
              <p className="mb-3">Color</p>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-6 py-3 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors"
                >
                  -
                </motion.button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-colors"
                >
                  +
                </motion.button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-full flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={() => setIsLiked(!isLiked)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full border-2 border-border hover:border-primary flex items-center justify-center transition-colors"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-accent">
                <Truck className="w-6 h-6 mb-2" />
                <p className="text-sm">Free Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-accent">
                <Shield className="w-6 h-6 mb-2" />
                <p className="text-sm">2 Year Warranty</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-accent">
                <RotateCcw className="w-6 h-6 mb-2" />
                <p className="text-sm">30 Day Returns</p>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => onRelatedProductClick(item.id)}
                className="cursor-pointer group"
              >
                <div className="aspect-square mb-4 rounded-2xl overflow-hidden bg-accent">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <h3 className="mb-2">{item.name}</h3>
                <p className="text-lg">${item.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
