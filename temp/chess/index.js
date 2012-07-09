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
var path = require("path");
var mine = require("./mime");

http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname) || "unknow";
    fs.readFile(__dirname + pathname, "binary", function(err, content){
        if(!err){
            res.writeHead(200, {
                'Content-Type': mine.types[ext]
            });
            res.write(content,"binary");
            res.end();
        }
    });
}).listen(8080, function(){
    console.log("server started");
})
