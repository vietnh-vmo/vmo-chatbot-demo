const express = require("express");
// const unirest = require("unirest");
// const { google } = require("googleapis");
// const keys = require("./chatbot-demo-332411-af85b0669ad7.json");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const commands = [
  { name: "help", des: "Hướng dẫn sử dụng", url: "" },
  { name: "about me", des: "Thông tin User", url: "" },
  { name: "documents", des: "Tài nguyên các phòng ban", url: "" },
  { name: "cư dân", des: "Cư dân VMO Homepage", url: "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vTXynV48msVH15QI5SQfEZMq0QK9gIPZy2giyeZRbMMpQwCy1ExXn6Z_SN2SLGPJJYogppsMcRcmaph/pubhtml#" },
  { name: "policy", des: "Quy trình & Quy định", url: "https://drive.google.com/drive/folders/1h3mT2pLrKjsYUy7Igzw1NhiI6kVDygo3" },
  { name: "training", des: "Tài nguyên đào tạo", url: "https://drive.google.com/drive/folders/0AA1jNUkTgVkUUk9PVA" },
  { name: "radio", des: "VMO Radio", url: "https://docs.google.com/forms/d/e/1FAIpQLScnZTCuL3thVYIyaAgQq4OjFrBEzR9O1bQUlNJvuspUOD_wGw/viewform" },
  { name: "homies", des: "VMO's Homies", url: "https://docs.google.com/forms/d/e/1FAIpQLSf3MGxsIR2q8p8aOMmrGJeuXBNWJzhSYG17c-CDk7-vCK3kPQ/viewform" },
  { name: "slide templates", des: "VMO Slide Templates", url: "https://docs.google.com/presentation/u/0/?ftv=1&tgif=d" },
  { name: "shorten link", des: "Rút gọn Link", url: "https://vmo.link/" },
]

const getReply = (space, message) => {
  let msg = String(message.text.replace(/^\s+|\s+$/gm, ''))

  if (msg.includes("@Rook")) {
    if (msg.startsWith("@Rook"))
      msg = msg.split("@Rook")[1].trim()
    else if (msg.endsWith("@Rook"))
      msg = msg.split("@Rook")[0].trim()
    else
      return null
  }

  const cmd = commands.find(command => command.name === msg)

  if (!cmd) return null

  if (cmd.name === "help") {
    const payload = {
      cards: [{
        header: {
          title: "Rook Bot | User Manual",
          subtitle: "Hướng dẫn sử dụng"
        },
        sections: [
          { widgets: [] }
        ]
      }]
    }
    commands.forEach(command => {
      payload.cards[0].sections[0].widgets.push({
        keyValue: {
          content: String(command.name),
          bottomLable: String(command.des),
        }
      })
    })
    console.log(payload)
    return payload
  } else if (cmd.name === "about me") {
    const user = message.sender
    return {
      cards: [{
        header: {
          title: "Your Info",
        },
        sections: [
          {
            widgets: [
              {
                image: {
                  imageUrl: user.avatarUrl,
                }
              },
            ]
          },
          {
            widgets: [
              {
                keyValue: {
                  topLabel: "Name",
                  content: user.displayName
                }
              },
              {
                keyValue: {
                  topLabel: "Email",
                  content: user.email
                }
              }
            ]
          },
        ]
      }]
    }
  } else if (cmd.name === "documents") {

  } else {
    return {
      cards: [
        {
          header: {
            title: String(cmd.name),
            subtitle: String(cmd.des),
          },
          sections: [
            {
              widgets: [
                {
                  buttons: [
                    {
                      textButton: {
                        text: "MỞ LINK",
                        onClick: {
                          openLink: {
                            url: cmd.url
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    };
  }
}

server.get("/", (req, res) => {
  res.send("Rook Bot Online");
});

server.post("/", (req, res) => {
  // console.log(">> Body:", req.body)
  const { space, type, message } = req.body || {};

  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
    return res.send({
      text: `Hello \`${space.displayName}\`, this is Rook 💪\nType \`help\` để biết mình làm được những gì nha.`,
    });
  } else if (type === "MESSAGE") {
    const reply = getReply(space, message)

    if (!reply)
      return res.send({ text: "Chịu ạ 👎\nType \`help\` please." })

    return res.send(reply)
  } else {
    return res.send({ text: "Chịu ạ 👎\nType \`help\` please." })
  }
});

server.listen(PORT, () => {
  console.log(`>> Server online | ${PORT}`);
});
