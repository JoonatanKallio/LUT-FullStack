const http = require("http");

http.createServer((req, res) => {
   // Write response
   res.write("Hello world");
   res.end();
}).listen(5000, () => console.log("server running on port 5000"))
