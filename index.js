const express = require("express");
const unirest = require("unirest");
const { google } = require("googleapis");
const keys = require("./chatbot-demo-332411-af85b0669ad7.json");

const server = express();
const PORT = process.env.PORT || 3000

// const getJWT = async () => {
//   let jwtClient = new google.auth.JWT(
//     keys.client_email,
//     null,
//     keys.private_key,
//     ['https://www.googleapis.com/auth/chat.bot']
//   );

//   await jwtClient.authorize((err, tokens) => {
//     if (err) return null;
//     return tokens.access_token;
//   });
// }

// const postMessage = async count => {
//   const token = await getJWT()

//   if (!token)
//     return null

//   // await unirest.post('https://chat.googleapis.com/v1/spaces/' + {ROOM-ID} + '/messages')
// }

server.get("/", (req, res) => {
  res.send("Rook Bot Online")
})

server.post("/", (req, res) => {
  const { space, type } = req.body || {};
  console.log(req)
  res.send({ text: `space: ${space}, type: ${type}` });
});

server.listen(PORT, () => {
  console.log(`>> Server online | ${PORT}`);
});
