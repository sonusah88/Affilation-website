import { useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';
import { ProductGrid } from '../components/common/ProductGrid';
import { productService } from '../services/productService';
import { Product } from '../types';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Award } from 'lucide-react';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featured, trending] = await Promise.all([
          productService.getProducts({ featured: true, limit: 4 }),
          productService.getProducts({ trending: true, limit: 8 })
        ]);
        setFeaturedProducts(featured);
        setTrendingProducts(trending);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Hero />
      
      {/* Featured Section */}
      <section className="mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 flex items-center mb-2">
              <Zap className="h-3 w-3 mr-1 fill-orange-500" /> Exclusive Picks
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase">Featured</h2>
          </div>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Trust/Benefits Section */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}}>
              <div className="bg-gray-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Expertly Curated</h3>
              <p className="text-gray-500 text-sm">Every product is tested and vetted for quality, performance, and long-term value.</p>
            </motion.div>
            
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1}}>
              <div className="bg-gray-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Active Deals</h3>
              <p className="text-gray-500 text-sm">We find the best current prices and limited-time offers across multiple platforms.</p>
            </motion.div>
            
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.2}}>
              <div className="bg-gray-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">Honest Insights</h3>
              <p className="text-gray-500 text-sm">Clear pros and cons for every item, helping you make informed decisions effortlessly.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">People's Choice</span>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase">Trending Now</h2>
        </div>
        
        <ProductGrid products={trendingProducts} />
      </section>
      
      {/* Category Grid Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[500px]">
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Tech" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-4xl font-black text-white italic uppercase mb-2">High Performance</h3>
              <p className="text-white/70 mb-6 font-medium">Professional grade tech gear.</p>
              <button className="bg-white text-black w-fit px-6 py-2 rounded-full font-bold text-sm uppercase">Explore Tech</button>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-8">
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Laptop" />
               <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-2xl font-black text-white uppercase italic">Modern Workspace</h3>
                  <p className="text-white/80 text-sm mt-2 font-medium underline">Shop Collection</p>
               </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
               <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Work" />
               <div className="absolute inset-0 bg-orange-500/80 flex flex-col justify-center items-center p-6 text-center">
                  <h3 className="text-2xl font-black text-black uppercase italic">Lifestyle Gear</h3>
                  <p className="text-black/80 text-sm mt-2 font-black uppercase tracking-widest bg-white px-4 py-1">View All</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
