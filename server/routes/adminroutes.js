const router = require("express").Router();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const app = initializeApp({
  //serviceAccounts: serv,
  credential: applicationDefault(),
  databaseURL: "https://users-d1c7e-default-rtdb.firebaseio.com",
});

let fire_Auth = getAuth(app);
//console.log(a);
let Ulist = [];

const usersList = async (nextPageToken) => {
  const values = await fire_Auth.listUsers(1000, nextPageToken);
  Ulist = values.users;
  // console.log("mamama", values.users);
};

router.get("/users", async (req, res) => {
  await usersList();
  res.send(Ulist);
});

router.put("/disable", async (req, res) => {
  console.log(req.query.id);
  try {
    await fire_Auth.updateUser(req.query.id, { disabled: true });
    await usersList();
    res.send(Ulist);
  } catch (e) {
    console.log("error");
  }
});

router.put("/enable", async (req, res) => {
  console.log(req.query.id);
  try {
    await fire_Auth.updateUser(req.query.id, { disabled: false });
    await usersList();
    res.send(Ulist);
  } catch (e) {
    console.log("error");
  }
});

router.delete("/delete", async (req, res) => {
  try {
    console.log("hello", req.query.id);
    await fire_Auth.deleteUser(req.query.id);
    await usersList();
    res.send(Ulist);
  } catch (e) {
    console.log(e);
  }
});
// fire_Auth
//   .setCustomUserClaims("ilE5jQqqGXY774QvYvs1EK1V3gF2", { isAdmin: true })
//   .then(() => {
//     console.log("admin role is added");
//   })
//   .catch(() => {
//     console.log("admin role not working");
//   });
module.exports = router;
