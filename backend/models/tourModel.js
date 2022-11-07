import mongoose from "mongoose";
const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    userName: {
      type: String,
    },
    creator: {
      type: String,
    },
    tags: {
      type: [String],
    },
    image: {
      type: {},
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
