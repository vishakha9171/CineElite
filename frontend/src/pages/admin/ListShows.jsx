import  { useState, useEffect } from 'react';
import { Film, Calendar, TrendingUp, DollarSign, Eye, Trash2 } from 'lucide-react';
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3"
          }
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
     getAllShows();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full space-y-8 font-sans text-white select-none antialiased animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/10 border border-zinc-900/40 p-6 rounded-3xl backdrop-blur-sm shadow-sm">
        <Title text1="List" text2="Shows" />
        <div className="text-xs font-semibold text-zinc-500 flex items-center gap-2 bg-zinc-950/40 border border-zinc-900/60 px-4 py-2 rounded-xl w-fit">
          <Film className="w-4 h-4 text-[#ff2c55]" />
          <span>Active Schedules: <strong className="text-zinc-200 ml-1">{shows.length}</strong></span>
        </div>
      </div>

      <div className="w-full bg-zinc-900/20 border border-zinc-800/60 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse text-left text-nowrap">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/40 text-xs font-black uppercase tracking-wider text-zinc-400">
                <th className="p-4 pl-6"><div className="flex items-center gap-2"><Film className="w-3.5 h-3.5 text-zinc-500" /> Movie Name</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> Show Time</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5 text-zinc-500" /> Total Bookings</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-zinc-500" /> Earnings</div></th>
                <th className="p-4 pr-6 text-center">Actions</th>
              </tr>
            </thead>
            
            <tbody className="text-sm divide-y divide-zinc-900/40 font-medium text-zinc-300">
              {shows.map((show, index) => {
                const totalBookings = Object.keys(show.occupiedSeats || {}).length;
                const totalEarnings = totalBookings * show.showPrice;

                return (
                  <tr 
                    key={index} 
                    className="group transition-colors duration-200 hover:bg-zinc-900/40"
                  >
                    <td className="p-4 pl-6 font-bold text-zinc-100 group-hover:text-white transition">
                      <div className="flex items-center gap-4">
                        {show.movie?.poster_path ? (
                          <img 
                            src={show.movie.poster_path} 
                            alt="" 
                            className="w-10 h-14 object-cover rounded-xl shadow-lg border border-zinc-800 transition 
                            duration-300 group-hover:border-zinc-700/80 group-hover:scale-102" 
                          />
                        ) : (
                          <div className="w-10 h-14 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center text-zinc-700">
                            <Film className="w-4 h-4" />
                          </div>
                        )}
                        <span className="truncate max-w-[220px] tracking-tight">
                          {show.movie?.title || "Unknown Title"}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4 text-zinc-400 font-semibold group-hover:text-zinc-300 transition">
                      {new Date(show.showDateTime).toLocaleDateString('en-US' ,{ weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-zinc-950/40 border border-zinc-900
                         text-zinc-300 group-hover:text-zinc-100 transition">
                          {totalBookings} Seats
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4 font-black text-transparent bg-clip-text bg-gradient-to-r from-white
                     to-zinc-300 group-hover:from-white group-hover:to-white transition">
                      {currency}{totalEarnings.toLocaleString()}
                    </td>

                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 hover:text-white
                         hover:border-zinc-700 transition-all duration-200 cursor-pointer active:scale-95">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-500 hover:text-[#ff2c55]
                         hover:border-[#ff2c55]/30 transition-all duration-200 cursor-pointer active:scale-95">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {shows.length === 0 && (
          <div className="w-full py-20 text-center text-zinc-500 border-t border-zinc-900/60 text-xs font-semibold italic flex flex-col items-center justify-center gap-2">
            No dynamic movie schedules currently listed in the directory.
          </div>
        )}
      </div>

    </div>
  );
};

export default ListShows;