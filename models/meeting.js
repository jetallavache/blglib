var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  place: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true },
});

MeetingSchema.virtual("url").get(function () {
  return "/catalog/meeting/" + this._id;
});

module.exports = mongoose.model("Meeting", MeetingSchema);
