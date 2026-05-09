import { motion } from 'motion/react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden bg-black flex items-center">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 border border-white/20">
              Curated Selection 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase italic">
              Tech for the <br />
              <span className="text-white/40">Modern Hive.</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-md font-light leading-relaxed">
              Discover high-performance gear and lifestyle essentials handpicked by experts for maximum efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/category/tech" className="group bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-white/90 transition-all">
                Shop Gadgets
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/admin/login" className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-all text-center">
                Admin Panel
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};
