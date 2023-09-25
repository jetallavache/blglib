var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
});

AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

AuthorSchema.virtual("url").get(function () {
  return "/info/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
