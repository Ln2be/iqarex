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

  Models: mongoose.models,
};
