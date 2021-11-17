const express = require("express");
const unirest = require('unirest');
const { google } = require("googleapis");
const keys = require("./chatbot-demo-332411-af85b0669ad7.json");

const server = express();

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

server.post("/", (req, res) => {
  console.log(req)

  if (req.body.type === "MESSAGE") {
    return res.json({
      text: "sleeping...",
    })
  }
})

server.listen(80, () => {
  console.log(">> Server online | 80");
});
