// import { useState, useEffect } from 'react'
// import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BackdropCircle from '../components/BackdropCircle'
import { Heart } from 'lucide-react' 
import { useAppContext } from '../context/AppContextProvider'
// import { useEffect, useState } from 'react'

const Favorites = () => {

  const {shows,favoriteMovies}=useAppContext()

  const favoriteMovieObj = shows.filter(movie =>
  favoriteMovies.includes(movie._id))

  // Local storage can only save text strings.
  // JSON.parse(...): Converts that string back into a real JavaScript array of IDs

  //passing an anonymous callback function () => { ... } inside useState.The Magic: React will only 
  // execute this block of code once, at the exact moment the component mounts for the first time.

  // const [favoriteMovies, setFavoriteMovies] = useState(() => {
  //   const savedFavorites = JSON.parse(localStorage.getItem('likedMovies')) || []
  //   if (savedFavorites.length > 0) {
  //     return dummyShowsData.filter(movie => savedFavorites.includes(movie._id || movie.id))
  //   }
  //   return [dummyShowsData[0], dummyShowsData[1]]
  // })

  // useEffect(() => {
  //   const syncFavorites = () => {
  //     const savedFavorites = JSON.parse(localStorage.getItem('likedMovies')) || []
  //     if (savedFavorites.length > 0) {
  //       const filtered = dummyShowsData.filter(movie => savedFavorites.includes(movie._id || movie.id))
  //       setFavoriteMovies(filtered)
  //     } else {
  //       setFavoriteMovies([])
  //     }
  //   }


  //   // 1. window.addEventListener('storage_update', syncFavorites):This line tells the browser: "Keep your ears open.
  //   //  Whenever a storage_update event happens anywhere on this website, immediately run the syncFavorites function."
  //   // The Problem it Solves: When a user clicks a heart button inside a MovieCard, that card updates localStorage,
  //   //  but the Favorites component has no natural way of knowing that something changed.
  //   window.addEventListener('storage_update', syncFavorites)
  //   return () => {
  //     // tells the browser: "If the user navigates away from the Favorites page, detach the ears
  //     window.removeEventListener('storage_update', syncFavorites)
  //   }
  // }, [])

  return favoriteMovies.length > 0 ? (
    <div className='relative w-full py-24 px-6 md:px-16 lg:px-36 xl:px-44 bg-[#0a0f1d] text-white min-h-screen 
    overflow-hidden select-none'>
      
      <BackdropCircle top="100px" right="-50px" className="opacity-30 blur-[120px] bg-rose-600 w-96 h-96" />
      <BackdropCircle bottom="100px" left="-50px" className="opacity-20 blur-[150px] bg-violet-600 w-[500px] h-[500px]" />

      <div className='relative z-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6'>
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500'>
            <Heart className='w-3.5 h-3.5 fill-current animate-pulse' />
            Your Collection
          </div>
          <h1 className='text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 
          bg-clip-text text-transparent'>
            Saved Favorites
          </h1>
        </div>
        <p className='text-sm text-zinc-400 font-medium max-md:hidden'>
          You liked {favoriteMovies.length} movies
        </p>
      </div>

      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 xl:gap-10 justify-items-center'>
        {favoriteMovieObj.map((movie) => (
          <div 
            key={movie._id || movie.id} 
            className='w-full flex justify-center'
          >
            <MovieCard movie={movie} /> 
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-[#0a0f1d]
     text-gray-400'>
      <Heart className='w-12 h-12 text-zinc-700 mb-4 stroke-[1.5]' />
      <h3 className='text-xl font-bold text-white mb-1'>Your Collection is empty</h3>
      <p className='text-sm text-zinc-500 max-w-sm leading-relaxed'>
        Tap the heart button on movies to save in your favorites.
      </p>
    </div>
  )
}

export default Favorites