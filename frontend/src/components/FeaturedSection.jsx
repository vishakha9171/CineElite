import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// import files
// import {dummyShowsData} from '../assets/assets'
import MovieCard from './MovieCard';
import BackdropCircle from './BackdropCircle';
import { useAppContext } from '../context/AppContextProvider';

const FeaturedSection = () => {
  const navigate = useNavigate();

  const {shows}=useAppContext();


// gap-8 =>rem-2 px-32 || 1->.25rem,4px
  return (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden bg-neutral-950 text-white py-12'>
      <BackdropCircle />

      <div className='relative z-20 flex items-center justify-between pt-20 pb-10'>
        <p className='text-zinc-300 font-medium text-lg tracking-wide'>Streaming Now</p>
        <button 
          onClick={() => { navigate('/movies'); window.scrollTo(0, 0); }} 
          className='group flex items-center gap-2 text-sm text-gray-300 transition-colors duration-300 cursor-pointer hover:text-white'
        >
          View All
          <ArrowRight className='group-hover:translate-x-1 transition-transform duration-300 w-4 h-4' />
        </button>
      </div>

      <div className='relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center'>
        {shows.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id || movie.id} movie={movie} />
        ))}
      </div>

      <div className='relative z-20 flex justify-center mt-20'>
        <button 
          onClick={() => { navigate('/movies'); window.scrollTo(0, 0); }}
          className='px-10 py-3.5 text-sm bg-primary hover:bg-primary-dull transition-all duration-300 
          rounded-xl font-semibold cursor-pointer tracking-wide shadow-lg shadow-primary/20 transform hover:scale-[1.02]'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;