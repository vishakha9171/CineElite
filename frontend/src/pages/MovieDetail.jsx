import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
// import { dummyDateTimeData, dummyShowsData, dummyTrailers } from "../assets/assets";
import { StarIcon, PlayCircleIcon, Heart, X } from 'lucide-react';
import timeFormat from '../lib/timeFormat';
import BackdropCircle from '../components/BackdropCircle';
import FeaturedSection from "../components/FeaturedSection";
import BookingSection from "../components/BookingSection";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContextProvider";


function MovieDetail() {
  const { id } = useParams();
  
  const [movie, setMovie] = useState(null);
  const [dateSlots,setDateSlots]=useState({})

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");


  const { axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      
      if (data.success) {
        setMovie(data.movie);
        setDateSlots(data.dateTime || {})

        const availableDates = Object.keys(data.dateTime || {});
        if (availableDates.length > 0) {
          setSelectedDate(availableDates[0]);
        }

        if (data.movie?.trailer_url) {
          try {
          // new URL(fullUrl) transforms a simple text string into a smart JavaScript object that natively understands web addresses.
            const fullUrl= data.movie.trailer_url 
            const urlObj = new URL(fullUrl);
          // .searchParams.get("v") looks for the standard YouTube query string parameter after the ?v= text segment and extracts just the 11-character video ID code.
            const videoId = urlObj.searchParams.get("v");
            
            if (videoId) {
              setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
            } else {
              const pathSegments = urlObj.pathname.split("/");
              const fallbackId = pathSegments[pathSegments.length - 1];
              setTrailerUrl(`https://www.youtube.com/embed/${fallbackId}`);
            }
          }
          catch (error) {
            const videoId = data.movie.trailer_url.split("v=")[1]?.split("&")[0];
            if (videoId) {
              setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
            }
            console.error(error.message)
          }
        }
      }
    }
    catch(error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  useEffect(()=>{
      if(movie) {
        setIsLiked(favoriteMovies?.includes(movie?._id || movie?.id));
      }
  },[favoriteMovies,movie])


  const updateFavorite = async () => {
    try {
      if (!user) return toast.error("Please login to proceed");

      const token=await getToken()
      const { data } = await axios.post(
        '/api/user/update-favorite', 
        { movieId: movie._id || movie.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        await fetchFavoriteMovies();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (!movie) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen bg-[#070a13] text-white pb-32 select-none overflow-x-hidden antialiased">
      
      {/* Panoramic Backdrop Graphic Banner Canvas */}
      <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={image_base_url+movie.backdrop_path} 
            alt="" 
            className="w-full h-full object-cover opacity-35 scale-100 filter brightness-90 saturate-125 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a13] via-transparent to-[#070a13]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070a13]/90" />
        </div>
      </div>

      {/* Main Structural Detail Card Content Blocks */}
      <div className="relative z-10 -mt-[45vh] md:-mt-[55vh] max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-36 pt-24">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-center lg:items-start">
          
          {/* Floating Neon Frame Poster Wrap */}
          <div className="relative group shrink-0 max-md:scale-95">
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-violet-600/10 rounded-2xl blur-xl
             opacity-75 group-hover:opacity-100 transition duration-700" />
            <img 
              src={image_base_url+movie.poster_path} 
              alt="" 
              className="relative rounded-2xl h-[420px] w-[280px] md:h-[480px] md:w-[320px] object-cover shadow-2xl border
               border-white/10" 
            />
          </div>

          {/* Details Content Metadata Suite Sheet */}
          <div className="relative flex flex-col gap-5 flex-1 w-full text-center lg:text-left">
            <BackdropCircle top="-60px" left="-40px" className="opacity-30 blur-[100px] bg-primary w-80 h-80" />
            
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-[0.25em] mb-2 drop-shadow-md">
                {movie.original_language || "ENGLISH"}
              </p>
              <h1 className="text-4xl md:text-5xl font-black text-balance tracking-tight leading-tight bg-gradient-to-b
               from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                {movie.title}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-zinc-400">
              <span className="bg-zinc-900/40 border border-zinc-800/40 px-3 py-1.5 rounded-full">{timeFormat(movie.runtime)}</span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800/80 px-3 py-1.5 rounded-full text-zinc-200">
                <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" /> 
                <span>{movie.vote_average?.toFixed(1)}</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span className="bg-zinc-900/40 border border-zinc-800/40 px-3 py-1.5 rounded-full">{movie.release_date?.split("-")[0]}</span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {movie.genres?.map((genre, idx) => (
                <span key={idx} className="px-3 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-zinc-900/40 border
                 border-zinc-800/60 text-zinc-300">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl font-normal">
                {movie.overview}
              </p>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-4 mt-4 pt-4 border-t border-white/5">
              <button 
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 px-6 py-3.5 text-xs bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800/80
                 text-zinc-100 rounded-xl font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer active:scale-95 shadow-lg"
              >
                <PlayCircleIcon className="w-4 h-4 text-primary" />
                Watch Trailer
              </button>

              {/* Direct Anchor Scroll Navigation to #dateSelect layout element */}
              <a 
                href="#dateSelect"
                className="px-8 py-3.5 text-xs bg-primary hover:bg-primary-dull text-white rounded-xl font-bold
                 tracking-wider uppercase shadow-xl shadow-primary/20 transition-all duration-300 cursor-pointer active:scale-95 text-center min-w-[140px]"
              >
                Buy Tickets
              </a>

              <button 
                onClick={()=>updateFavorite()}
                className={`p-3 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 border ${
                  isLiked 
                    ? "bg-red-500/10 text-red-500 border-red-500/30 shadow-lg shadow-red-500/10 scale-105" 
                    : "bg-zinc-900/90 text-zinc-400 border-zinc-800/80 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

        </div>
      </div>


      {/* Cast Carousels Profile Scroll Deck Framework */}
      {movie.casts && movie.casts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-36 mt-16 space-y-6 w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800 pb-2">
            Your Favorite Cast
          </p>
          
          <div className="relative w-full">
            <div className="overflow-x-auto no-scrollbar pt-2 pb-4 w-full">
              <div className="flex flex-row items-start gap-4 pr-16 w-max">
                {movie.casts.slice(0, 11).map((cast, index) => {
                  const initials = cast.name
                    ? cast.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
                    : "?";

                  return (
                    <div key={index} className="flex flex-col items-center w-20 md:w-24 shrink-0 group">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-zinc-800 group-hover:border-primary transition-all duration-300 shadow-xl bg-zinc-900 flex items-center justify-center">
                        {cast.profile_path ? (
                          <img 
                            src={cast.profile_path} 
                            alt="" 
                            className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                        
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tracking-wider text-zinc-500 bg-zinc-900/60 z-0">
                          {initials}
                        </span>
                      </div>
                      
                      <p className="font-medium text-[11px] text-zinc-400 group-hover:text-zinc-200 transition mt-3 w-full text-center truncate px-0.5">
                        {cast.name}
                      </p>
                    </div>
                  );
                })}            
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#070a13] to-transparent pointer-events-none max-md:hidden z-10" />
          </div>
        </div>  
      )}


      {/* Extracted Separate Component Render Block Panel with Header Margins */}
      {/* ye id jis anchor tag ke href me ya kisi bhi url me likhi hogi uspr click krne pr hum is div pr land krege*/}
      <div id="dateSelect" className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-36 mt-20 scroll-mt-24">
        <BookingSection 
          movieId={movie._id}
          dateSlots={dateSlots}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>


      {/* Cinematic Modal Overlay Frame for Trailers (Elevated to z-[9999]) */}
      {showTrailer && trailerUrl && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <button 
              onClick={() => setShowTrailer(false)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-zinc-800 text-white hover:bg-zinc-800 transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe 
              src={`${trailerUrl}?autoplay=1`} 
              title="Movie Trailer Player" 
              className="w-full h-full border-0" 
 // When you embed an external website (like YouTube) inside an <iframe>, browsers block features like audio, fullscreen, or sensors by default for safety.
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
            />
          </div>
        </div>
      )}

      {/* Bottom Movies Grid Component */}
      <div className="mt-8 md:mt-16">
        <FeaturedSection />
      </div>

    </div>
  );
}

export default MovieDetail;