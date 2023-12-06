import mongoose from 'mongoose';

const book_schema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Author", 
      required: true 
    },
    covers: { 
      type: Array, 
      default: [] 
    },
    status: String,
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Book", book_schema);
