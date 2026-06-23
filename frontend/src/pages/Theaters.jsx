import  { useState, useEffect } from 'react';
import { Building2, MapPin, Tv, Armchair, Trash2, ShieldAlert } from 'lucide-react';
import Title from '../components/admin/Title';
import Loading from '../components/Loading';
import BackdropCircle from '../components/BackdropCircle'

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTheaters = async () => {
    try {
      setTheaters([
        {
          id: "th_1",
          name: "PVR Cinemas: Gold Lounges",
          city: "Mumbai",
          screens: 8,
          capacity: 1200,
          status: "Operational"
        },
        {
          id: "th_2",
          name: "INOX: Insignia Mall",
          city: "Delhi NCR",
          screens: 6,
          capacity: 950,
          status: "Operational"
        },
        {
          id: "th_3",
          name: "Cinepolis: IMAX Hub",
          city: "Bengaluru",
          screens: 5,
          capacity: 1400,
          status: "Maintenance"
        }
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-[#070a13] text-white font-sans antialiased select-none overflow-x-hidden relative">
      <BackdropCircle top="100px" left="-50px" className="opacity-40 blur-[120px] bg-red-600 w-96 h-96" />
      <BackdropCircle bottom="100px" right="-50px" className="opacity-30 blur-[150px] bg-indigo-600 w-[500px] h-[500px]" />

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#ff2c55]/[0.03] rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-[#ff2c55]/[0.02] rounded-full filter blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 pb-20 relative z-10 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-b from-zinc-900/40 to-zinc-950/20 border border-zinc-800/40 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <Title text1="CineElite" text2="Theaters" />
          <div className="text-xs font-bold text-[#ff2c55] bg-[#ff2c55]/10 px-5 py-2.5 rounded-2xl border border-[#ff2c55]/20 flex items-center gap-2 shadow-[0_0_20px_rgba(255,44,85,0.05)]">
            <Building2 className="w-4 h-4" />
            <span className="tracking-wide">Active Venues: {theaters.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theaters.map((theater) => {
            const theaterName = typeof theater === 'object' && theater !== null ? (theater.name || "Unknown Venue") : "Unknown Venue";
            const theaterCity = theater?.city || "Unknown City";
            const theaterStatus = theater?.status || "Unknown Status";

            return (
              <div 
                key={theater?.id || theaterName}
                className="group relative bg-gradient-to-b from-zinc-900/40 to-zinc-950/20 border border-zinc-800/50 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 group-hover:text-[#ff2c55] group-hover:border-[#ff2c55]/30 transition-all duration-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    theaterStatus === "Operational"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]"
                      : "text-amber-500 bg-amber-500/10 border-amber-500/20"
                  }`}>
                    {theaterStatus}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-white transition truncate tracking-tight">
                    {theaterName}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/40 border border-zinc-900/60 text-[11px] text-zinc-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#ff2c55]" />
                    <span>{theaterCity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-zinc-800/40 text-xs font-bold text-zinc-400">
                  <div className="bg-zinc-950/30 border border-zinc-900/60 p-3 rounded-xl flex items-center gap-2.5 shadow-inner">
                    <Tv className="w-4 h-4 text-zinc-600" />
                    <div>
                      <p className="text-zinc-600 text-[9px] font-black uppercase tracking-wide">Screens</p>
                      <p className="text-zinc-200 mt-0.5 font-bold">{theater?.screens || 0} Halls</p>
                    </div>
                  </div>

                  <div className="bg-zinc-950/30 border border-zinc-900/60 p-3 rounded-xl flex items-center gap-2.5 shadow-inner">
                    <Armchair className="w-4 h-4 text-zinc-600" />
                    <div>
                      <p className="text-zinc-600 text-[9px] font-black uppercase tracking-wide">Capacity</p>
                      <p className="text-zinc-200 mt-0.5 font-bold">{(theater?.capacity || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-500 hover:text-[#ff2c55] hover:border-[#ff2c55]/20 transition cursor-pointer active:scale-95">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {theaters.length === 0 && (
          <div className="w-full py-20 text-center text-zinc-500 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-[2.5rem] text-xs font-semibold italic flex flex-col items-center justify-center gap-2">
            <ShieldAlert className="w-6 h-6 text-zinc-700 mb-1" />
            No screen-capable theater domains initialized on core micro-nodes.
          </div>
        )}

      </div>
    </div>
  );
};

export default Theaters;