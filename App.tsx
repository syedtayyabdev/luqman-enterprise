import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import { Product, CartItem, Category } from './types';

// Components (Inline for simplicity given file constraints, but organized logically)
const Navbar = ({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery 
}: { 
  cartCount: number; 
  onOpenCart: () => void; 
  searchQuery: string; 
  setSearchQuery: (q: string) => void;
}) => (
  <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
           <i className="fa-solid fa-microchip text-brand-400 text-2xl"></i>
           <span className="font-orbitron font-bold text-xl sm:text-2xl tracking-wider text-white">
             LUQMAN <span className="text-brand-400">ENT.</span>
           </span>
        </div>
        
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-search text-gray-400 group-focus-within:text-brand-400 transition-colors"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-dark-card text-gray-300 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all"
              placeholder="Search laptops, headphones..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={onOpenCart}
             className="relative p-2 text-gray-300 hover:text-brand-400 transition-colors"
           >
             <i className="fa-solid fa-cart-shopping text-xl"></i>
             {cartCount > 0 && (
               <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-brand-400 rounded-full animate-bounce">
                 {cartCount}
               </span>
             )}
           </button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden pb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-dark-card text-gray-300 placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-sm"
            placeholder="Search products..."
          />
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
        alt="Background" 
        className="w-full h-full object-cover opacity-30 scale-110 animate-pulse-glow"
      />
    </div>
    <div className="relative z-20 text-center px-4">
      <h1 className="font-orbitron text-5xl md:text-7xl lg:text-9xl font-black mb-4 tracking-tight">
        <span className="block text-white mb-2" style={{textShadow: '0 0 30px rgba(45, 212, 191, 0.3)'}}>LUQMAN</span>
        <span className="text-gradient">ENTERPRISE</span>
      </h1>
      <p className="text-xl md:text-3xl text-gray-300 font-light tracking-widest uppercase border-t border-b border-brand-500/30 py-4 inline-block backdrop-blur-sm">
        Best Tech Prices in Pakistan
      </p>
      <div className="mt-10">
        <a href="#products" className="inline-block px-8 py-3 border border-brand-400 text-brand-400 hover:bg-brand-400 hover:text-black font-orbitron font-bold tracking-wider transition-all duration-300 transform hover:scale-105 rounded-none">
          SHOP NOW
        </a>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, onAdd, onClick }: { product: Product, onAdd: (e: React.MouseEvent, p: Product) => void, onClick: (p: Product) => void }) => (
  <div 
    className="group relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(45,212,191,0.1)] flex flex-col h-full cursor-pointer"
    onClick={() => onClick(product)}
  >
    <div className="relative h-48 sm:h-60 overflow-hidden">
      <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-transparent transition-colors z-10"></div>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-2 right-2 z-20">
         <span className="bg-black/70 backdrop-blur text-xs font-bold px-2 py-1 rounded text-white border border-white/10">
           {product.category}
         </span>
      </div>
    </div>
    
    <div className="p-5 flex flex-col flex-grow relative z-20 bg-dark-card">
      <h3 className="font-orbitron font-bold text-lg text-white mb-1 truncate group-hover:text-brand-400 transition-colors">
        {product.name}
      </h3>
      <p className="text-gray-400 text-xs mb-3 font-mono border-b border-white/10 pb-2">
        {product.specs}
      </p>
      
      <div className="mt-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          ${product.price}
        </div>
        <button 
          onClick={(e) => onAdd(e, product)}
          className="bg-white/5 hover:bg-brand-500 hover:text-black text-brand-400 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
);

const ProductModal = ({ product, isOpen, onClose, onAdd }: { product: Product | null, isOpen: boolean, onClose: () => void, onAdd: (p: Product) => void }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-brand-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-[float_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-500/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md"
        >
          <i className="fa-solid fa-times"></i>
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-white/5">
           <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
           />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-gradient-to-br from-dark-card to-black">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase mb-2 block">{product.category}</span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-6">
             <span className="text-3xl font-light text-white">${product.price}</span>
             <span className="bg-brand-500/20 text-brand-300 text-xs px-2 py-1 rounded border border-brand-500/20">In Stock</span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6 font-light">
            {product.description}
          </p>

          <div className="bg-white/5 rounded-xl p-4 mb-8 border border-white/5">
            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Key Specs</h4>
            <div className="text-gray-400 font-mono text-sm">
               <i className="fa-solid fa-microchip mr-2 text-brand-500"></i> {product.specs}
            </div>
          </div>

          <button 
            onClick={() => { onAdd(product); onClose(); }}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-orbitron font-bold tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-cart-plus"></i>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onRemove: (id: number) => void;
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const whatsappNumber = "923439070892";
  
  const handleWhatsAppOrder = () => {
    let message = `*NEW ORDER - LUQMAN ENTERPRISE*\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price} x ${item.quantity}\n`;
    });
    message += `\n*TOTAL: $${total}*\n\nPlease confirm my order.`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      ></div>
      <div 
        className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-dark-card border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
          <h2 className="font-orbitron text-xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-shopping-bag text-brand-400"></i> YOUR CART
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
              <i className="fa-solid fa-cart-arrow-down text-6xl mb-4 text-gray-700"></i>
              <p className="font-orbitron">Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5 animate-[float_0.3s_ease-out]">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-black" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-brand-400 text-sm font-mono">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400 font-orbitron">Total Amount</span>
            <span className="text-2xl font-bold text-white">${total}</span>
          </div>
          <button 
            onClick={handleWhatsAppOrder}
            disabled={items.length === 0}
            className={`w-full py-4 rounded-xl font-bold font-orbitron flex items-center justify-center gap-2 transition-all ${items.length === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-[#25D366]/30'}`}
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            ORDER ON WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('luqman-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem('luqman-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback could be added here
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCardAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: Category[] = ['All', 'Gaming', 'MacBook', 'Headphones', 'Budget'];

  return (
    <div className="min-h-screen bg-dark-bg text-white font-rajdhani overflow-x-hidden selection:bg-brand-500 selection:text-black">
      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <Hero />
      
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white border-l-4 border-brand-500 pl-4">
            FEATURED <span className="text-gray-500">PRODUCTS</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  selectedCategory === cat 
                    ? 'bg-brand-500 text-black border-brand-500 shadow-[0_0_15px_rgba(45,212,191,0.4)]' 
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-brand-500 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
           <div className="text-center py-20 opacity-50">
             <i className="fa-solid fa-ghost text-4xl mb-4"></i>
             <p className="text-xl">No products found.</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={handleCardAdd}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-dark-card border-t border-white/5 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-4">LUQMAN ENTERPRISE</h3>
          <p className="text-gray-500 mb-8">Premium Technology. Unbeatable Prices.</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-500 hover:text-black flex items-center justify-center transition-all">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-500 hover:text-black flex items-center justify-center transition-all">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-500 hover:text-black flex items-center justify-center transition-all">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
          <p className="text-gray-600 text-sm">© 2024 Luqman Enterprise. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/923439070892`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 animate-bounce"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAdd={addToCart}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />
    </div>
  );
}