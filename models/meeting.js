var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var MeetingSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  place: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: String, required: true },
});

MeetingSchema.virtual("url").get(function () {
  return "/info/meeting/" + this._id;
});

MeetingSchema.virtual("date_formatted").get(function () {
  return moment(this.date).format("MMMM Do, YYYY");
});

MeetingSchema.virtual("date_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.date).toISODate();
});

module.exports = mongoose.model("Meeting", MeetingSchema);
