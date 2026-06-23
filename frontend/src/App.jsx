// React Hooks and Def
import {Routes,Route, useLocation} from 'react-router-dom'

// external packages
import {Toaster} from 'react-hot-toast' //for notifications                

// components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// pages
import Home  from './pages/Home'
import Favorite from './pages/Favorite'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import MovieDetail from './pages/MovieDetail'
import Movies from './pages/Movies'
import Theaters from './pages/Theaters'
import Releases from './pages/Releases'
// admin pages
import Dashboard from './pages/admin/Dashboard'
import Layout from './pages/admin/Layout'
import AddShows from './pages/admin/AddShows'
import ListBookings from './pages/admin/ListBookings'
import ListShows from './pages/admin/ListShows'


function App() {

  // to check current route is admin or not
  // useLocation hook is used to check the active path currently
  const isAdminRoute=useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster/>   

      {!isAdminRoute && <Navbar/>}

      {/* Redirect to pages */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movies/:id" element={<MovieDetail/>}/>
        <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
        <Route path="/theaters" element={<Theaters/>}/>
        <Route path="/releases" element={<Releases/>}/>
        
        {/*   /* tells React Router that this route will host nested routes inside of it.
        but if already put your child inside admin Route using <Route> tag then (/*) will crash */}
        <Route path='/admin' element={<Layout/>}>
        {/* on admin route Layout will appear but we add index in Dashboard Route so dashboard will also appear
         on same admin route */}
          <Route index element={<Dashboard/>}/>
          <Route path='list-shows' element={<ListShows/>}/>
          <Route path='add-shows' element={<AddShows/>}/>
          <Route path='list-bookings' element={<ListBookings/>}/>
        </Route>
      </Routes>

      {!isAdminRoute && <Footer/>}

    </>
  )
}

export default App
