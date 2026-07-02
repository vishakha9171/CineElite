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

    let movie = await Movie.findById(movieId);

    if (!movie) {
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`}
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { 'Authorization': `Bearer ${process.env.TMDB_API_KEY}`}
        })
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

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
        trailer_url: req.body.trailer_url || ""
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


