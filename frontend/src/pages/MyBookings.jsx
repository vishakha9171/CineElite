import  { useState, useEffect } from 'react';
import { Ticket, Calendar, Clock, Receipt, CreditCard } from 'lucide-react';
import { dummyBookingData } from '../assets/assets';
import BackdropCircle from '../components/BackdropCircle';
import timeFormat from '../lib/timeFormat';
import Loading from "../components/Loading";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API loading cycle using your global mock tracking records
    if (dummyBookingData) {
      setBookings(dummyBookingData);
    }
    setIsLoading(false);
  }, []);

  
  if (isLoading) {
    return <Loading/> ;
  }

  return (
    <div className="w-full min-h-screen bg-[#070a13] text-white pt-32 pb-24 px-4 sm:px-8 md:px-16 lg:px-36 relative
     overflow-hidden select-none antialiased">
      
      <BackdropCircle top="10%" left="-100px" className="opacity-[0.06] blur-[120px] bg-[#ff2c55] w-96 h-96 pointer-events-none fixed" />
      <BackdropCircle bottom="15%" right="-100px" className="opacity-[0.05] blur-[140px] bg-[#ff2c55] w-[500px] h-[500px] pointer-events-none fixed" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">

        <div className="flex items-center gap-3 border-b border-zinc-800/60 pb-5">
          <div className="p-2.5 rounded-xl bg-[#ff2c55]/10 border border-[#ff2c55]/20 text-[#ff2c55]">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
              My Bookings
            </h1>
            <p className="text-xs text-zinc-500 font-medium">Manage and view your active theater Tickets</p>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((item, index) => {
              // Safeguard execution path fallbacks to prevent virtual DOM field breaks
              const movie = item.show?.movie || {};
              
              return (
                <div 
                  key={item._id || index}
                  className="flex flex-col md:flex-row items-stretch justify-between bg-zinc-900/20 border border-zinc-800/60 rounded-2xl p-4 md:p-5 gap-6 backdrop-blur-md transition-all duration-300 hover:border-zinc-700/50 hover:bg-zinc-900/30 shadow-xl"
                >
                  
                  {/* LEFT PORTION: Poster Wrap & Metadata Details Segment */}
                  <div className="flex flex-col sm:flex-row gap-5 flex-1">
                    
                    {/* Balanced Aspect-Ratio Poster Container */}
                    <div className="w-full sm:w-28 h-40 md:w-32 md:h-44 shrink-0 overflow-hidden rounded-xl border
                     border-zinc-800/80 shadow-md relative group">
                      <img 
                        src={movie.poster_path} 
                        alt="" 
                        className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105" 
                      />
                    </div>

                    {/* Movie Detail Description Fields */}
                    <div className="flex flex-col justify-between py-1 space-y-3 sm:space-y-0">
                      <div className="space-y-1">
                        <h2 className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-white transition">
                          {movie.title || "Untitled Cinematic Feature"}
                        </h2>
                        <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {timeFormat(movie.runtime)}
                        </p>
                      </div>

                      {/* Explicit Date String Transformation */}
                      <div className="bg-zinc-950/40 border border-zinc-900/60 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 w-fit space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#ff2c55]" />
                          <span>{new Date(item.show?.showDateTime).toLocaleDateString('en-US',
                             { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT PORTION: Financial Calculations & Seating Assignment Block */}
                  <div className="flex flex-row md:flex-col justify-between items-end border-t md:border-t-0 border-zinc-800/60 pt-4 md:pt-0 pl-1 md:pl-0 shrink-0 gap-4 md:gap-0 text-right">
                    
                    {/* Pricing Node with Interactive Conditional Badging */}
                    <div className="flex flex-col items-start md:items-end gap-1 w-full sm:w-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-200">
                          {currency}{item.amount}
                        </span>
                        
                        {/* Dynamic Status Badging */}
                        {item.isPaid ? (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                            Confirmed
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                            Unpaid
                          </span>
                        )}
                      </div>

                      {/* Pay Now Interactive Trigger Gate */}
                      {!item.isPaid && (
                        <button className="flex items-center gap-1.5 mt-2 bg-gradient-to-r from-[#ff2c55] to-[#cc1b40] hover:opacity-95 text-white px-4
                         py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition transform active:scale-95 shadow-md shadow-[#ff2c55]/10 cursor-pointer">
                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                        </button>
                      )}
                    </div>

                    {/* FIXED: Operational Array Logic Parsing Seating Blocks Flawlessly */}
                    <div className="space-y-1 text-xs font-medium text-zinc-500 min-w-[140px]">
                      <p className="flex items-center justify-between gap-4">
                        <span className="text-zinc-600 font-bold uppercase text-[10px] tracking-wide">Total Tickets:</span>
                        <span className="text-zinc-300 font-bold bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-900">
                          {item.bookedSeats?.length || 0}
                        </span>
                      </p>
                      <p className="flex items-center justify-between gap-4">
                        <span className="text-zinc-600 font-bold uppercase text-[10px] tracking-wide">Seat Number:</span>
                        <span className="text-zinc-200 font-extrabold tracking-tight">
                          {item.bookedSeats && item.bookedSeats.length > 0 
                            ? item.bookedSeats.join(', ') 
                            : 'N/A'
                          }
                        </span>
                      </p>
                    </div>

                  </div>

                </div>
              );
            })
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center rounded-2xl bg-zinc-900/5 border border-zinc-900/30 border-dashed
             text-zinc-500 text-center space-y-3">
              <Receipt className="w-8 h-8 opacity-30 text-[#ff2c55]" />
              <p className="text-xs font-medium italic">You haven't booked any Ticket yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MyBookings;