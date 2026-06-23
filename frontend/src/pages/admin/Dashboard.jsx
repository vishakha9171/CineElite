import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Tv, 
  Users, 
  Star, 
  Calendar,
  Clock
} from 'lucide-react';
import { dummyDashboardData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import timeFormate from '../../lib/timeFormat'
import Loading from '../../components/Loading'


const Dashboard = () => { 
  
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dummyDashboardData) {
      setDashboardData(dummyDashboardData);
    }
    setLoading(false);
  }, []);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: TrendingUp,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "Total Revenue",
      value: `${currency}${dashboardData.totalRevenue || "0"}`,
      icon: DollarSign,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows?.length || "0",
      icon: Tv,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: Users,
      color: "text-[#ff2c55] bg-[#ff2c55]/10 border-[#ff2c55]/20"
    }
  ];

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="w-full space-y-10 font-sans text-white select-none antialiased">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/10 border border-zinc-900/40
       p-6 rounded-3xl backdrop-blur-sm shadow-sm">
        <Title text1="Overview" text2="Management" />
        <div className="text-xs font-semibold text-zinc-500 flex items-center gap-2 bg-zinc-950/40 border border-zinc-900/60
         px-4 py-2 rounded-xl w-fit">
          <Calendar className="w-4 h-4 text-[#ff2c55]" />
          <span>System Live Status</span>
        </div>
      </div>

      {/* METRIC ANALYTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {dashboardCards.map((card, index) => {
          const CardIcon = card.icon;
          return (
            <div 
              key={index}
              className="flex items-center justify-between p-5 bg-zinc-900/20 border border-zinc-800/60 rounded-2xl backdrop-blur-md 
              shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-700/50 group"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition">
                  {card.title}
                </p>
                <h3 className="text-2xl font-black tracking-tight text-zinc-100">
                  {card.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-105 ${card.color}`}>
                <CardIcon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
            Current Active Shows
          </p>
          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-950/40 border border-zinc-900 px-3 py-1 rounded-md">
            Live Stream Data
          </span>
        </div>

        <div className="flex flex-wrap gap-5 w-full">
          {dashboardData.activeShows && dashboardData.activeShows.length > 0 ? (
            dashboardData.activeShows.map((showItem) => {
              const movie = showItem.movie || {};
              return (
                <div 
                  key={showItem._id}
                  className="w-full sm:w-52 bg-zinc-900/20 border border-zinc-800/60 rounded-2xl overflow-hidden 
                  backdrop-blur-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/50 hover:shadow-xl group"
                >
                  <div className="w-full h-64 overflow-hidden border-b border-zinc-800 relative bg-zinc-950">
                    <img 
                      src={movie.poster_path} 
                      alt="" 
                      className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 border border-zinc-800 text-white font-bold 
                    text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-md">
                      {currency}{showItem.showPrice}
                    </div>
                  </div>

                  {/* Descriptive Text Metadata Body */}
                  <div className="p-3.5 space-y-3">
                    <h4 className="font-bold text-xs text-zinc-200 group-hover:text-white transition truncate w-full">
                      {movie.title || "Unknown Screening"}
                    </h4>

                    {/* Operational Badges Row */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500 pt-1 border-t border-zinc-900/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-zinc-300">{movie.vote_average?.toFixed(1) || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-400 bg-zinc-950/50 px-2 py-0.5 rounded border border-zinc-900">
                        <Clock className="w-3 h-3 text-[#ff2c55]" />
                        <span>{timeFormate(movie.runtime)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full py-12 bg-zinc-900/5 border border-zinc-800/40 border-dashed rounded-2xl text-center flex flex-col items-center justify-center text-zinc-500 text-xs italic">
              No cinema screenings are currently registered on system hubs.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;