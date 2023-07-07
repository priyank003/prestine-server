const http = require("http");

require("dotenv").config();

const app = require("./app");

const { mongoConnect } = require("./services/mongo");
const PORT = process.env.PORT || 8000;

// const server = https.createServer(
//   {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   },
//   app
// );

const server = http.createServer(app);

async function startServer() {
  // await mongoConnect();

  server.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  });
}

startServer();
