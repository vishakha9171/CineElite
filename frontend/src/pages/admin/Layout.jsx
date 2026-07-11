// ../ (First step): Moves out of the admin folder into the pages folder.
// ../ (Second step): Moves out of the pages folder into the main src folder.

import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { useAppContext } from '../../context/AppContextProvider';
import Loading from '../../components/Loading';


const Layout = () => {

    const {isAdmin}=useAppContext()
    // console.log("Layout:", isAdmin);
    // const isAdmin=true;

  return isAdmin?(
    <div className="w-full min-h-screen bg-[#070a13] font-sans antialiased text-white overflow-x-hidden">
      <AdminNavbar />
      <div className="w-full flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0 min-h-[calc(100vh-64px)] pt-24 pb-16 pl-20 pr-4 sm:pr-6 md:pl-72 md:pr-10 transition-all duration-300">
          <div className="w-full h-full bg-zinc-900/10 border border-zinc-900/40 rounded-[2rem] p-6 md:p-8 backdrop-blur-sm shadow-2xl relative">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#ff2c55]/[0.02] rounded-full filter blur-[100px] pointer-events-none" />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ):<Loading/>;
};

export default Layout;
