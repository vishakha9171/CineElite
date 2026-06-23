import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Bell, ShieldCheck, UserCheck } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <div className="w-full h-16 fixed top-0 right-0 z-50 bg-[#070a13]/70 border-b border-zinc-800/60
     backdrop-blur-md transition-all duration-300">
      <div className="h-full w-full mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* LEFT SECTION: Logo and Identity Badge */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center transition hover:opacity-90 active:scale-98">
            <img 
              src={assets.logo} 
              alt="logo" 
              className="w-28 sm:w-32 h-auto object-contain"
            />
          </Link>
          
          {/* Minimalist Admin Panel Identifier Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase 
          tracking-wider text-[#ff2c55] bg-[#ff2c55]/10 border border-[#ff2c55]/20 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </div>
        </div>

        {/* RIGHT SECTION: Operations & Profile Adornments */}
        <div className="flex items-center gap-5">
          
          {/* Action Alerts Bell Trigger Button */}
          <button className="relative p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400
           hover:text-white hover:border-zinc-700/50 transition cursor-pointer active:scale-95">
            <Bell className="w-4 h-4" />
            {/* Active Live Update Indicator Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff2c55] ring-2 ring-[#070a13]" />
          </button>

          {/* Vertical Divider Spacer Line */}
          <div className="w-[1px] h-6 bg-zinc-800/60" />

          {/* Admin User Control Card Segment */}
          <div className="flex items-center gap-3 bg-zinc-900/30 border border-zinc-800/40 px-3 py-1.5 rounded-xl">
            <div className="flex flex-col text-right hidden md:block">
              <p className="text-xs font-bold text-zinc-200 tracking-tight flex items-center gap-1 justify-end">
                Vishakha <UserCheck className="w-3 h-3 text-emerald-400" />
              </p>
              <p className="text-[9px] font-bold uppercase text-zinc-500 tracking-widest mt-0.5">System Manager</p>
            </div>
            
            {/* Profile Picture Frame */}
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700/60 shadow-md bg-zinc-950 flex items-center justify-center">
              <img 
                src={assets.profile} 
                alt="profile" 
                className="w-full h-full object-cover"
                // e.target.style.display = 'none'; is a line of code used to completely hide an HTML element from the webpage when a specific event (like a click or an error) occurs.
                // e (or event): This is the event object that JavaScript automatically creates when an action happens (e.g., a user clicks a button, or an image fails to load).
                // .target: This points directly to the exact HTML element that triggered the event. For example, if an image fails to load, e.target is that specific <img> tag.
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminNavbar;