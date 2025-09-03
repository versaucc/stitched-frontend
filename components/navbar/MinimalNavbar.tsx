'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageBuffer, { PageBufferHandle } from '../global/PageBuffer';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/navbar.css';
import '../../styles/cart.css'; // new stylesheet
import { supabase } from '../../lib/supabase';
import { products } from '../../data/product';
import toast from 'react-hot-toast';

type CartItem = {
  product_id: string;
  size: string;
  quantity: number;
};

export default function MinimalNavbar() {
  const bufferRef = useRef<PageBufferHandle>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const pathname = usePathname();

  const showCart =
    pathname === '/shop' ||
    pathname === '/lookbook' ||
    pathname.startsWith('/items/');

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    bufferRef.current?.showAndRedirect('/');
  };

  // Fetch user and cart from Supabase
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('cart')
          .eq('UID', user.id)
          .single();

        if (error) throw error;

        setCart(profile?.cart || {});
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        toast.error('Failed to load cart.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (key: string) => {
    if (!userId) return toast.error('Please log in to modify cart');

    const newCart = { ...cart };
    delete newCart[key];

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ cart: newCart })
        .eq('UID', userId);

      if (error) throw error;

      setCart(newCart);
      toast.success('Item removed from cart');
    } catch (err) {
      console.error('Failed to remove item:', err);
      toast.error('Failed to remove item');
    }
  };

  const subtotal = Object.values(cart).reduce((acc, item) => {
    const product = products.find((p) => p.id === item.product_id);
    if (!product) return acc;
    return acc + Number(product.price) * Number(item.quantity);
  }, 0);

  return (
    <>
      <nav className="fixed top-4 left-0 w-full z-50">
        <PageBuffer ref={bufferRef} />
        <div className="flex items-center justify-between px-6">
          <Link href="/" className="pointer-events-auto justify-center" onClick={handleHomeClick}>
            <img
              src="/logos/red-s-logo.png"
              alt="Stitched Home"
              className="h-20 w-auto"
            />
          </Link>

          {showCart && (
            <button
              onClick={() => setCartOpen(true)}
              className="fixed right-16 flex flex-col justify-between w-7 h-6 cursor-pointer"
            >
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
              <span className="h-0.5 w-full bg-white rounded"></span>
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="cart-drawer"
          >
            <div className="cart-header">
              <button onClick={() => setCartOpen(false)} className="cart-close">
                ×
              </button>
            </div>

            <div className="cart-contents">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              {loading && <p>Loading...</p>}
              {!loading && Object.keys(cart).length === 0 && <p>Feels empty in here...</p>}

              {!loading &&
                Object.entries(cart).map(([key, item]) => {
                  const product = products.find((p) => p.id === item.product_id);
                  if (!product) return null;

                  return (
                    <div
                      key={key}
                      className="cart-item flex items-center justify-between mb-4 group relative"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-16 w-16 object-cover rounded transition-all duration-300 group-hover:brightness-50"
                      />
                      <div className="flex-1 px-4">
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm">Size: {item.size}</p>
                      </div>
                      <p className="font-semibold">${product.price * item.quantity}</p>
                      <p className="ml-4 text-sm">Qty: {item.quantity}</p>

                      {/* Remove button */}
                      <button
                        className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold transition-opacity"
                        onClick={() => removeFromCart(key)}
                      >
                        −
                      </button>
                    </div>
                  );
                })}

              {Object.keys(cart).length > 0 && (
                <div className="cart-footer mt-6 flex flex-col items-center">
                  <p className="font-bold text-lg mb-4">Subtotal: ${subtotal}</p>
                  <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
