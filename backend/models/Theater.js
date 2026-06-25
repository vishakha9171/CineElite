import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      city: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true
      }
    },
    screens: [
      {
        name: {
          type: String,
          required: true,
          default: "Screen 1"
        },
        type: {
          type: String,
          enum: ["2D", "3D", "4DX", "IMAX"],
          default: "2D"
        },
        totalSeats: {
          type: Number,
          required: true,
          default: 60
        }
      }
    ],
    amenities: {
      type: [String],
      default: ["Parking", "Food Court"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


// Instead of searching through every single document in your database from top to bottom (called a collection scan), MongoDB builds a behind-the-scenes lookup structure—much like an index or glossary at the back of a textbook.

// "location.city": 1: This tells MongoDB to index the nested city field first, sorting it in ascending (alphabetical) order.
// name: 1: This tells MongoDB to index the theater's name second, also in ascending order, within each city grouping.


theaterSchema.index({ "location.city": 1, name: 1 });

const Theater = mongoose.model("Theater", theaterSchema);

export default Theater;