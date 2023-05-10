const http = require("http");
const handleRequest = require("./router");

const server = http.createServer(handleRequest);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
