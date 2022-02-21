const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const express = require("express");
const cors = require("cors");
const expApp = express();
expApp.use(express.json());
expApp.use(cors());

const serv = {
  type: "service_account",
  project_id: "users-d1c7e",
  private_key_id: "b397a080d1f65fc4476f64706ee27199c2d7ffb9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCx8hwd+vyy7Kei\ncjXBYBtzPHfhdOar27YXOZKvdVtrOAlnXu9JL2i4CifxHExK8pPI7bHc8xrg/E5z\nIuzvl7F630owOq1p0s/fqpGHohS2agqMnxpo15wAKVmkIzaCECbF341dfH2EIBg+\n17tZi38diZbNmDZuFazbVzM2Csb0OBRxHZdEDiGk3jybpM7hevHAaLO2mUg/Ci+F\n0Pw/D79usWhbdDWjAx92Wc1w0gE+b0AwewARiyJwwabyE5KWF3lr/LWuGWT2mAN1\nwXw/zz8T2uJZFMtCxfA66JKreMn0a0DFSzCSg2Y29lv8Z221I89TRBuK93UUyCAY\n4SuNGnERAgMBAAECggEAUV0QuiyfCvjmlYJ/TdIx+vj1H6OiLYaite/fQFb63AWd\nVySzaNVCnpQWO0rjH4nXRRJaN1r5OVJkVITtrYfA4RvkAjVyQWbhIbYOIORdcCMA\ne9fr7XBYpkJB+KkZLVNRRzy2mL5pbdZ2/5UI1yLPlqPozk0A5kkG5qvygI1g9x1C\nDXBdgP9UFawledHR1v++CTEzwsNd7u3/9Ze8NttwXdO9MQzqp28jzOLkfLTmDlD+\nyafcBfMThW/T5SgpFU5tM3Q72YxepIeb8v0Cr6Rc3u8a9YIhbwVzH6wdrx6Kuki/\nPUpqkBUo3+4mgkCOuwNNGIADYGrXsg6tZ4B0BsgZ+QKBgQDaw3PFu8B0nEcGidRU\n6e1t/JqqSrEnMCwAtKQ6vbS28e43zqXrblNjSq7D9keY/m4p/AjHJmYHBv+JUbDi\nO2rPZLJHxc7jcDzipUVmrNjI+UNEAs/2p17m5AWmiuKZi2uhPR3LdDDI+7Gy3U1x\ntV2xI4+FkIT5yGm7gPuGIMB8LwKBgQDQPAmlXth5PLw6EWkKXwMkp/GrjRhkJwLT\nJ21/GpppcJRHoGKvP+WLpWIRZJchOudUItvvtN7NdlbSN6osvrwFKphmGdax+R7l\nVTNnMD9ucDGHxzcelGgg9bUjJp25sHlQXz38nbORuSqZxlj44ERZPMRJ+djpUx1R\nHR442RpWvwKBgCxAh0XDYf30suVesiXvIAk0pPC3pThBJVWLNQFw6IJtU/vUAHos\nWg/mxo17XyZSqWQyyG/Ik7DuOHjFnptU25lSTEH6gIw/YwGR3wUTB9M3oOS8EOdb\nGfZov7/drlLTAhWesE08lrXBPEPrQkQzJN21TM3+2vdQFBtKzxZlv6ofAoGALZN2\naQOBTcfFStBUtThmb7dyZaHUHNeM/ro6dP9VnI5PZf3sm37Ytt/TvwrNKTDDQN8A\nVE66FS45gnk8fd6hOGBCStaM7xcfdAJZ5dPhjkJwFM+9eKvyvoQIyVDCZMoDQ1wV\nLR03GEX21QFcp9wuGXn7XFWa7DaMzBwbaUXbRfECgYBt+7CaZPixcWoOTp7ZG6p7\njWiRgxmtceSDUdRaNBGMUDlrNuLeCX6eyLB/yHNeqHpRcWvewELUZ09ulO9Jl7St\nAlQ4b2k7/HekMFbzmricUFT/POi+3iS0aALPdSAjuzCi5cTUd2+lCi/ubHl5+km2\ngAcJE1YlRrkbRuim0Vvghg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-aob38@users-d1c7e.iam.gserviceaccount.com",
  client_id: "110871158742201500845",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-aob38%40users-d1c7e.iam.gserviceaccount.com",
};

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
// const listAllUsers = (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   fire_Auth
//     .listUsers(1000, nextPageToken)
//     .then((listUsersResult) => {
//       listUsersResult.users.forEach((userRecord) => {
//         //   console.log("user", userRecord.toJSON());
//         Ulist.push(userRecord);
//       });
//       // console.log("user array", Ulist);
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         listAllUsers(listUsersResult.pageToken);
//       }
//     })
//     .catch((error) => {
//       console.log("Error listing users:", error);
//     });
// };
// Start listing users from the beginning, 1000 at a time.
//listAllUsers();
//usersList();
expApp.get("/", async (req, res) => {
  await usersList();
  res.send(Ulist);
});

expApp.put("/disable", async (req, res) => {
  console.log(req.query.id);
  try {
    await fire_Auth.updateUser(req.query.id, { disabled: true });
    await usersList();
    res.send(Ulist);
  } catch (e) {
    console.log("error");
  }
});

expApp.delete("/delete", async (req, res) => {
  try {
    console.log("hello", req.query.id);
    await fire_Auth.deleteUser(req.query.id);
    await usersList();
    res.send(Ulist);
  } catch (e) {
    console.log(e);
  }
});

expApp.listen(5000, () => {
  console.log("server is listening on port 5000");
});
