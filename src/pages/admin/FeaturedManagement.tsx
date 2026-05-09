import { motion } from 'motion/react';
import { ImageIcon, Layout, Type } from 'lucide-react';

export const FeaturedManagement = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold italic uppercase tracking-tight flex items-center">
              <ImageIcon className="mr-2 h-5 w-5" /> Hero Banners
            </h3>
            <button className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase">Add Banner</button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-10 text-gray-400">
             <Layout className="h-12 w-12 mb-4 opacity-50" />
             <p className="font-bold text-center">Customize your homepage sliders and hero sections here.</p>
             <p className="text-[10px] uppercase font-black tracking-widest mt-2">Coming Soon</p>
          </div>
        </div>

        {/* Text/Content Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold italic uppercase tracking-tight flex items-center">
              <Type className="mr-2 h-5 w-5" /> Global Promos
            </h3>
            <button className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full uppercase">Manage</button>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl p-10 text-gray-400">
             <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
               <Layout className="h-12 w-12 mb-4 opacity-50 text-orange-500" />
             </motion.div>
             <p className="font-bold text-center">Manage site-wide promotional popups and notification bars.</p>
             <p className="text-[10px] uppercase font-black tracking-widest mt-2">Feature in Roadmap</p>
          </div>
        </div>
      </div>
    </div>
  );
};
