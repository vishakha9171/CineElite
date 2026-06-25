import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: { 
      type: String, 
      required: true, 
      ref: 'Movie' 
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: true
    },
    screenName: {
      type: String,
      required: true,
      default: "Screen 1"
    },
    showDateTime: { 
      type: Date, 
      required: true 
    },
    showPrice: { 
      type: Number, 
      required: true 
    },
    occupiedSeats: { 
      type: [String], 
      default: [] 
    },
    totalSeats: {
      type: Number,
      required: true,
      default: 60
    }
  }, 
  { 
    minimize: false,
    timestamps: true 
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;