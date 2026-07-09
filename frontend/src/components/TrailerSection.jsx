import { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play } from 'lucide-react';
import { dummyTrailers } from '../assets/assets';
import BackdropCircle from './BackdropCircle';

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrailerSelect = (trailer) => {
    setIsPlaying(false);
    setCurrentTrailer(trailer);
  };

  return (
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden bg-zinc-950 text-white z-10'>
      <BackdropCircle />
      
      <div className="max-w-[960px] mx-auto">
        <p className='text-zinc-300 font-medium text-lg tracking-wide mb-6'>Official Trailers</p>
        
        <div className='relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-zinc-800/50 group z-10'>
          {isPlaying ? (
            <ReactPlayer 
              url={currentTrailer.videoUrl} 
              playing={true}
              controls={true}
              width="100%" 
              height="100%"
            />
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer group"
            >
              <img 
                src={currentTrailer.image} 
                alt="Trailer Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 group-hover:bg-zinc-950/20">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-primary-dull">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Selector Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {dummyTrailers.map((trailer) => {
            const isActive = currentTrailer.videoUrl === trailer.videoUrl;

            return (
              <div 
                key={trailer.videoUrl} 
                onClick={() => handleTrailerSelect(trailer)}
                className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border transition-all
                   duration-300 transform hover:scale-[1.03] select-none ${isActive ? 'border-primary shadow-lg shadow-primary/20 ring-1 ring-primary/30' 
                    : 'border-zinc-800/60 hover:border-zinc-700 shadow-md'}`} 
              >
                <img 
                  src={trailer.image} 
                  alt="Trailer thumbnail" 
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isActive ? 'scale-105 opacity-90' : 'opacity-60 hover:opacity-80'
                  }`}
                />
                
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/50 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                )}

                {isActive && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary text-[10px] font-bold uppercase tracking-wider shadow">
                    Now Playing
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrailersSection;