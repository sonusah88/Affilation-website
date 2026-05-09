import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Info,
  PlayCircle,
  Truck,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const data = await productService.getProductById(id);
        setProduct(data);
        // Track the visit
        if (data) {
          productService.trackClick(id);
        }
      }
      setLoading(false);
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 italic uppercase">Product not found</h2>
        <Link to="/" className="text-orange-500 font-bold hover:underline">Return Home</Link>
      </div>
    );
  }

  const hasDiscount = product.offerPrice && product.offerPrice < product.basePrice;

  return (
    <div className="bg-[#F9F9F9] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/" className="flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Gallery Section */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.imageUrls[activeImage] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000'}
                  alt={product.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-8"
                />
              </AnimatePresence>
              
              {product.videoUrls && product.videoUrls.length > 0 && (
                <div className="absolute bottom-6 right-6">
                  <button className="bg-black/80 backdrop-blur-md text-white p-3 rounded-full flex items-center space-x-2 text-xs font-bold hover:bg-black transition-all">
                    <PlayCircle className="h-4 w-4" />
                    <span>Watch Video</span>
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.imageUrls.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
                  <span className="text-sm font-bold">{product.rating}</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 leading-[0.95]">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-4 mb-8">
                {hasDiscount ? (
                  <>
                    <span className="text-4xl font-black text-black">{formatPrice(product.offerPrice!)}</span>
                    <span className="text-xl text-gray-400 line-through font-medium">{formatPrice(product.basePrice)}</span>
                  </>
                ) : (
                  <span className="text-4xl font-black text-black">{formatPrice(product.basePrice)}</span>
                )}
              </div>

              <div className="p-6 bg-white rounded-3xl border border-gray-100 mb-10 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Quick Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center space-x-3 bg-black text-white px-8 py-5 rounded-full font-bold hover:bg-black/90 transition-all text-lg shadow-lg shadow-black/10"
                >
                  <span>Check Current Price</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              {/* Trust Section */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-5 w-5 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="h-5 w-5 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Secure Check</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="h-5 w-5 text-gray-400 mb-2" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Official Retailer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <section className="mt-24 space-y-24">
          {/* Why this product? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src={product.imageUrls[1] || product.imageUrls[0]} 
                className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover" 
                alt="Product feature"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 block mb-4">Deep Dive</span>
              <h2 className="text-4xl font-black italic uppercase mb-8">Why this product?</h2>
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="leading-loose italic font-medium text-black">
                  "{product.whyThisProduct || "A standout choice that balances performance, aesthetics, and long-term reliability in its class."}"
                </p>
                <div className="mt-10 space-y-6">
                  {product.comparisonInfo?.pros.map((pro, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="mt-1 bg-green-50 p-1 rounded-full"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>
                      <p className="font-medium">{pro}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison/Verdict */}
          {product.comparisonInfo && (
            <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-gray-100">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-black italic uppercase">The Verdict</h2>
                  <p className="text-gray-500 mt-4 max-w-xl mx-auto">{product.comparisonInfo.verdict ?? ''}</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-green-50/50 p-10 rounded-3xl border border-green-100">
                    <h4 className="text-xl font-bold uppercase italic text-green-700 mb-6 flex items-center">
                      <CheckCircle2 className="mr-2" /> Top Benefits
                    </h4>
                    <ul className="space-y-4">
                      {product.comparisonInfo.pros.map((p, i) => (
                        <li key={i} className="text-green-900 font-medium flex items-center space-x-3">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50/50 p-10 rounded-3xl border border-red-100">
                    <h4 className="text-xl font-bold uppercase italic text-red-700 mb-6 flex items-center">
                      <XCircle className="mr-2" /> Consideration
                    </h4>
                    <ul className="space-y-4">
                      {product.comparisonInfo.cons.map((c, i) => (
                        <li key={i} className="text-red-900 font-medium flex items-center space-x-3">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>
          )}
        </section>

        {/* Related Products Placeholder */}
        <section className="mt-32">
          <h2 className="text-4xl font-black italic uppercase mb-12">You might also like</h2>
          <div className="flex items-center justify-center py-20 bg-gray-100 rounded-[2.5rem] border border-dashed border-gray-200">
             <p className="text-gray-400 font-bold uppercase italic tracking-widest">More products loading...</p>
          </div>
        </section>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-black text-white w-full py-4 rounded-full font-bold shadow-lg"
        >
          <span>Buy Now - {formatPrice(product.offerPrice || product.basePrice)}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};
