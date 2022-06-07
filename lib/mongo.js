var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// const isProduction = process.env.NODE_ENV === "production";

// const db = isProduction ? "iqardb" : "iqardb3";

mongoose.connect("mongodb://localhost:27017/iqardb");

const countSchema = new Schema({
  name: String,
  count: { type: Number, default: 0 },
});

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  departement: String,
  departements: [String],
  region: String,
  tel: String,
  code: String,
  count: Number,
  hash: String,
  salt: String,
  id: String,
  createdAt: Number,
});

const postSchema = new Schema({
  type: String,
  departement: String,
  departements: [String],
  region: String,
  details: String,
  images: [
    {
      data: String,
      width: Number,
      height: Number,
    },
  ],
  price: Number,
  tel: String,
  id: String,
  count: Number,
  createdAt: Date,
  user: String,
});

const userCodesSchema = new Schema({
  code: Number,
  used: Number,
});

const adminCodesSchema = new Schema({
  code: Number,
  used: Number,
});

const backupSchema = new Schema({
  url: String,
  createdAt: { type: Date, default: Date.now() },
});

// test the closed loop in express
const testSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now() },
});

const trackSchema = new Schema({
  postid: String,
  updates: [
    {
      date: Date,
      text: String,
    },
  ],
  text: String,
  name1: String,
  tel1: String,
  name2: String,
  tel2: String,
  archived: { type: Boolean, default: false },
});

const chanceSchema = new Schema({
  postid: String,
  text: String,
});

module.exports = {
  DBUserCode:
    mongoose.models.DBUserCode || mongoose.model("DBUserCode", userCodesSchema),

  DBAdminCode:
    mongoose.models.DBAdminCode ||
    mongoose.model("DBAdminCode", adminCodesSchema),

  DBPost: mongoose.models.DBPost || mongoose.model("DBPost", postSchema),

  DBUser: mongoose.models.DBUser || mongoose.model("DBUser", userSchema),

  DBCount: mongoose.models.DBCount || mongoose.model("DBCount", countSchema),

  DBBackup:
    mongoose.models.DBBackup || mongoose.model("DBBackup", backupSchema),

  DBTest: mongoose.models.DBTest || mongoose.model("DBTest", testSchema),
  DBTrack: mongoose.models.DBTrack || mongoose.model("DBTrack", trackSchema),
  DBChance:
    mongoose.models.DBChance || mongoose.model("DBChance", chanceSchema),

  Models: mongoose.models,
};
