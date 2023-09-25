var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  curr_meeting: { type: Schema.ObjectId, ref: "Meeting", required: true },
  date_reg: { type: Date, default: Date.now },
  status: {
    type: String,
    required: true,
    enum: ["true", "false"],
    default: "true",
  },
});

MemberSchema.virtual("url").get(function () {
  return "/info/member/" + this._id;
});

MemberSchema.virtual("date_reg_formatted").get(function () {
  return moment(this.date_reg).format("MMMM Do, YYYY, HH:mm");
});

module.exports = mongoose.model("Member", MemberSchema);
