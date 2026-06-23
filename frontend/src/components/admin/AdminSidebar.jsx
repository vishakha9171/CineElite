import { NavLink } from 'react-router-dom';
import { LayoutDashboardIcon, ListIcon, PlusSquareIcon, ListCollapseIcon } from 'lucide-react';
import { assets } from '../../assets/assets';

const AdminSidebar = () => {
  const user = {
    firstName: 'Vishakha',
    lastName: 'Raghuwanshi',
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ];

  return (
    <div className="h-[calc(100vh-64px)] fixed top-16 left-0 z-40 flex flex-col items-center pt-8 w-16 md:w-64 bg-[#070a13]/40 border-r
     border-zinc-800/60 backdrop-blur-xl transition-all duration-300">
      
      {/* TOP SECTION: User Identification Badge */}
      <div className="flex flex-col items-center w-full px-4 mb-8 border-b border-zinc-800/40 pb-6">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border border-zinc-700/60 bg-zinc-950 shadow-inner">
          <img 
            src={user.imageUrl} 
            alt="sidebar avatar" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <p className="mt-3 text-xs font-black tracking-normal text-zinc-200 hidden md:block">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5 hidden md:block">
          Workspace Owner
        </p>
      </div>

      {/* NAVIGATION SECTION: Interactive Tab Loops */}
      <div className="w-full flex-1 px-2 space-y-1">
        {adminNavlinks.map((link, index) => {
          const IconComponent = link.icon;
          
          return (
            <NavLink
              key={index}
              to={link.path}
              end={link.path === '/admin'} // Ensures exact matching for the root dashboard path
              className={({ isActive }) => `
                relative flex items-center gap-3 w-full py-3 px-3 md:px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-[#ff2c55]/10 to-transparent text-white border-l-2 border-[#ff2c55] shadow-[inset_4px_0_12px_rgba(255,44,85,0.05)]' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/30'
                }
              `}
            >
              {/* Dynamic Icon Engine Block */}
              <IconComponent className="w-4.5 h-4.5 shrink-0 transition-colors group-hover:text-white" />
              
              {/* Desktop Text Description Tag */}
              <span className="hidden md:block font-bold tracking-wide normal-case text-zinc-300 group-hover:text-white transition">
                {link.name}
              </span>

              {/* Mobile Floating Hover Tooltip Fallback */}
              <span className="absolute left-18 scale-0 group-hover:scale-100 md:group-hover:scale-0 transition-all duration-150 bg-zinc-950
               text-white font-bold text-[9px] px-2 py-1 rounded border border-zinc-800 pointer-events-none z-50 whitespace-nowrap shadow-xl">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </div>

    </div>
  );
};

export default AdminSidebar;