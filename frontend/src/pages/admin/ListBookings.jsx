import  { useState, useEffect } from 'react';
import { User, Film, Calendar, Armchair, DollarSign, Receipt, CheckCircle, Clock } from 'lucide-react';
import { dummyBookingData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      setBookings(dummyBookingData || []);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full space-y-8 font-sans text-white select-none antialiased animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/10 border border-zinc-900/40 p-6 rounded-3xl backdrop-blur-sm shadow-sm">
        <Title text1="List" text2="Bookings" />
        <div className="text-xs font-semibold text-zinc-500 flex items-center gap-2 bg-zinc-950/40 border border-zinc-900/60 px-4 py-2 rounded-xl w-fit">
          <Receipt className="w-4 h-4 text-[#ff2c55]" />
          <span>Total Bookings: <strong className="text-zinc-200 ml-1">{bookings.length}</strong></span>
        </div>
      </div>

      <div className="w-full bg-zinc-900/20 border border-zinc-800/60 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full border-collapse text-left text-nowrap">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/40 text-xs font-black uppercase tracking-wider text-zinc-400">
                <th className="p-4 pl-6"><div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-zinc-500" /> User Name</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><Film className="w-3.5 h-3.5 text-zinc-500" /> Movie Name</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> Show Time</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><Armchair className="w-3.5 h-3.5 text-zinc-500" /> Seats</div></th>
                <th className="p-4"><div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-zinc-500" /> Amount</div></th>
                <th className="p-4 pr-6 text-center">Status</th>
              </tr>
            </thead>
            
            <tbody className="text-sm divide-y divide-zinc-900/40 font-medium text-zinc-300">
              {bookings.map((item, index) => {
                const seatList = item.bookedSeats && item.bookedSeats.length > 0 
                  ? item.bookedSeats.join(', ') 
                  : 'N/A';

                return (
                  <tr 
                    key={item._id || index} 
                    className="group transition-colors duration-200 hover:bg-zinc-900/40"
                  >
                    <td className="p-4 pl-6 font-bold text-zinc-100 group-hover:text-white transition">
                      {item.user?.name || "Unknown Customer"}
                    </td>
                    
                    <td className="p-4 font-semibold text-zinc-300 group-hover:text-zinc-100 transition">
                      {item.show?.movie?.title || "Unknown Title"}
                    </td>
                    
                    <td className="p-4 text-zinc-400 font-semibold group-hover:text-zinc-300 transition">
                      {new Date(item.show?.showDateTime).toLocaleDateString('en-US' ,{ weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-zinc-950/40 border border-zinc-900 text-zinc-300 group-hover:text-zinc-100 transition tracking-tight">
                        {seatList}
                      </span>
                    </td>
                    
                    <td className="p-4 font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 group-hover:from-white group-hover:to-white transition">
                      {currency}{item.amount?.toLocaleString()}
                    </td>

                    <td className="p-4 pr-6">
                      <div className="flex items-center justify-center">
                        {item.isPaid ? (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]">
                            <CheckCircle className="w-3 h-3" /> Paid
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20">
                            <Clock className="w-3 h-3" /> Pending
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="w-full py-20 text-center text-zinc-500 border-t border-zinc-900/60 text-xs font-semibold italic flex flex-col items-center justify-center gap-2">
            No dynamic client checkout records available inside the system vault.
          </div>
        )}
      </div>

    </div>
  );
};

export default ListBookings;