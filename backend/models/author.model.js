import mongoose from 'mongoose';

var author_schema = new mongoose.Schema({
  family_name: { type: String, required: true, max: 100 },
  first_name: { type: String, required: true, max: 100 },
});

export default mongoose.model("Author", author_schema);
