var express = require("express");
var router = express.Router();
var models = require("../lib/mongo");

/* GET home page. */
router.get("/posts", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBPost.find({});
  res.json(posts);
});

router.get("/updatepost", async function (req, res, next) {
  // res.render('index', { title: 'Express' });{
  const { id } = req.query;
  const posts = await models.DBPost.updateOne({ _id: id }, req.query);
  res.json(posts);
});

// router.get("/deleteall", async function (req, res, next) {
//   // res.render('index', { title: 'Express' });
//   const posts = await models.DBPost.deleteMany({});
//   res.json(posts);
// });\

router.get("/delete", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const { id } = req.query;
  const posts = await models.DBPost.deleteOne({ _id: id });
  res.json(posts);
});

router.get("/deletecodes", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBUserCode.deleteMany({});
  res.json(posts);
});

router.get("/users", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBUser.find({});
  res.json(posts);
});

router.get("/deleteuser", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const { id } = req.query;
  const posts = await models.DBUser.deleteOne({ _id: id });
  res.json(posts);
});

router.get("/updateuser", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const { id } = req.query;
  const posts = await models.DBUser.updateOne({ _id: id }, req.query);
  res.json(posts);
});

router.get("/backups", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBBackup.find({}).sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
