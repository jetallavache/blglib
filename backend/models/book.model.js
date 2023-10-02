import mongoose from 'mongoose';

const book_schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    isbn: { type: String, required: true },
    imageUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Book", book_schema);
