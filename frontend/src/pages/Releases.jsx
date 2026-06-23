import  { useState, useEffect } from 'react';
import { Calendar,  Star,  Flame, Sparkles,  Ticket, Heart } from 'lucide-react';
import { dummyShowsData } from '../assets/assets'; 
import { votesFormat } from '../lib/votesFormat';

const Releases = () => {
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('now-playing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dummyShowsData) {
      setMovies(dummyShowsData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-[#070a13]">
        <div className="w-8 h-8 border-2 border-[#ff2c55] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0f1a] text-white font-sans antialiased select-none overflow-x-hidden relative">
      
      {/* Structural Layer Glow Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#ff2c55]/[0.02] rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[#ff2c55]/[0.02] rounded-full filter blur-[180px] pointer-events-none" />

      {/* Main Structural Center Column Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 relative z-10 space-y-10">
        
        {/* TOP INTERACTIVE CONTROL PANELBAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/60 pb-6">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff2c55] bg-[#ff2c55]/5 px-3.5 py-1.5 rounded-full border border-[#ff2c55]/10 w-fit flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog Directory Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-100">
              Movies in Indore
            </h1>
            <p className="text-xs font-semibold text-zinc-500">
              Discover active listings running across local structural multiplex centers.
            </p>
          </div>

          {/* APP SWITCH CAP CAPSULES */}
          <div className="flex bg-zinc-950 border border-zinc-800/80 p-1 rounded-2xl w-fit shrink-0">
            <button
              onClick={() => setActiveTab('now-playing')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 'now-playing'
                  ? 'bg-[#ff2c55] text-white shadow-xl shadow-[#ff2c55]/10'
                  : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" /> Now Playing
            </button>
            <button
              onClick={() => setActiveTab('coming-soon')}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 'coming-soon'
                  ? 'bg-[#ff2c55] text-white shadow-xl shadow-[#ff2c55]/10'
                  : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Coming Soon
            </button>
          </div>
        </div>

        {/* CINEMATIC TICKETING PLATFORM GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
          {movies.map((movie) => {
            const movieTitle = typeof movie === 'object' && movie !== null ? (movie.title || "Untitled Show") : "Untitled Show";
            
            let displayGenre = 'Action';
            if (movie?.genres && Array.isArray(movie.genres) && movie.genres.length > 0) {
              const primaryGenre = movie.genres[0];
              displayGenre = typeof primaryGenre === 'object' ? (primaryGenre.name || 'Action') : primaryGenre;
            }

            return (
              <div
                key={movie?.id || movie?.movie_id || movieTitle}
                className="group flex flex-col justify-between h-full bg-transparent"
              >
                {/* POSTER ELEMENT CARD WITH APP WRAPPED ACTION LABELS */}
                <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden relative bg-zinc-950 border border-zinc-900 shadow-md group-hover:shadow-xl group-hover:border-zinc-800 transition-all duration-300">
                  <img
                    src={movie?.poster_path}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-102 group-hover:brightness-95"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />

                  {/* FLAT TOP UTILITY LAYER CHIPS */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="bg-zinc-950/80 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-zinc-300 border border-zinc-800/60 px-2 py-0.5 rounded-md">
                      2D / 3D
                    </span>
                    <button className="p-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800/60 text-zinc-400 hover:text-[#ff2c55] hover:bg-zinc-900 transition pointer-events-auto cursor-pointer">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BOOKMYSHOW TREND PATTERN RATINGS OVERLAY ANCHOR */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent flex items-center justify-between border-t border-zinc-900/40 backdrop-blur-[1px]">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-100">
                      <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" /> 
                      <span>{movie?.vote_average ? movie.vote_average.toFixed(1) : "0.0"}/10</span>
                    </div>
                    <span className="text-[10px] font-semibold text-zinc-400">
                      {votesFormat(movie?.vote_count || 0)} Votes
                    </span>
                  </div>

                  {/* OVERLAY SYSTEM HOVER HOOK FOR QUICK INTERACTIONS */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#ff2c55] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-[#ff2c55]/30 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer border border-white/10">
                      <Ticket className="w-3.5 h-3.5" /> Book Tickets
                    </button>
                  </div>
                </div>

                {/* DENSITY CONTENT BLOCK CAP CONTAINER */}
                <div className="mt-3.5 space-y-1.5 px-1">
                  <h3 className="font-black text-base text-zinc-200 group-hover:text-white transition-colors duration-300 truncate w-full tracking-tight">
                    {movieTitle}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 items-center text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/60 text-zinc-400">UA</span>
                    <span>{movie?.runtime ? `${movie.runtime} Mins` : '120 Mins'}</span>
                    <span className="text-zinc-800">•</span>
                    <span className="truncate max-w-[90px]">{displayGenre}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {movies.length === 0 && (
          <div className="w-full py-24 text-center text-zinc-600 border border-dashed border-zinc-900 rounded-[2.5rem] bg-zinc-950/10 text-xs font-semibold italic flex flex-col items-center justify-center gap-2 mt-10">
            No new feature film releases currently matching catalog criteria buffers.
          </div>
        )}

      </div>
    </div>
  );
};

export default Releases;