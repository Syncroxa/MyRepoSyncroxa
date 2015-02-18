// Node Web Server
var http = require("http");
var fs = require("fs");
console.log("Starting");

var config = JSON.parse(fs.readFileSync("C:/Users/Skloa/Desktop/Windows Icons/config.json"));
var host = config.host;
var port = config.port;

var server = http.createServer(function(request, response) {
    console.log("Received Request" + request.url);

    fs.readFile("C:/Users/Skloa/Desktop/Windows Icons" + request.url, function(error, data) {
        if(error) {
            response.writeHead(404, { "Content-type": "text/plain" });
            response.end("Sorry the page was not fount");
        } else {
            response.writeHead(200, { "Content-type": "text/html" });
            response.end(data);
        }
    });
}).listen(port, host, function() {
    console.log("Listen : " + host + ":" + port);
});

fs.watchFile("C:/Users/Skloa/Desktop/Windows Icons/config.json", function(cur, prev) {
    config = JSON.parse(fs.readFileSync("C:/Users/Skloa/Desktop/Windows Icons/config.json"));
    host = config.host;
    port = config.port;
    server.close();

    server.listen(port, host, function() {
        console.log("Now Listen on : " + host + ":" + port);
    });
});

