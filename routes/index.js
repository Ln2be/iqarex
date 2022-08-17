var express = require("express");
var router = express.Router();
var models = require("../lib/mongo");
var fs = require("fs");
const { DBPost } = require("../lib/mongo");

/* GET home page. */
router.get("/posts", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBPost.find({}).sort({ createdAt: -1 });
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
  const posts = await models.DBUser.find({}).sort({ createdAt: -1 });
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

router.get("/rmbackups", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const posts = await models.DBBackup.deleteMany({});
  res.json(posts);
});

// turn departement to departements. one user

router.get("/convertdep", async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  const oposts = await models.DBUser.find({}).sort({ createdAt: -1 });

  // var oposts = JSON.parse(sposts);
  const nposts = oposts.map(async (post) => {
    // the field departement should be an array

    const ran = Math.round(Math.random() * 1);

    const newDep = ran == 0 ? "Arafat" : "Ksar";

    const departements = [post.departement ? post.departement : newDep];
    const posts = await models.DBUser.updateOne(
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

router.get("/usertel", async function (req, res, next) {
  const { id, tel } = req.query;

  const user = await models.DBUser.updateOne({ _id: id }, { tel: tel });
  res.send(user);
});
router.get("/restorepost", async function (req, res, next) {
  // delete all first
  const deleted = await models.DBPost.deleteMany({});
  // get the latest backup for the database backup model! I hope remain undemaged
  const backups = await models.DBBackup.find({}).sort({ createdAt: -1 });
  const url = backups[0].url;

  const posts = fs.readFileSync(url + "/DBPost.json");
  // const posts = await models.DBBackup.find({}).sort({ createdAt: -1 });
  const jsons = JSON.parse(posts.toString());

  jsons.map(async (json) => {
    delete json._id;
    const postsup = await new models.DBPost(json).save();
  });

  const postsup = await models.DBPost.find({});
  res.send(jsons);
});

router.get("/tests", async (req, res, next) => {
  const tests = await models.DBTest.find({});
  res.send(tests);
});

router.get("/deletetracks", async (req, res, next) => {
  const tests = await models.DBTrack.deleteMany({});
  res.send(tests);
});

router.get("/deletechances", async (req, res, next) => {
  const tests = await models.DBChance.deleteMany({});
  const tests2 = await models.DBTrack.deleteMany({});
  const posts = await models.DBPost.updateMany(
    {},
    { trackcount: "", chancecount: "" }
  );
  // console.log(posts[posts.length - 1]);
  // for (let post of posts) {
  //   if (post.trackcount) {
  //     await models.DBPost.updateOne({ count: post.count }, { trackcount: "" });
  //   }
  // }

  res.send(posts);
});

router.get("/addhidden", async (req, res) => {
  const posts = await models.DBPost.find({});
  let result;
  for (let post of posts) {
    console.log(post._id);
    result = await models.DBPost.updateOne(
      { _id: post._id },
      { hidden: false }
    );
  }
  res.send(result);
});

// change the role of the user
router.get("/userole", async function (req, res, next) {
  const { id, role } = req.query;

  const user = await models.DBUser.updateOne({ _id: id }, { role: role });
  res.send(user);
});

// correct prices
router.get("/coprices", async (req, res) => {
  const posts = await models.DBPost.find({});
  let newPrice;
  for (let post of posts) {
    const price = post.price;
    const type = post.type;

    if (type == "demandRent" || type == "offerRent" || type == "stay") {
      if (price > 1000) {
        newPrice = price / 1000;
      } else {
        newPrice = price;
      }
    }

    if (type == "buying" || type == "selling") {
      if (price < 200000 && price > 200) {
        newPrice = price / 1000;
      } else if (price > 1000000) {
        newPrice = price / 1000000;
      } else {
        newPrice = price;
      }
    }

    await models.DBPost.updateOne({ _id: post._id }, { price: newPrice });
  }

  const postsr = await models.DBPost.find({});
  res.send(postsr);
});

router.get("/cocompared", async (req, res) => {
  const posts = await models.DBPost.find({});
  let result;
  for (let post of posts) {
    console.log(post.comparedTo);
    result = await models.DBPost.updateOne(
      { _id: post._id },
      { comparedTo: [] }
    );
  }
  // const ini = ["Hi"];
  // await models.DBPost.updateMany({}, { comparedTo: ini });
  res.send("done with Hi");
});

router.get("/addCounter", async (req, res) => {
  const postCounter = await models.DBCounter.findOne({ name: "posts" });

  const pCounter = postCounter
    ? postCounter
    : await new models.DBCounter({ name: "posts" }).save();

  let counter = 0;
  // console.log(pCounter);
  const posts = await models.DBPost.find({}).sort({ createdAt: +1 });
  let result;
  console.log(posts.length);
  for (let post of posts) {
    counter = counter + 1;
    result = await models.DBPost.updateOne(
      { _id: post._id },
      { count: counter }
    );
  }
  await models.DBCounter.updateOne({ name: "posts" }, { counter: counter });
  // const ini = ["Hi"];
  // await models.DBPost.updateMany({}, { comparedTo: ini });
  res.send("done with Hi");
});

router.get("/addCounterUser", async (req, res) => {
  const postCounter = await models.DBCounter.findOne({ name: "users" });

  const pCounter = postCounter
    ? postCounter
    : await new models.DBCounter({ name: "users" }).save();

  let counter = 0;
  // console.log(pCounter);
  const posts = await models.DBUser.find({}).sort({ createdAt: +1 });
  let result;
  console.log(posts.length);
  for (let post of posts) {
    counter = counter + 1;
    result = await models.DBUser.updateOne(
      { _id: post._id },
      { count: counter }
    );
  }
  await models.DBCounter.updateOne({ name: "users" }, { counter: counter });
  // const ini = ["Hi"];
  // await models.DBPost.updateMany({}, { comparedTo: ini });
  res.send("done with Hi");
});

module.exports = router;
