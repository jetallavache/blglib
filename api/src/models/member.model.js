import mongoose from 'mongoose';

const member_schema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true 
    },
    message: { 
      type: Array,
      default: []
    },
    status: {
      type: String,
      required: true,
      enum: ['Participates', 'Await', 'Refused'],
      default: 'Participates'
    },
    currMeeting: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Meeting", 
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Member", member_schema);
