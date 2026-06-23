import { Calendar, Clock, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingSection = ({ movieId, dateSlots = {}, selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  const availableDates = Object.keys(dateSlots);
  const navigate=useNavigate()

  return (
    <div id="dateSelect" className="relative bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 border
     border-zinc-800/80 rounded-3xl p-6 md:p-10 space-y-10 backdrop-blur-xl max-w-6xl mx-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]
      overflow-hidden transition-all duration-500 hover:border-zinc-700/50 scroll-mt-24">
      
      {/* Decorative Premium Minimalist Corner Lines */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-500/5 to-transparent pointer-events-none rounded-tr-full" />
      
      {/* Step 1: Calendar Dates Grid */}
      <div className="relative z-10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary animate-pulse" /> 1. Choose Screening Date
        </h3>
        <div className="flex flex-wrap gap-3 pt-1">
          {availableDates.length > 0 ? (
            availableDates.map((date) => {
              const dateObj = new Date(date);
              // Safe evaluation to ensure strict string checking against state
              const isSelected = selectedDate?.toString() === date.toString();
              
              return (
                <button 
                  key={date} 
                  onClick={() => { setSelectedDate(date); setSelectedTime(""); }} 
                  className={`flex flex-col items-center justify-center w-16 h-20 rounded-2xl border font-bold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isSelected 
                      ? "bg-gradient-to-b from-primary to-primary-dull border-primary text-white shadow-lg shadow-primary/20 scale-105" 
                      : "bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800/40"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest opacity-60 font-semibold">
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-xl mt-0.5 tracking-tight">
                    {dateObj.toLocaleDateString('en-US', { day: 'numeric' })}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="w-full py-4 px-4 rounded-xl bg-red-500/5 border border-red-500/10 text-zinc-400">
              <p className="text-xs font-medium tracking-wide italic">
                No upcoming screening schedules available for this title. Please check your data source showId mapping.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Available Showtimes List */}
      {selectedDate && dateSlots[selectedDate] && (
        <div className="relative z-10 space-y-4 animate-fadeIn border-t border-zinc-800/60 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> 2. Available Showtimes
          </h3>
          <div className="flex flex-wrap gap-3 pt-1">
            {dateSlots[selectedDate].map((slot, index) => {
              // Type-safe string validation for individual screening slot entities
              const isSelected = selectedTime?.toString() === slot.time?.toString();
              
              return (
                <button 
                  key={index} 
                  onClick={() => setSelectedTime(slot.time)} 
                  className={`px-5 py-3 rounded-xl border text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer ${
                    isSelected 
                      ? "bg-white text-black border-white shadow-xl scale-105 font-bold" 
                      : "bg-zinc-900/30 border-zinc-800/60 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-800/40"
                  }`}
                >
                  {new Date(slot.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Selection Display & Action Button */}
      <div className="relative z-10 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-1">
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em] font-bold">Your Selection</p>
          <p className="text-sm font-semibold text-zinc-200">
            {selectedDate && selectedTime 
              ? `${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date(selectedTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
              : "Choose date & time parameters to unlock ticketing"
            }
          </p>
        </div>
        
        <button 
          onClick={()=>navigate(`/movies/${movieId}/${selectedDate}`)}
          disabled={!selectedDate || !selectedTime} 
          className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 transition-all duration-500 transform ${
            selectedDate && selectedTime
              ? "bg-gradient-to-r from-primary to-violet-600 hover:translate-x-0.5 text-white shadow-xl shadow-primary/20 active:scale-98 cursor-pointer"
              : "bg-zinc-900/50 border border-zinc-800/80 text-zinc-600 cursor-not-allowed opacity-50"
          }`}
        >
          <Ticket className="w-4 h-4" /> Book Tickets Now
        </button>
      </div>
    </div>
  );
};

export default BookingSection;