var express = require("express");
var router = express.Router();
var models = require("../lib/mongo");

/* GET home page. */
router.get("/posts", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBPost.find({});
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

module.exports = router;
