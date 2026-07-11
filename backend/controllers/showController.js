import axios from "axios";
import Movie from "../models/Movie.js"; 
import Show from "../models/Show.js"; 

// API to get all the nowPlaying movies from imdb endpoint
export const getNowPlayingMovies=async(req,res)=>{
   try{
    
     const {data}=await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
        headers:{
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
            
        }
     })
     const movies=data.results;
     res.json({success:true,movies:movies})
   }
   catch(e){
    console.error(e)
    res.json({success:false,message:e.message})
   }
}
  
// API to add a new show to the DB
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;
    
    // console.log(movieId);

    let movie = await Movie.findById(movieId);

    // console.log(process.env.TMDB_API_KEY);

    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse, movieVideosResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`}
        }),
        
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`}
        }),

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`}
        })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;
      const movieVideosData=movieVideosResponse.data


      const formattedGenres = movieApiData.genres 
        ? movieApiData.genres.map(g => g.name) 
        : ["General"];


      const formattedCasts = movieCreditsData.cast 
        ? movieCreditsData.cast.slice(0, 10).map(c => ({
            name: c.name,
            character: c.character,
            profile_path: c.profile_path || ""
          }))
        : [];


      const trailer = movieVideosData.results.find(
          v => v.site === "YouTube" && v.type === "Trailer" && v.official==="true"
      );
      const trailerUrl = trailer
          ? `https://www.youtube.com/embed/${trailer.key}`
          : "";

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: formattedGenres,
        casts: formattedCasts,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language || "en",
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average || 0,
        runtime: movieApiData.runtime || 0,
        available_languages: movieApiData.spoken_languages 
          ? movieApiData.spoken_languages.map(l => l.english_name) 
          : ["English"],
        dimensions: req.body.dimensions || ["2D"],
        content_rating: req.body.content_rating || "PG-13",
        status: "Now Showing",
        trailer_url: trailerUrl
      };

      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];
    
    showsInput.forEach(show => {
      const showDate = show.date;
      show.time.forEach(time => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice: showPrice,
          occupiedSeats: [] ,
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: 'Show Added successfully.' });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



// API to get all upcoming shows grouped by unique movies from the database
export const getShows = async (req, res) => {
  try {
    // 1. Fetch upcoming shows, pull in movie details, and sort by date/time
    const shows = await Show.find({ 
      showDateTime: { $gte: new Date() } 
    })
    .populate('movie')
    .sort({ showDateTime: 1 });

    // 2. Filter out duplicate movies so each movie only appears once in the list
    const uniqueShows = new Set(shows.map(show => show.movie));
    
    // 3. Convert the Set back to an array and send it to the frontend
    res.json({ 
      success: true, 
      shows: Array.from(uniqueShows) 
    });
  } catch (error) {
    // 4. Handle any database or runtime errors gracefully
    console.error(error);
    res.json({ 
      success: false, 
      message: error.message 
    });
  }
};

// async (req, res): Defines an asynchronous Express route handler. The async keyword allows us to use await inside the function, pausing code execution while waiting for the database to reply without blocking the rest of your server.

//Initiates a try...catch safety net. If any line inside this block fails (e.g., the database disconnects), the code immediately stops executing here and jumps straight to the catch block at the bottom to prevent your server from crashing.

 //The $gte operator stands for Greater Than or Equal to. new Date() generates the exact current timestamp.

//.populate('movie')  :Mongoose automatically goes to the movies collection, finds the matching movie document, and swaps the ID out for the full movie details

//.sort({ showDateTime: 1 }): Sorts the final results in ascending order

//new Set(...): A JavaScript Set is a collection that only allows unique values.

//Array.from() converts the Set back into a standard JavaScript array.


// API to get a single show from db
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({ 
      movie: movieId, 
      showDateTime: { $gte: new Date() } 
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      
      dateTime[date].push({ 
        time: show.showDateTime, 
        showId: show._id 
      });
    });

    res.json({ 
      success: true, 
      movie, 
      dateTime 
    });
  } catch (error) {
    console.error(error);
    res.json({ 
      success: false, 
      message: error.message 
    });
  }
};