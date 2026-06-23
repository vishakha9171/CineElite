import { StarIcon, Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';
import { useState } from 'react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // Initialize state directly from localStorage to prevent synchronous useEffect loops
  const [isLiked, setIsLiked] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('likedMovies')) || [];
    return savedFavorites.includes(movie._id || movie.id);
  });

  const toggleLike = (e) => {
    e.preventDefault();   
    e.stopPropagation();  //prevent from redirted to movie route on clicking
    
    const savedFavorites = JSON.parse(localStorage.getItem('likedMovies')) || [];
    const movieId = movie._id || movie.id;
    let updatedFavorites;

    if (savedFavorites.includes(movieId)) {
      updatedFavorites = savedFavorites.filter(id => id !== movieId);
      setIsLiked(false);
    } else {
      updatedFavorites = [...savedFavorites, movieId];
      setIsLiked(true);
    }

    localStorage.setItem('likedMovies', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('storage_update'));
  };

  return (
    <div className='group flex flex-col justify-between p-3 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/40 rounded-2xl
     hover:border-zinc-700/60 transition-all duration-500 w-66 shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5'>
      
      <div className='relative rounded-xl overflow-hidden h-52 w-full bg-zinc-950 shadow-md'>
        <img 
          onClick={() => { navigate(`/movies/${movie._id}`); window.scrollTo(0, 0); }}
          src={movie.backdrop_path} 
          alt={movie.title} 
          className='h-full w-full object-cover object-center cursor-pointer transition-transform duration-700 ease-out group-hover:scale-105'
        />
        
        <div 
          onClick={() => { navigate(`/movies/${movie._id}`); window.scrollTo(0, 0); }}
          className='absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100
           transition-opacity duration-300 flex items-center justify-center cursor-pointer'
        >
          <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center 
           scale-75 group-hover:scale-100 transition-transform duration-500 shadow-lg'>
            <Play className='w-5 h-5 fill-white text-white ml-0.5' />
          </div>
        </div>
        
        <button 
          onClick={toggleLike}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md border z-20 transition-all duration-300 
            transform active:scale-75 cursor-pointer ${
            isLiked 
              ? 'bg-red-500/20 border-red-500/50 text-red-500 shadow-lg shadow-red-500/20' 
              : 'bg-black/40 border-white/10 text-zinc-300 hover:bg-black/60 hover:text-white'
          }`}
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-300 ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`} 
          />
        </button>
      </div>

      <p className='font-semibold mt-4 truncate text-zinc-100 group-hover:text-white transition-colors duration-300'>
        {movie.title}
      </p>
      
      <p className='text-xs text-zinc-400 mt-2 flex flex-wrap items-center gap-1 font-normal tracking-wide'>
        <span>{new Date(movie.release_date).getFullYear()}</span>
        <span>•</span>
        <span className='truncate max-w-[120px]'>
          {movie.genres?.slice(0, 2).map(genre => genre.name).join(" | ")}
        </span>
        <span>•</span>
        <span>{timeFormat(movie.runtime)}</span>
      </p>

      <div className='flex items-center justify-between mt-5 pb-1'>
        <button 
          onClick={() => { navigate(`/movies/${movie._id}`); window.scrollTo(0, 0); }}
          className='px-5 py-2 text-xs bg-primary hover:bg-primary-dull text-white transition-all duration-300 
          rounded-xl font-semibold cursor-pointer shadow-md shadow-primary/10 transform active:scale-95'
        >
          Buy Tickets
        </button>
        <p className='flex items-center gap-1 text-xs text-zinc-300 pr-1 font-semibold tracking-wide bg-zinc-800/40 
        px-2 py-1 rounded-lg border border-zinc-700/20'>
          <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          {movie.vote_average?.toFixed(1)}
        </p>
      </div>

    </div>
  );
};

export default MovieCard;