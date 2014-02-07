var port = 8000;
var serverUrl = "127.0.0.1";
 
var http = require("http");
var path = require("path");
var fs = require("fs");

var request = require("request");
 
console.log("Starting web server at " + serverUrl + ":" + port);
 
http.createServer( function(req, res) {
 
    var now = new Date();
 
    var filename = req.url || "index.html";
    var ext = path.extname(filename);
    var localPath = __dirname;
    var validExtensions = {
        ".html" : "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".json": "application/json",
        ".map": "application/javascript"
    };
    var isValidExt = validExtensions[ext];
 
    if (isValidExt) {
        
        localPath += filename;
        path.exists(localPath, function(exists) {
            if(exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, isValidExt);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });
 
    } else {
        console.log("Invalid file extension detected: " + ext);
    }

    if(req.url == "/saveMinimax") {

        console.log('testing');

    }


}).listen(port, serverUrl);
 
function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length);
            res.setHeader("Content-Type", mimeType);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}