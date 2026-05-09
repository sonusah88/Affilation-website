import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase mb-4 block">Affilio</Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Curating the finest products with expert insights. We help you find the best deals and premium quality items.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-600 hover:text-black text-sm">Best Sellers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black text-sm">New Arrivals</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black text-sm">Trending Now</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-black text-sm">Gift Guides</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Categories</h4>
            <ul className="space-y-4">
              <li><Link to="/category/tech" className="text-gray-600 hover:text-black text-sm">Electronics</Link></li>
              <li><Link to="/category/lifestyle" className="text-gray-600 hover:text-black text-sm">Lifestyle</Link></li>
              <li><Link to="/category/home" className="text-gray-600 hover:text-black text-sm">Home & Office</Link></li>
              <li><Link to="/category/essentials" className="text-gray-600 hover:text-black text-sm">Essentials</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">About Our Service</h4>
            <p className="text-gray-500 text-xs leading-relaxed italic">
              Affilio is an affiliate marketing site. We receive commissions for purchases made through links on this site. Our reviews and recommendations are independent and focused on quality.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center bg-transparent">
          <p className="text-gray-400 text-xs">© 2026 Affilio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-black text-xs">Privacy Policy</Link>
            <Link to="/" className="text-gray-400 hover:text-black text-xs">Terms of Service</Link>
            <Link to="/" className="text-gray-400 hover:text-black text-xs">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
