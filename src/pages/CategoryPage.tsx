import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/common/ProductGrid';
import { productService } from '../services/productService';
import { Product } from '../types';

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      if (category) {
        const data = await productService.getProducts({ category });
        setProducts(data);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
    window.scrollTo(0, 0);
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4">{category}</h1>
        <p className="text-gray-500 max-w-xl text-lg font-medium leading-relaxed">
          Exploring the best selection of {category} products curated for performance, quality, and style.
        </p>
      </div>
      
      <ProductGrid 
        products={products} 
        title={`Latest in ${category}`}
        subtitle="Curated collection"
      />
    </div>
  );
};
