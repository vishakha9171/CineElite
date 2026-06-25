import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { 
      type: String, 
      required: true 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    overview: { 
      type: String, 
      required: true 
    },
    poster_path: { 
      type: String, 
      required: true 
    },
    backdrop_path: { 
      type: String, 
      required: true 
    },
    release_date: { 
      type: String, 
      required: true 
    },
    original_language: { 
      type: String,
      default: "en"
    },
    tagline: { 
      type: String,
      trim: true
    },
    genres: { 
      type: [String], 
      required: true,
      validate: [v => v.length > 0, "Movie must have at least one genre."]
    },
    casts: [
      {
        name: { type: String, required: true },
        character: { type: String },
        profile_path: { type: String }
      }
    ],
    vote_average: { 
      type: Number, 
      required: true,
      min: 0,
      max: 10,
      default: 0
    },
    runtime: { 
      type: Number, 
      required: true 
    },
    available_languages: {
      type: [String],
      required: true,
      default: ["English"]
    },
    dimensions: {
      type: [String],
      enum: ["2D", "3D", "4DX", "IMAX"],
      default: ["2D"]
    },
    content_rating: {
      type: String,
      required: true,
      default: "PG-13",
      enum: ["G", "PG", "PG-13", "R", "NC-17", "U", "UA", "A"]
    },
    status: {
      type: String,
      required: true,
      enum: ["Coming Soon", "Now Showing", "Archived"],
      default: "Now Showing"
    },
    trailer_url: {
      type: String,
      trim: true
    }
  }, 
  { 
    timestamps: true  //it will add time and date automatically every time
  }
);

// a text index breaks down your strings into individual words, removes common filler words (like "the", "a", "is"), and allows you to perform intelligent search-engine-style queries across your entire movie catalog.
// One per Collection Limit: MongoDB only allows one text index per collection. If you want to search multiple fields, you must group them together into a single multi-field index exactly like this
movieSchema.index({ title: "text", overview: "text", genres: "text" });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
