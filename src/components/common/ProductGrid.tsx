import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export const ProductGrid = ({ products, title, subtitle }: ProductGridProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12">
          {subtitle && <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">{subtitle}</span>}
          {title && <h2 className="text-4xl md:text-5xl font-black tracking-tight italic uppercase">{title}</h2>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No products found in this category.</p>
        </div>
      )}
    </section>
  );
};
