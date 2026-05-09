import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export const AdminLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Featured & Banners', icon: ImageIcon, path: '/admin/featured' },
    { name: 'Analytics', icon: TrendingUp, path: '/admin/analytics' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link to="/" className="text-xl font-black italic tracking-tighter uppercase flex items-center">
            Affilio <span className="ml-2 text-[10px] bg-black text-white px-1.5 rounded uppercase not-italic tracking-normal">Admin</span>
          </Link>
        </div>

        <nav className="flex-grow px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                location.pathname === item.path 
                  ? "bg-black text-white shadow-lg shadow-black/10" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-black"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {location.pathname === item.path && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-3 mb-4">
            <img 
              src={user?.photoURL || ''} 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user?.displayName}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-8 sticky top-0 z-40 flex items-center justify-between">
          <h2 className="text-lg font-black italic uppercase tracking-tight">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin'}
          </h2>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-xs font-bold text-gray-500 hover:text-black flex items-center space-x-1 border border-gray-200 px-3 py-1.5 rounded-full transition-all"
            >
              <ExternalLink className="h-3 w-3" />
              <span>View Site</span>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
