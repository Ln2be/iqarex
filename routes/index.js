var express = require("express");
var router = express.Router();
var models = require("../lib/mongo");

/* GET home page. */
router.get("/posts", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBPost.find({});
  res.json(posts);
});

module.exports = router;
