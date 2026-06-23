import  { useEffect, useState } from 'react';
import { Star, Calendar, Sparkles, PlusCircle, Check, X, Clock, CalendarDays } from 'lucide-react';
import { dummyShowsData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { votesFormat } from '../../lib/votesFormat';

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || '₹';

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateInput || !timeInput) return;

    setDateTimeSelection((prev) => {
      const times = prev[dateInput] || [];
      if (!times.includes(timeInput)) {
        return {
          ...prev,
          [dateInput]: [...times, timeInput].sort()
        };
      }
      return prev;
    });
    setTimeInput("");
  };

  const handleRemoveTime = (date, timeToRemove) => {
    setDateTimeSelection((prev) => {
      const updatedTimes = prev[date].filter((t) => t !== timeToRemove);
      const newSelection = { ...prev };
      
      if (updatedTimes.length === 0) {
        delete newSelection[date];
      } else {
        newSelection[date] = updatedTimes;
      }
      
      return newSelection;
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full space-y-10 font-sans text-white select-none antialiased animate-fadeIn pb-24">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-b from-zinc-900/40 to-zinc-950/20 border border-zinc-800/40 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff2c55]/5 rounded-full filter blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-[#ff2c55]/10" />
        <Title text1="Create" text2="Schedules" />
        <div className="text-xs font-bold text-[#ff2c55] bg-[#ff2c55]/10 px-5 py-2.5 rounded-2xl border border-[#ff2c55]/20 flex items-center gap-2 shadow-[0_0_20px_rgba(255,44,85,0.05)]">
          <Sparkles className="w-4 h-4" />
          <span className="tracking-wide">Core Studio Console</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-4">
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              01 \ Selection Terminal
            </p>
            <p className="text-sm font-semibold text-zinc-300">Choose a target catalog title to schedule</p>
          </div>
        </div>

        <div className="w-full overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
          <div className="group/deck flex flex-row gap-6 w-max pt-2">
            {nowPlayingMovies.map((movie) => {
              const isSelected = selectedMovie === movie.movie_id || selectedMovie === movie.id;
              return (
                <div
                  key={movie.id || movie.movie_id}
                  onClick={() => setSelectedMovie(movie.movie_id || movie.id)}
                  className={`w-44 bg-zinc-900/10 border rounded-[2rem] overflow-hidden backdrop-blur-md cursor-pointer transition-all duration-500 transform hover:-translate-y-2 group-hover/deck:not-hover:opacity-30 hover:!opacity-100 group-hover/deck:not-hover:scale-98 ${
                    isSelected
                      ? "border-[#ff2c55] ring-4 ring-[#ff2c55]/10 bg-zinc-900/40 shadow-2xl shadow-[#ff2c55]/10 scale-102"
                      : "border-zinc-800/50 shadow-lg"
                  }`}
                >
                  <div className="w-full h-60 overflow-hidden relative bg-zinc-950">
                    <img
                      src={movie.poster_path}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${isSelected ? "brightness-100 scale-102" : "brightness-[0.75] group-hover:scale-105"}`}
                    />
                    
                    {isSelected && (
                      <div className="absolute top-3 right-3 flex items-center justify-center bg-[#ff2c55] h-7 w-7 rounded-xl shadow-xl shadow-[#ff2c55]/30 border border-white/10 animate-scaleIn">
                        <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent flex items-center justify-between text-[10px] font-black tracking-wide">
                      <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{movie.vote_average?.toFixed(1) || "0.0"}</span>
                      </div>
                      <span className="text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded-lg border border-zinc-800/50">
                        {votesFormat(movie.vote_count || 0)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5 bg-zinc-900/20">
                    <h4 className="font-bold text-xs text-zinc-200 truncate w-full group-hover:text-white transition-colors duration-300">
                      {movie.title}
                    </h4>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                      {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-7 bg-gradient-to-b from-zinc-900/30 to-zinc-950/10 border border-zinc-800/50 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-6">
          <div className="space-y-1 border-b border-zinc-800/40 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
              02 \ Configuration Matrix
            </p>
            <p className="text-sm font-semibold text-zinc-300">Establish pricing structure and timing maps</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">
                Show Valuation
              </label>
              <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/30 px-4 py-3.5 rounded-2xl w-full focus-within:border-[#ff2c55] focus-within:ring-4 focus-within:ring-[#ff2c55]/5 transition-all duration-300 shadow-inner">
                <span className="text-sm font-bold text-zinc-500 select-none">{currency}</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0.00"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-zinc-200 outline-none w-full placeholder-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">
                Target Date
              </label>
              <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/30 px-4 py-3 rounded-2xl w-full focus-within:border-[#ff2c55] focus-within:ring-4 focus-within:ring-[#ff2c55]/5 transition-all duration-300 shadow-inner">
                <CalendarDays className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-zinc-300 outline-none w-full text-zinc-400 [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">
              Select Time Slot
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border border-zinc-800 bg-zinc-950/30 p-2 rounded-2xl focus-within:border-[#ff2c55] focus-within:ring-4 focus-within:ring-[#ff2c55]/5 transition-all duration-300 shadow-inner">
              <div className="flex items-center gap-3 px-3 py-2 sm:py-0 flex-1">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                <input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-zinc-300 outline-none w-full text-zinc-400 [color-scheme:dark]"
                />
              </div>
              <button
                type="button"
                onClick={handleDateTimeAdd}
                disabled={!dateInput || !timeInput}
                className="bg-[#ff2c55] text-white hover:opacity-95 px-6 py-3 text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap active:scale-95 shadow-lg shadow-[#ff2c55]/20 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Map Slot
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900/30 to-zinc-950/10 border border-zinc-800/50 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl min-h-[304px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1 border-b border-zinc-800/40 pb-4 mb-4">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
                03 \ Operational Manifest
              </p>
              <p className="text-sm font-semibold text-zinc-300">Pipeline execution buffer</p>
            </div>

            {Object.keys(dateTimeSelection).length > 0 ? (
              <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 no-scrollbar animate-fadeIn">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 pl-1">
                  <Clock className="w-3.5 h-3.5 text-[#ff2c55]" /> Confirmed Time Tracks
                </h2>
                <ul className="space-y-3">
                  {Object.entries(dateTimeSelection).map(([date, times]) => (
                    <li key={date} className="space-y-3 p-4 bg-zinc-950/40 border border-zinc-900/80 rounded-2xl shadow-xl">
                      <div className="text-xs font-black text-zinc-200 flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#ff2c55]" />
                        <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-sm">
                        {times.map((time) => {
                          const [hours, minutes] = time.split(':');
                          const ampm = hours >= 12 ? 'PM' : 'AM';
                          const displayHours = hours % 12 || 12;
                          const formattedTime = `${displayHours}:${minutes} ${ampm}`;

                          return (
                            <div
                              key={time}
                              className="group/time flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/60 pl-3 pr-2 py-1.5 rounded-xl transition-all duration-300 hover:border-[#ff2c55]/40 hover:bg-zinc-900/80"
                            >
                              <span className="text-xs font-bold text-zinc-300 tracking-wide">{formattedTime}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTime(date, time)}
                                className="p-1 rounded-lg text-zinc-500 hover:text-[#ff2c55] hover:bg-[#ff2c55]/10 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" strokeWidth={3} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-[2rem] bg-zinc-950/10 text-zinc-600 text-xs font-medium italic text-center p-6">
                No active timing matrices mapped to the console workspace buffer.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 🚀 FLOATING SYSTEM TRIGGER: Anchored out at the extreme right browser corner level */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 animate-slideUp">
        <button
          type="button"
          disabled={!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff2c55] to-[#cc1b40] hover:opacity-95 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-2xl shadow-[#ff2c55]/30 cursor-pointer transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed disabled:shadow-none border border-white/10 group/publish"
        >
          <PlusCircle className="w-5 h-5 transition-transform duration-300 group-hover/publish:rotate-90" /> 
          <span>Publish Active Schedules</span>
        </button>
      </div>

    </div>
  );
};

export default AddShows;