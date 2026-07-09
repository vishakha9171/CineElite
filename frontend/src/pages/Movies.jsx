// import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BackdropCircle from '../components/BackdropCircle'
import { useAppContext } from '../context/AppContextProvider'


const Movies = () => {

  const {shows}=useAppContext()

  return shows.length > 0 ? (
    <div className='relative w-full py-24 px-6 md:px-16 lg:px-36 xl:px-44 bg-[#0a0f1d] text-white min-h-screen overflow-hidden select-none'>
      
      <BackdropCircle top="100px" left="-50px" className="opacity-40 blur-[120px] bg-red-600 w-96 h-96" />
      <BackdropCircle bottom="100px" right="-50px" className="opacity-30 blur-[150px] bg-indigo-600 w-[500px] h-[500px]" />

      <div className='relative z-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500'>
            <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>
            In Theaters Now
          </div>
          <h1 className='text-3xl md:text-4xl font-black tracking-tight bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent'>
            Streaming
          </h1>
        </div>
        <p className='text-sm text-gray-400 font-medium max-md:hidden'>
          Showing {shows.length} blockbusters near you
        </p>
      </div>

      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-10 justify-items-center'>
        {shows.map((movie) => (
          <div 
            key={movie._id || movie.id} 
            className='w-full transform hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-red-500/10 rounded-2xl overflow-hidden group'
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='w-full min-h-[80vh] flex flex-col items-center justify-center text-gray-400 bg-[#0a0f1d]'>
      <p className='text-lg font-medium tracking-wide'>No live screenings found near you.</p>
    </div>
  )
}

export default Movies