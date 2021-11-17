const express = require("express");
const unirest = require("unirest");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const keys = require("./chatbot-demo-332411-af85b0669ad7.json");

const server = express();
// server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

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
  res.send("Rook Bot Online");
});

server.post("/", (req, res) => {
  const { space, type, message } = req.body || {};

  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
    res.send({ text: `Thanks for adding me to ${space.displayName}` });
  } else if (type === "MESSAGE") {
    fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=YOUR_GIPHY_API_KEY&tag=${message.text}&rating=G`
    )
      .then((response) => response.json())
      .then((json) =>
        res.send({
          cards: [
            {
              sections: [
                {
                  widgets: [
                    {
                      image: {
                        imageUrl: json.data.images.fixed_height_small.url,
                      },
                    },
                    {
                      buttons: [
                        {
                          textButton: {
                            text: "View on GIPHY",
                            onClick: {
                              openLink: {
                                url: json.data.url,
                              },
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        })
      );
  }
});

server.listen(PORT, () => {
  console.log(`>> Server online | ${PORT}`);
});
