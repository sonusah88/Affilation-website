import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product, ProductStatus } from '../../types';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon, 
  Star,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    description: '',
    category: 'tech',
    tags: [],
    basePrice: 0,
    offerPrice: undefined,
    imageUrls: [],
    videoUrls: [],
    affiliateLink: '',
    rating: 4.5,
    status: ProductStatus.DRAFT,
    isFeatured: false,
    isTrending: false,
    bestSeller: false,
    limitedTime: false,
    whyThisProduct: '',
    comparisonInfo: {
      pros: [],
      cons: [],
      verdict: ''
    }
  });

  const [newImage, setNewImage] = useState('');
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const fetchProduct = async () => {
        const data = await productService.getProductById(id);
        if (data) {
          setFormData(data);
        }
      };
      fetchProduct();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && id) {
        await productService.updateProduct(id, formData);
      } else {
        await productService.createProduct(formData);
      }
      navigate('/admin/products');
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const addImage = () => {
    if (newImage && (!formData.imageUrls?.includes(newImage))) {
      setFormData({ ...formData, imageUrls: [...(formData.imageUrls || []), newImage] });
      setNewImage('');
    }
  };

  const removeImage = (idx: number) => {
    const newUrls = [...(formData.imageUrls || [])];
    newUrls.splice(idx, 1);
    setFormData({ ...formData, imageUrls: newUrls });
  };

  const addPro = () => {
    if (newPro) {
      const info = formData.comparisonInfo || { pros: [], cons: [], verdict: '' };
      setFormData({ 
        ...formData, 
        comparisonInfo: { ...info, pros: [...info.pros, newPro] } 
      });
      setNewPro('');
    }
  };

  const addCon = () => {
    if (newCon) {
      const info = formData.comparisonInfo || { pros: [], cons: [], verdict: '' };
      setFormData({ 
        ...formData, 
        comparisonInfo: { ...info, cons: [...info.cons, newCon] } 
      });
      setNewCon('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-black italic uppercase tracking-tight">{isEdit ? 'Edit Product' : 'New Product'}</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-black/90 transition-all disabled:opacity-50 shadow-lg shadow-black/10"
        >
          <Save className="h-5 w-5" />
          <span>{loading ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold italic uppercase tracking-tight mb-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span> Basic Details
          </h3>
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Product Title</label>
            <input
              type="text"
              required
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Category</label>
              <select
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black transition-all appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="tech">Tech & Electronics</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="home">Home & Office</option>
                <option value="essentials">Daily Essentials</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Status</label>
              <select
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black transition-all appearance-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
              >
                <option value={ProductStatus.ACTIVE}>Active / Public</option>
                <option value={ProductStatus.DRAFT}>Draft / Hidden</option>
                <option value={ProductStatus.OUT_OF_STOCK}>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Short Description</label>
            <textarea
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black transition-all h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief overview of the product..."
            />
          </div>
        </div>

        {/* Pricing & Links */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
           <h3 className="text-lg font-bold italic uppercase tracking-tight mb-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span> Commercial Info
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Base Price ($)</label>
              <input
                type="number"
                required
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Offer Price ($) - Optional</label>
              <input
                type="number"
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black"
                value={formData.offerPrice || ''}
                onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Affiliate Link</label>
            <div className="relative">
              <input
                type="url"
                required
                className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 font-medium focus:ring-2 focus:ring-black"
                value={formData.affiliateLink}
                onChange={(e) => setFormData({ ...formData, affiliateLink: e.target.value })}
                placeholder="https://amazon.com/..."
              />
              <LinkIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
           <h3 className="text-lg font-bold italic uppercase tracking-tight mb-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span> Product Media
          </h3>
          
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Image URLs</label>
            <div className="flex space-x-2">
               <input
                type="url"
                className="flex-grow bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                placeholder="Paste image URL..."
              />
              <button 
                type="button" 
                onClick={addImage} 
                className="bg-gray-100 p-3 rounded-xl hover:bg-black hover:text-white transition-all"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {formData.imageUrls?.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                  <img src={url} alt="Thumbnail" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion & Review */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
           <h3 className="text-lg font-bold italic uppercase tracking-tight mb-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span> Comparison & Verdict
          </h3>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">"Why this product?" (Expert Quote)</label>
            <textarea
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black h-24"
              value={formData.whyThisProduct}
              onChange={(e) => setFormData({ ...formData, whyThisProduct: e.target.value })}
              placeholder="Share your professional take..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center text-green-600">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Pros
              </label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  className="flex-grow bg-gray-50 border-none rounded-xl px-4 py-2 text-sm" 
                  value={newPro} 
                  onChange={(e) => setNewPro(e.target.value)} 
                  placeholder="Add a benefit..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())}
                />
                <button type="button" onClick={addPro} className="bg-green-100 text-green-700 p-2 rounded-xl"><Plus className="h-4 w-4" /></button>
              </div>
              <ul className="space-y-2">
                {formData.comparisonInfo?.pros.map((p, i) => (
                  <li key={i} className="flex justify-between items-center text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                    <span>{p}</span>
                    <button type="button" onClick={() => {
                        const pros = [...(formData.comparisonInfo?.pros || [])];
                        pros.splice(i, 1);
                        setFormData({...formData, comparisonInfo: {...formData.comparisonInfo!, pros }});
                    }} className="text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center text-red-600">
                <XCircle className="h-3 w-3 mr-1" /> Cons
              </label>
              <div className="flex space-x-2">
                <input 
                   type="text" 
                   className="flex-grow bg-gray-50 border-none rounded-xl px-4 py-2 text-sm" 
                   value={newCon} 
                   onChange={(e) => setNewCon(e.target.value)} 
                   placeholder="Add a downside..."
                   onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())}
                />
                <button type="button" onClick={addCon} className="bg-red-100 text-red-700 p-2 rounded-xl"><Plus className="h-4 w-4" /></button>
              </div>
              <ul className="space-y-2">
                 {formData.comparisonInfo?.cons.map((c, i) => (
                  <li key={i} className="flex justify-between items-center text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-lg">
                    <span>{c}</span>
                    <button type="button" onClick={() => {
                        const cons = [...(formData.comparisonInfo?.cons || [])];
                        cons.splice(i, 1);
                        setFormData({...formData, comparisonInfo: {...formData.comparisonInfo!, cons }});
                    }} className="text-red-400 hover:text-red-600"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Final Verdict / Summary</label>
            <textarea
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-black h-24"
              value={formData.comparisonInfo?.verdict}
              onChange={(e) => setFormData({ ...formData, comparisonInfo: { ...formData.comparisonInfo!, verdict: e.target.value } })}
              placeholder="Summarize your final recommendation..."
            />
          </div>
        </div>

        {/* Promotion Flags */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
           <h3 className="text-lg font-bold italic uppercase tracking-tight mb-8 flex items-center">
            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span> Promotional Flags
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 'isFeatured', label: 'Featured' },
              { id: 'isTrending', label: 'Trending' },
              { id: 'bestSeller', label: 'Best Seller' },
              { id: 'limitedTime', label: 'Limited Stock' }
            ].map((flag) => (
              <label key={flag.id} className="flex items-center space-x-3 cursor-pointer group">
                <div className={cn(
                  "w-10 h-6 rounded-full transition-all relative p-1 flex items-center",
                  formData[flag.id as keyof Product] ? "bg-black" : "bg-gray-200"
                )}>
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                    formData[flag.id as keyof Product] ? "translate-x-4" : "translate-x-0"
                  )} />
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={formData[flag.id as keyof Product] as boolean}
                  onChange={(e) => setFormData({ ...formData, [flag.id]: e.target.checked })}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
