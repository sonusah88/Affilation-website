import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  MousePointer2, 
  TrendingUp, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

const visitData = [
  { name: 'Mon', visits: 400, clicks: 240 },
  { name: 'Tue', visits: 300, clicks: 139 },
  { name: 'Wed', visits: 200, clicks: 980 },
  { name: 'Thu', visits: 278, clicks: 390 },
  { name: 'Fri', visits: 189, clicks: 480 },
  { name: 'Sat', visits: 239, clicks: 380 },
  { name: 'Sun', visits: 349, clicks: 430 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-black/5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-2xl", color)}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className={cn("flex items-center text-xs font-bold", trend === 'up' ? 'text-green-500' : 'text-red-500')}>
        {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
        {trendValue}
      </div>
    </div>
    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-3xl font-black italic uppercase tracking-tighter">{value}</h3>
  </motion.div>
);

import { cn } from '../../lib/utils';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Visits" 
          value="12,482" 
          icon={Users} 
          trend="up" 
          trendValue="12.5%" 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Clicks" 
          value="3,842" 
          icon={MousePointer2} 
          trend="up" 
          trendValue="18.2%" 
          color="bg-orange-500"
        />
        <StatCard 
          title="Click Rate" 
          value="30.8%" 
          icon={TrendingUp} 
          trend="down" 
          trendValue="2.1%" 
          color="bg-green-500"
        />
        <StatCard 
          title="Top Orders" 
          value="482" 
          icon={ShoppingBag} 
          trend="up" 
          trendValue="5.4%" 
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[400px]">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold italic uppercase tracking-tight">Performance Overview</h3>
            <div className="flex space-x-2">
               <span className="flex items-center text-[10px] font-bold text-gray-400 uppercase"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span> Visits</span>
               <span className="flex items-center text-[10px] font-bold text-gray-400 uppercase"><span className="w-2 h-2 rounded-full bg-orange-500 mr-1.5"></span> Clicks</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#9CA3AF'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                <Area type="monotone" dataKey="clicks" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold italic uppercase tracking-tight mb-8">Top Performing Products</h3>
          <div className="space-y-6 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold truncate max-w-[150px]">Premium Noise Cancelling Headphones</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Electronics • Tech</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black italic tracking-tighter">1,240 <span className="text-[10px] font-bold text-gray-400 uppercase not-italic tracking-normal">Clicks</span></p>
                  <p className="text-[10px] font-bold text-green-500 uppercase">+12% vs last week</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-xs font-bold text-black border border-gray-100 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all w-full uppercase tracking-widest">
            Export Analytics (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
