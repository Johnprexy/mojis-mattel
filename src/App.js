import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Heart, Search, User, MapPin, Phone, Mail, Instagram, Facebook, ChevronRight, Star, Check } from 'lucide-react';

// Mock data for products
const initialProducts = [
  {
    id: 1,
    name: "Rose Gold Tassel Elegance",
    category: "Tassel Earrings",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop"
    ],
    description: "Handcrafted rose gold tassel earrings with delicate fringe detail",
    featured: true
  },
  {
    id: 2,
    name: "Pearl Drop Classics",
    category: "Drop Earrings",
    price: 52.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop"
    ],
    description: "Elegant pearl drop earrings perfect for any occasion",
    featured: true
  },
  {
    id: 3,
    name: "Gold Statement Hoops",
    category: "Hoop Earrings",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&h=500&fit=crop"
    ],
    description: "Bold gold hoops that make a statement",
    featured: false
  },
  {
    id: 4,
    name: "African Beaded Beauty",
    category: "African-styled Earrings",
    price: 48.99,
    image: "https://images.unsplash.com/photo-1620122671578-81977c5f86cf?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620122671578-81977c5f86cf?w=500&h=500&fit=crop"
    ],
    description: "Vibrant African-inspired beaded earrings with intricate patterns",
    featured: true
  },
  {
    id: 5,
    name: "Champagne Tassel Dreams",
    category: "Tassel Earrings",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1630019329803-925608990e82?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1630019329803-925608990e82?w=500&h=500&fit=crop"
    ],
    description: "Soft champagne-colored tassels with gold accents",
    featured: false
  },
  {
    id: 6,
    name: "Diamond Drop Luxe",
    category: "Drop Earrings",
    price: 68.99,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&h=500&fit=crop"
    ],
    description: "Luxurious crystal drop earrings with diamond-like sparkle",
    featured: false
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    text: "Absolutely stunning pieces! The quality is exceptional and they arrived beautifully packaged.",
    rating: 5
  },
  {
    name: "Emma L.",
    text: "The jewelry-making class was incredible! I learned so much and made beautiful earrings.",
    rating: 5
  },
  {
    name: "Lisa K.",
    text: "My go-to place for unique, handmade jewelry. Every piece tells a story.",
    rating: 5
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const categories = ['All', 'Tassel Earrings', 'Drop Earrings', 'Hoop Earrings', 'African-styled Earrings'];

  const filteredProducts = initialProducts.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    let priceMatch = true;

    if (priceRange === 'under40') priceMatch = product.price < 40;
    if (priceRange === '40to60') priceMatch = product.price >= 40 && product.price <= 60;
    if (priceRange === 'over60') priceMatch = product.price > 60;

    return categoryMatch && searchMatch && priceMatch;
  });

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
    alert('Added to cart!');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Redirecting to Stripe Checkout... (In production, this would open Stripe payment page)');
    // In production: window.location.href = '/api/create-checkout-session';
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="text-2xl font-serif text-rose-400">
              Mojis Mattel
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-rose-400' : 'text-gray-700'} hover:text-rose-400 transition`}>Home</button>
            <button onClick={() => setCurrentPage('shop')} className={`${currentPage === 'shop' ? 'text-rose-400' : 'text-gray-700'} hover:text-rose-400 transition`}>Shop</button>
            <button onClick={() => setCurrentPage('training')} className={`${currentPage === 'training' ? 'text-rose-400' : 'text-gray-700'} hover:text-rose-400 transition`}>Training</button>
            <button onClick={() => setCurrentPage('contact')} className={`${currentPage === 'contact' ? 'text-rose-400' : 'text-gray-700'} hover:text-rose-400 transition`}>Contact</button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-rose-400 transition">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-rose-400 transition">
              <Heart size={20} />
            </button>
            <button onClick={() => setShowCart(!showCart)} className="text-gray-700 hover:text-rose-400 transition relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setIsAdmin(!isAdmin)} className="text-gray-700 hover:text-rose-400 transition">
              <User size={20} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Home</button>
            <button onClick={() => { setCurrentPage('shop'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Shop</button>
            <button onClick={() => { setCurrentPage('training'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Training</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Contact</button>
          </div>
        )}
      </div>

      {showCart && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-lg p-4 mr-4 max-h-96 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-center mb-3 pb-3 border-b">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-rose-400">€{item.price}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold text-rose-400">€{getTotalPrice()}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-500 transition">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );

  // Home Page
  const HomePage = () => (
    <div className="bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-rose-100 to-amber-50">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-gray-800 mb-6">Handcrafted Elegance</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">Discover unique jewelry pieces made with love in Amsterdam</p>
          <button onClick={() => setCurrentPage('shop')} className="bg-rose-400 text-white px-8 py-3 rounded-full text-lg hover:bg-rose-500 transition transform hover:scale-105">
            Shop Collection
          </button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-serif text-center mb-4">Featured Collections</h2>
        <p className="text-center text-gray-600 mb-12">Explore our most loved pieces</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialProducts.filter(p => p.featured).map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
              </div>
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-rose-400 font-semibold mt-2">€{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-rose-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Mojis Mattel was born from a passion for creating beautiful, handcrafted jewelry that tells a story. Based in the heart of Amsterdam, we combine traditional craftsmanship with contemporary design.
              </p>
              <p className="text-gray-700 mb-6">
                Each piece is carefully crafted by hand, ensuring that you receive not just jewelry, but a work of art that you'll treasure forever.
              </p>
              <button onClick={() => setCurrentPage('shop')} className="text-rose-400 font-semibold flex items-center hover:text-rose-500">
                Explore Our Collection <ChevronRight size={20} />
              </button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" alt="About" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-serif text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-rose-400 to-amber-400 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Join Our Newsletter</h2>
          <p className="text-white mb-8">Get exclusive updates on new collections and special offers</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button type="submit" className="bg-white text-rose-400 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif mb-8">Shop Our Collection</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
          >
            <option value="all">All Prices</option>
            <option value="under40">Under €40</option>
            <option value="40to60">€40 - €60</option>
            <option value="over60">Over €60</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="relative aspect-square overflow-hidden" onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{product.category}</p>
              <div className="flex justify-between items-center">
                <p className="text-rose-400 font-bold text-xl">€{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-500 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );

  // Product Detail Page
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setCurrentPage('shop')} className="text-rose-400 flex items-center mb-6 hover:text-rose-500">
          <ChevronRight size={20} className="rotate-180" /> Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {selectedProduct.images.map((img, idx) => (
                <img key={idx} src={img} alt={`${selectedProduct.name} ${idx + 1}`} className="rounded-lg cursor-pointer hover:opacity-75 transition" />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">{selectedProduct.category}</p>
            <h1 className="text-4xl font-serif mb-4">{selectedProduct.name}</h1>
            <p className="text-3xl text-rose-400 font-bold mb-6">€{selectedProduct.price}</p>
            <p className="text-gray-700 mb-8">{selectedProduct.description}</p>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <Check size={20} className="text-rose-400 mr-2" />
                  Handcrafted with premium materials
                </li>
                <li className="flex items-center text-gray-700">
                  <Check size={20} className="text-rose-400 mr-2" />
                  Hypoallergenic and nickel-free
                </li>
                <li className="flex items-center text-gray-700">
                  <Check size={20} className="text-rose-400 mr-2" />
                  Lightweight and comfortable
                </li>
                <li className="flex items-center text-gray-700">
                  <Check size={20} className="text-rose-400 mr-2" />
                  Comes in beautiful gift packaging
                </li>
              </ul>
            </div>

            <button
              onClick={() => addToCart(selectedProduct)}
              className="w-full bg-rose-400 text-white py-4 rounded-lg font-semibold text-lg hover:bg-rose-500 transition transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Training Page
  const TrainingPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">Jewelry-Making Training</h1>
        <p className="text-xl text-gray-600">Learn the art of handcrafted jewelry from our expert artisans</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <img src="https://images.unsplash.com/photo-1609619385002-f40fd8565d09?w=600&h=400&fit=crop" alt="Training" className="rounded-lg shadow-lg w-full" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <Check size={20} className="text-rose-400 mr-3 mt-1 flex-shrink-0" />
              <span>Basic and advanced jewelry-making techniques</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="text-rose-400 mr-3 mt-1 flex-shrink-0" />
              <span>Working with different materials and tools</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="text-rose-400 mr-3 mt-1 flex-shrink-0" />
              <span>Design principles and color theory</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="text-rose-400 mr-3 mt-1 flex-shrink-0" />
              <span>Create your own unique earrings to take home</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="text-rose-400 mr-3 mt-1 flex-shrink-0" />
              <span>Small group sessions for personalized attention</span>
            </li>
          </ul>
          <div className="bg-rose-50 p-6 rounded-lg">
            <p className="font-semibold mb-2">Class Duration: 3 hours</p>
            <p className="font-semibold mb-2">Price: €85 per person</p>
            <p className="text-gray-600">All materials included</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Book Your Training Session</h2>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Calendly Widget Integration</p>
            <p className="text-sm text-gray-500">
              In production, embed Calendly widget here:<br />
              https://calendly.com/mojismattel
            </p>
            <button className="mt-4 bg-rose-400 text-white px-6 py-3 rounded-lg hover:bg-rose-500 transition">
              Open Booking Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-center mb-12">Get In Touch</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <MapPin size={24} className="text-rose-400 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-600">Pieterbegweg<br />Amsterdam 1105BM<br />Netherlands</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone size={24} className="text-rose-400 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600">+31 616 385 457</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={24} className="text-rose-400 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">info@mojismattel.com</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/mojismattel" target="_blank" rel="noopener noreferrer" className="bg-rose-400 text-white p-3 rounded-full hover:bg-rose-500 transition">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com/mojismattel" target="_blank" rel="noopener noreferrer" className="bg-rose-400 text-white p-3 rounded-full hover:bg-rose-500 transition">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg h-64">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin size={48} className="mx-auto mb-2 text-rose-400" />
                <p>Google Maps Embed</p>
                <p className="text-sm">Pieterbegweg, Amsterdam</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-rose-400 text-white py-3 rounded-lg font-semibold hover:bg-rose-500 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => {
    const [newProduct, setNewProduct] = useState({
      name: '',
      category: 'Tassel Earrings',
      price: '',
      description: '',
      image: ''
    });

    const handleAddProduct = (e) => {
      e.preventDefault();
      alert('Product added successfully! (In production, this would save to MongoDB)');
      setNewProduct({ name: '', category: 'Tassel Earrings', price: '', description: '', image: '' });
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif">Admin Dashboard</h1>
          <button onClick={() => setIsAdmin(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Exit Admin
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                >
                  <option>Tassel Earrings</option>
                  <option>Drop Earrings</option>
                  <option>Hoop Earrings</option>
                  <option>African-styled Earrings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> In production, this would support multiple image uploads to Cloudinary/Firebase Storage with drag-and-drop functionality.
                </p>
              </div>

              <button type="submit" className="w-full bg-rose-400 text-white py-3 rounded-lg font-semibold hover:bg-rose-500 transition">
                Add Product
              </button>
            </form>
          </div>

          {/* Product Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Manage Products</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {initialProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-rose-400 font-semibold">€{product.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Management */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">#ORD001</td>
                  <td className="py-3 px-4">Jane Doe</td>
                  <td className="py-3 px-4">Rose Gold Tassel Elegance</td>
                  <td className="py-3 px-4">€45.99</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Completed</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 hover:text-blue-700">View</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">#ORD002</td>
                  <td className="py-3 px-4">John Smith</td>
                  <td className="py-3 px-4">Pearl Drop Classics</td>
                  <td className="py-3 px-4">€52.99</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Processing</span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 hover:text-blue-700">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">Mojis Mattel</h3>
            <p className="text-gray-400">Handcrafted jewelry made with love in Amsterdam</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-white">Home</button></li>
              <li><button onClick={() => setCurrentPage('shop')} className="text-gray-400 hover:text-white">Shop</button></li>
              <li><button onClick={() => setCurrentPage('training')} className="text-gray-400 hover:text-white">Training</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Collections</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Tassel Earrings</li>
              <li className="text-gray-400">Drop Earrings</li>
              <li className="text-gray-400">Hoop Earrings</li>
              <li className="text-gray-400">African-styled Earrings</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Pieterbegweg</li>
              <li>Amsterdam 1105BM</li>
              <li>Netherlands</li>
              <li>+31 616 385 457</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Mojis Mattel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <>
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'shop' && <ShopPage />}
            {currentPage === 'product' && <ProductDetailPage />}
            {currentPage === 'training' && <TrainingPage />}
            {currentPage === 'contact' && <ContactPage />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;