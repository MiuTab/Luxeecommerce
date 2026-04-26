import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { CreditCard, Lock, CheckCircle, ArrowLeft, Package } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutFlowProps {
  cartItems: any[];
  onBack: () => void;
}

type Step = 'shipping' | 'payment' | 'success';

export function CheckoutFlow({ cartItems, onBack }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl mb-4 tracking-tight">Checkout</h1>
          <div className="flex gap-4">
            <StepIndicator label="Shipping" isActive={currentStep === 'shipping'} isComplete={currentStep === 'payment' || currentStep === 'success'} />
            <StepIndicator label="Payment" isActive={currentStep === 'payment'} isComplete={currentStep === 'success'} />
            <StepIndicator label="Confirmation" isActive={currentStep === 'success'} isComplete={false} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-card rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl mb-6">Shipping Information</h2>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingData.name}
                          onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Address</label>
                        <input
                          type="text"
                          required
                          value={shippingData.address}
                          onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2">City</label>
                          <input
                            type="text"
                            required
                            value={shippingData.city}
                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block mb-2">ZIP Code</label>
                          <input
                            type="text"
                            required
                            value={shippingData.zipCode}
                            onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="10001"
                          />
                        </div>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-full mt-6 hover:shadow-xl transition-shadow"
                      >
                        Continue to Payment
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-card rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6" />
                      <h2 className="text-2xl">Payment Details</h2>
                    </div>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-2">Card Number</label>
                        <input
                          type="text"
                          required
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={paymentData.expiry}
                            onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={paymentData.name}
                          onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 p-4 rounded-lg">
                        <Lock className="w-4 h-4" />
                        <span>Your payment information is encrypted and secure</span>
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-full mt-6 hover:shadow-xl transition-shadow"
                      >
                        Complete Order - ${total.toFixed(2)}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}

              {currentStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-12 shadow-lg text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                    className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h2 className="text-3xl mb-4">Order Confirmed!</h2>
                  <p className="text-muted-foreground text-lg mb-2">
                    Thank you for your purchase, {shippingData.name}
                  </p>
                  <p className="text-muted-foreground mb-8">
                    A confirmation email has been sent to {shippingData.email}
                  </p>
                  <div className="bg-accent/50 rounded-xl p-6 mb-8">
                    <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                    <p className="text-2xl tracking-wider">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <motion.button
                    onClick={onBack}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-full hover:shadow-xl transition-shadow"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-32 bg-card rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-accent flex-shrink-0 flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm mb-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ label, isActive, isComplete }: { label: string; isActive: boolean; isComplete: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          backgroundColor: isComplete ? 'var(--primary)' : isActive ? 'var(--primary)' : 'var(--accent)',
        }}
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isComplete || isActive ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        {isComplete ? <CheckCircle className="w-5 h-5" /> : ''}
      </motion.div>
      <span className={`text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}
