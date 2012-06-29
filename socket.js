/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-13
 * Time: 下午5:53
 * To change this template use File | Settings | File Templates.
 */

var socket = require('socket.io');

function socketStart(server){
    socket.listen(server).on('connection', function (socket) {
        var gc = {
            red : false,
            black : false
        }

        socket.on('select color', function(color){
            if(gc[color]){

                return;
            }
            gc[color] = true;
        })

        socket.on('ready', function(){

        })

        socket.on('disconnect', function(){
            console.log(socket.id + " has been disconnected!");
        })
    });
}

exports.socketStart = socketStart;