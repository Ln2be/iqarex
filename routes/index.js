var express = require("express");
var router = express.Router();
var models = require("../lib/mongo");
var fs = require("fs");

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

router.get("/reps", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBUser.find({ role: "rep" });
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

// turn departement to departements. one user

router.get("/convertdep", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const oposts = await models.DBPost.find({}).sort({ createdAt: -1 });

  // var oposts = JSON.parse(sposts);
  const nposts = oposts.map(async (post) => {
    // the field departement should be an array

    const departements = [post.departement];
    const posts = await models.DBPost.updateOne(
      { _id: post._id },
      { departements: departements }
    );
  });

  const posts = await models.DBPost.find({}).sort({ createdAt: -1 });

  res.json(posts);
});

router.get("/convertdepusers", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const oposts = await models.DBUser.find({}).sort({ createdAt: -1 });

  // var oposts = JSON.parse(sposts);
  const nposts = oposts.map(async (post) => {
    // the field departement should be an array

    const departements = [post.departement];
    const posts = await models.DBUser.updateOne(
      { _id: post._id },
      { departements: departements }
    );
  });

  const posts = await models.DBUser.find({}).sort({ createdAt: -1 });

  res.json(posts);
});

router.get("/restorepost", async function (req, res, next) {
  // delete all first
  const deleted = await models.DBPost.deleteMany({});
  // get the latest backup for the database backup model! I hope remain undemaged
  const backups = await models.DBBackup.find({}).sort({ createdAt: -1 });
  const url = backups[backups.length - 10].url;

  const posts = fs.readFileSync(url + "/DBPost.json");
  // const posts = await models.DBBackup.find({}).sort({ createdAt: -1 });
  const jsons = JSON.parse(posts.toString());

  jsons.map(async (json) => {
    delete json._id;
    const postsup = await new models.DBPost(json).save();
  });

  const postsup = await models.DBPost.find({});
  res.send(postsup);
});

router.get("/tests", async (req, res, next) => {
  const tests = await models.DBTest.find({});
  res.send(tests);
});

module.exports = router;
