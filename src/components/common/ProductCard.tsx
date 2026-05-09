import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';
import { Product } from '../../types';
import { cn, formatPrice } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard = ({ product, priority }: ProductCardProps) => {
  const hasDiscount = product.offerPrice && product.offerPrice < product.basePrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.basePrice - (product.offerPrice || 0)) / product.basePrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imageUrls[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestSeller && (
            <span className="bg-black text-white text-[10px] font-black uppercase px-2 py-1 rounded-sm leading-none">Best Seller</span>
          )}
          {hasDiscount && (
            <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-sm leading-none">-{discountPercentage}% Off</span>
          )}
        </div>
        
        {/* Hover Action */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link 
            to={`/product/${product.id}`}
            className="bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            <ArrowRight className="h-5 w-5 text-black" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-black transition-colors">{product.title}</h3>
        </Link>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-sm font-medium">{formatPrice(product.basePrice)}</span>
                <span className="text-xl font-black text-black">{formatPrice(product.offerPrice!)}</span>
              </div>
            ) : (
              <span className="text-xl font-black text-black">{formatPrice(product.basePrice)}</span>
            )}
          </div>
          
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-50 border border-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded-full transition-all text-xs font-bold"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Buy Now</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
