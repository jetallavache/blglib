import mongoose from 'mongoose';
import moment from 'moment';

const meeting_schema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    place: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

meeting_schema.virtual("date_formatted").get(function () {
  return moment(this.date).locale('ru').format("D MMMM (ddd), в HH:mm");
});

meeting_schema.virtual("date_with_year").get(function () {
  return moment(this.date).locale('ru').format("D MMMM YYYY");
});

export default mongoose.model("Meeting", meeting_schema);
