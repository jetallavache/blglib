var mongoose = require("mongoose");

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
  return "/catalog/member/" + this._id;
});

module.exports = mongoose.model("Member", MemberSchema);
