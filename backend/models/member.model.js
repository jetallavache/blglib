import mongoose from 'mongoose';

const member_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    curr_meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", required: true },
    status: {
      type: String,
      required: true,
      enum: ["true", "false"],
      default: "true",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Member", member_schema);
