require("dotenv").config();
const server = require("./src/app");
const { connection } = require("./src/database.config");
const PORT = process.env.PORT;

server.listen(PORT, () => {
  connection.sync({ force: false });
  console.log(`Listening on port ${PORT}`);
});
