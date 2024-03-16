import mongoose from 'mongoose';

var author_schema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true,
    max: 100 
  },
  familyName: { 
    type: String, 
    required: true, 
    max: 100 
  },
});

export default mongoose.model("Author", author_schema);
