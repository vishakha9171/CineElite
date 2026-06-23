import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRightIcon, Info, ShieldCheck } from 'lucide-react';
import { dummyShowsData } from '../assets/assets';
import { toast } from 'react-hot-toast';

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [show, setShow] = useState(null);


  useEffect(() => {
    const matchedMovie = dummyShowsData.find(m => m._id === id || m.id?.toString() === id);
    if (matchedMovie) {
      setShow(matchedMovie);
    }
  }, [id]);


  const handleSeatClick = (seatId) => {
    // If the seat is already selected, let them unselect it immediately
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
      return;
    }

    // Strict check: if they have 5 seats locked down 
    if (selectedSeats.length >= 5) {
      toast.error("You can only select a maximum of 5 seats");
      return;
    }

    // If safe, append the seat code
    setSelectedSeats(prev => [...prev, seatId]);
  };


  const renderSeatButton = (row, number) => {
    const seatId = `${row}${number}`;
    const isSelected = selectedSeats.includes(seatId);
    
    const isReserved = (row === 'A' && [4, 5].includes(number)) || 
                       (row === 'C' && [1, 2].includes(number)) || 
                       (row === 'F' && [2, 3].includes(number)) ||
                       (row === 'H' && [5, 6].includes(number));

    return (
      <button
        key={seatId}
        disabled={isReserved}
        onClick={() => handleSeatClick(seatId)}
        className={`group relative w-full aspect-square max-w-[38px] sm:max-w-[42px] rounded-lg border flex
          items-center justify-center transition-all duration-300 ${
          isReserved
          // cursor-not-allowed: means clicking is not allowed
            ? "bg-zinc-950/30 border-zinc-900/60 text-zinc-600 cursor-not-allowed"
            : isSelected
            ? "bg-gradient-to-br from-[#ff2c55] to-[#cc1b40] border-[#ff2c55] text-white shadow-[0_0_15px_rgba(255,44,85,0.5)] scale-105"
            : "bg-zinc-900/40 border-[#ff2c55]/40 text-zinc-400 hover:border-[#ff2c55] hover:text-white hover:bg-zinc-900/80 cursor-pointer"
        }`}
      >
        <span className="text-[9px] sm:text-[10px] font-black tracking-tight">{seatId}</span>
        
        {!isReserved && (
          // pointer-events-none::The element ignores all mouse/touch interactions:eg hovered,clicked etc
          <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-all duration-150 bg-zinc-950 text-white text-[9px] font-bold
           px-1.5 py-0.5 rounded border border-zinc-800 pointer-events-none z-30 shadow-xl">
            Seat {seatId}
          </span>
        )}
      </button>
    );
  };


  const renderBifurcatedRow = (leftRow, rightRow) => {
    return (
      <div key={`${leftRow}-${rightRow}`} className="flex items-center justify-between w-full gap-2 sm:gap-6 md:gap-10 relative z-10">
        
        {/* Left Side Wing Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
          <span className="text-[10px] sm:text-xs font-black text-zinc-700 w-4 text-left opacity-60">{leftRow}</span>
          <div className="flex items-center gap-1 sm:gap-1.5 justify-end w-full max-w-[380px]">
            {Array.from({ length: 9 }, (_, i) => renderSeatButton(leftRow, i + 1))}
          </div>
        </div>

        {/* Central Walking Theater Aisle */}
        <div className="w-6 sm:w-12 md:w-16 h-9 flex items-center justify-center shrink-0 border-x border-zinc-900/20 bg-zinc-950/5 rounded-md">
          <span className="text-[7px] font-black text-zinc-500 tracking-widest uppercase select-none opacity-50">AISLE</span>
        </div>

        {/* Right Side Wing Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-start">
          <div className="flex items-center gap-1 sm:gap-1.5 justify-start w-full max-w-[380px]">
            {Array.from({ length: 9 }, (_, i) => renderSeatButton(rightRow, i + 1))}
          </div>
          <span className="text-[10px] sm:text-xs font-black text-zinc-700 w-4 text-right opacity-60">{rightRow}</span>
        </div>

      </div>
    );
  };

  if (!show) return null;

  return (
    <div className="w-full min-h-screen bg-[#070a13] text-white pt-28 md:pt-32 pb-24 font-sans antialiased select-none relative overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center relative z-10">
        
        {/* Dynamic App Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff2c55] bg-[#ff2c55]/10 px-4 py-1.5 rounded-full border border-[#ff2c55]/20">
            Secure Ticket Terminal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 pt-1">
            {show.title}
          </h1>
          <p className="text-xs font-semibold text-zinc-500 tracking-wide">
            {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Curved Theater Screen Simulation Element */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-16 relative">
          <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#ff2c55] to-transparent rounded-full shadow-[0_0_20px_rgba(255,44,85,0.7)]" />
          <div className="w-[90%] h-10 bg-gradient-to-b from-[#ff2c55]/10 to-transparent rounded-b-full filter blur-md opacity-60 pointer-events-none" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 -mt-1">
            SCREEN SIDE
          </p>
        </div>

        {/* THEATER MAP BODY SHEET */}
        <div className="w-full flex flex-col items-center space-y-12 bg-zinc-950/15 border border-zinc-900/60 p-4
         sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl relative z-10">
          
          {/* CLUB TIER PANEL: Rows A & B (Perfectly Center Grouped) */}
          <div className="flex flex-col gap-3.5 items-center w-full border-b border-zinc-900/50 pb-8">
            <div className="w-full flex justify-start mb-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 border-l-2 border-[#ff2c55] pl-2">Club Tier</span>
            </div>
            {['A', 'B'].map((row) => (
              <div key={row} className="flex items-center gap-4 w-full justify-center">
                <span className="text-[10px] sm:text-xs font-black text-zinc-700 w-4 text-left opacity-60">{row}</span>
                <div className="flex items-center gap-1 sm:gap-1.5 justify-center w-full max-w-[380px]">
                  {Array.from({ length: 9 }, (_, i) => renderSeatButton(row, i + 1))}
                </div>
                <span className="text-[10px] sm:text-xs font-black text-zinc-700 w-4 text-right opacity-60">{row}</span>
              </div>
            ))}
          </div>

          {/* BIFURCATED GRID INTERFACE: Rows C through J */}
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex justify-start mb-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 border-l-2 border-[#ff2c55] pl-2">Executive & Premium Lounges</span>
            </div>
            {renderBifurcatedRow('C', 'E')}
            {renderBifurcatedRow('D', 'F')}
            {renderBifurcatedRow('G', 'I')}
            {renderBifurcatedRow('H', 'J')}
          </div>

        </div>

        {/* Clean Formatted Legends Component */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-wider text-zinc-400
         bg-zinc-950/40 border border-zinc-900/60 px-8 py-3.5 rounded-2xl mt-8 shadow-xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-zinc-900/50 border border-[#ff2c55]/40" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-gradient-to-br from-[#ff2c55] to-[#cc1b40]" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-zinc-950 border border-zinc-900 flex items-center justify-center 
            text-[7px] text-zinc-400 font-black">✕</span>
            <span>Reserved</span>
          </div>
        </div>

        {/* Summary Billing & Action Node Sheet */}
        <div className="w-full max-w-4xl mt-12 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left space-y-1">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold flex items-center justify-center sm:justify-start gap-1">
              <Info className="w-3.5 h-3.5 text-zinc-500" /> Ticket Terminal Manifest
            </p>
            <p className="text-sm font-semibold text-zinc-200">
              {selectedSeats.length > 0 
                ? `Selected: ${selectedSeats.join(', ')} (${selectedSeats.length} Space${selectedSeats.length > 1 ? 's' : ''})`
                : "No spaces locked. Click seat tokens above to initialize checkout."
              }
            </p>
          </div>

          <button 
            onClick={() => {
              if (selectedSeats.length === 0) return toast.info("Please select at least one seat to proceed");
              navigate('/my-bookings');
            }}
            disabled={selectedSeats.length === 0}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-12 py-4 text-xs font-bold tracking-widest
               uppercase rounded-xl transition-all duration-300 transform ${
              selectedSeats.length > 0
                ? "bg-gradient-to-r from-[#ff2c55] to-[#cc1b40] hover:opacity-95 text-white active:scale-98 cursor-pointer shadow-[0_10px_30px_rgba(255,44,85,0.25)] hover:translate-x-0.5"
                : "bg-zinc-900 text-zinc-600 border border-zinc-800/80 cursor-not-allowed opacity-40"
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Secure Checkout
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SeatLayout;