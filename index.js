const express = require("express");
const unirest = require("unirest");
const { google } = require("googleapis");
const keys = require("./chatbot-demo-332411-af85b0669ad7.json");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const commands = [
  { name: "help", des: "Hướng dẫn sử dụng" },
  { name: "about me", des: "Thông tin User" },
  { name: "cư dân", des: "Cư dân VMO Homepage" },
  { name: "documents", des: "Văn bản nội bộ" },
  { name: "isms", des: "Kết quả test ISMS" },
  { name: "isms test", des: "Làm test ISMS" },
  { name: "people", des: "Danh sách cư dân VMO" },
  { name: "birthday", des: "Sinh nhật cư dân VMO" },
  { name: "wifi", des: "Thông tin Wifi" },
  { name: "communities", des: "Các cộng đồng" },
  { name: "contacts", des: "Thông tin liên lạc" },
  { name: "radio", des: "VMO Radio" },
  { name: "homies", des: "VMO's Homies" },
  { name: "slide templates", des: "VMO Slide Templates" },
  { name: "organization", des: "Sơ đồ tổ chức VMO" },
]

server.get("/", (req, res) => {
  res.send("Rook Bot Online");
});

server.post("/", (req, res) => {
  console.log(">> Body:", req.body)
  const { space, type, message } = req.body || {};

  if (type === "ADDED_TO_SPACE" && space.type === "ROOM") {
    return res.send({
      text: `Hello \`\`\`${space.displayName}\`\`\`, this is Rook 💪\nType \`\`\`help\`\`\` để biết mình làm được những gì nha.`,
    });
  } else if (type === "MESSAGE") {
    return res.send({
      cards: [
        {
          header: {
            title: "Hello Cư dân 👋",
            // subtitle: "pizzabot@example.com",
            imageUrl: "https://goo.gl/aeDtrS",
            imageStyle: "IMAGE"
          },
        },    
        {
          sections: [
            {
              widgets: [
                // {
                //   image: {
                //     imageUrl: json.data.images.fixed_height_small.url,
                //   },
                // },
                {
                  buttons: [
                    {
                      textButton: {
                        text: "Cư dân",
                        onClick: {
                          openLink: {
                            url: "https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vTXynV48msVH15QI5SQfEZMq0QK9gIPZy2giyeZRbMMpQwCy1ExXn6Z_SN2SLGPJJYogppsMcRcmaph/pubhtml#",
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
    });
  } else {
    res.send({ text: "Chịu ạ 👎" })
  }
});

server.listen(PORT, () => {
  console.log(`>> Server online | ${PORT}`);
});
