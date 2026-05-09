import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or just log it for now
      console.log('Search for:', searchQuery);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tighter uppercase">Affilio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-black transition-colors">Home</Link>
            <Link to="/category/tech" className="text-sm font-medium hover:text-black transition-colors">Tech</Link>
            <Link to="/category/lifestyle" className="text-sm font-medium hover:text-black transition-colors">Lifestyle</Link>
            <Link to="/category/home" className="text-sm font-medium hover:text-black transition-colors">Home</Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-100 border-none rounded-full px-4 py-1.5 text-sm w-48 focus:ring-1 focus:ring-black transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2 h-4 w-4 text-gray-400" />
            </form>
            
            {isAdmin && (
              <Link to="/admin" className="text-sm font-semibold text-black bg-gray-100 px-3 py-1 rounded-full hover:bg-black hover:text-white transition-all">
                Admin
              </Link>
            )}
            
            <Link to="/admin/login" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-5 w-5 text-gray-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Home</Link>
              <Link to="/category/tech" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Tech</Link>
              <Link to="/category/lifestyle" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Lifestyle</Link>
              <Link to="/category/home" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium">Home</Link>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 border-none rounded-xl px-4 py-3 text-base w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-3.5 h-5 w-5 text-gray-400" />
              </form>
              <Link to="/admin/login" className="block text-lg font-medium border-t pt-4">Admin Dashboard</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
