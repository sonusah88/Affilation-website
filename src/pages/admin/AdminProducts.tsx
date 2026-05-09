import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { formatPrice, cn } from '../../lib/utils';

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await productService.getProducts(); // Admin view should ideally get all, but for now we reuse
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await productService.deleteProduct(id);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search products by name or category..."
            className="w-full bg-white border border-gray-200 rounded-2xl px-12 py-3 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        
        <Link 
          to="/admin/products/new"
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center space-x-2 hover:bg-black/90 transition-all shadow-lg shadow-black/10"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stats</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto"></div>
                   </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                   <td colSpan={6} className="px-8 py-20 text-center">
                      <p className="text-gray-400 font-medium italic">No products found.</p>
                   </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={product.imageUrls[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-xs overflow-hidden">
                        <p className="font-bold text-sm truncate">{product.title}</p>
                        <div className="flex items-center space-x-1 mt-0.5">
                          {product.isFeatured && <span className="bg-orange-100 text-orange-600 text-[8px] font-black uppercase px-1.5 py-0.5 rounded">Featured</span>}
                          {product.bestSeller && <span className="bg-black text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded">Best</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-black italic tracking-tighter">{formatPrice(product.offerPrice || product.basePrice)}</span>
                      {product.offerPrice && <span className="text-[10px] font-medium text-gray-400 line-through">{formatPrice(product.basePrice)}</span>}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-1 text-sm font-black italic tracking-tighter">
                      <MousePointer2 className="h-3 w-3 text-gray-400" />
                      <span>{product.clicks || 0}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "text-[10px] font-black uppercase px-2 py-1 rounded-full",
                      product.status === 'active' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/products/edit/${product.id}`} className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-black">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id!)}
                        className="p-2 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <Link to={`/product/${product.id}`} target="_blank" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-gray-500 hover:text-black">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-8 py-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/20">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {filteredProducts.length} products</p>
          <div className="flex space-x-2">
            <button className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { MousePointer2 } from 'lucide-react';
