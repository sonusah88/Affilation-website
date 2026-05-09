import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ShieldAlert } from 'lucide-react';

export const AdminLogin = () => {
  const { loginWithGoogle, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  if (user && isAdmin) {
    navigate(from, { replace: true });
  }

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      // AuthContext will handle redirect logic if they are admin
    } catch (e) {
      console.error("Login failed:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-xl shadow-black/5 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-2">Admin Panel</h1>
          <p className="text-gray-500 font-medium">Secure access for site curators.</p>
        </div>

        {user && !isAdmin && !loading && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl mb-8 flex items-center space-x-3 text-sm font-medium">
            <ShieldAlert className="h-5 w-5 flex-shrink-0" />
            <p>Access denied. This area is reserved for administrators only.</p>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-black/90 transition-all disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/split-screen/google.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
          <span>Sign in with Google</span>
        </button>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By signing in, you agree to the management policies.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
