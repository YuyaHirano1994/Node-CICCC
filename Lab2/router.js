const fs = require("fs");

function handleRequest(req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <h1>Hello Node!</h1>
      <a href="http://localhost:8000/read-message">Read Message</a>
      <a href="http://localhost:8000/write-message">Write Message</a>
    `);
    res.end();
  } else if (req.url === "/read-message") {
    fs.readFile("message.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.write("Error reading file");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<p>${data}</p>`);
        res.end();
      }
    });
  } else if (req.url === "/write-message") {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <form method="POST" action="/write-message">
          <input type="text" name="message" placeholder="Enter your message" />
          <button type="submit">Submit</button>
        </form>
      `);
      res.end();
    } else if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const message = body.split("=")[1];
        fs.writeFile("message.txt", message, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("Error writing to file");
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("Message saved successfully");
            res.end();
          }
        });
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 Not Found</h1>");
    res.end();
  }
}

module.exports = handleRequest;
