import mongoose from 'mongoose';

const member_schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, default: '(none)' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Member", member_schema);
