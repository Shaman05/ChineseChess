/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-7-6
 * Time: 上午10:00
 * To change this template use File | Settings | File Templates.
 */


var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req, res){
    var filename = url.parse(req.url).pathname;
    console.log(filename);
    fs.readFile(__dirname + "/static/js/data.js", "utf8", function(err, content){
        if(!err){
            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            res.write(content);
            res.end();
        }
    })
    fs.readFile(__dirname + "/views/test.html", "utf8", function(err, content){
        if(!err){
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(content);
            res.end();
        }
    });
}).listen(8080, function(){
    console.log("server started");
})
