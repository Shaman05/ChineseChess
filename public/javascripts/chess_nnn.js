/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-29
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */

//棋子类
function _Pieces(data){
    this.name = data.name;
    this.type = data.type;
    this.x = data.posit.x;
    this.y = data.posit.y;
}

_Pieces.prototype.init = function(){
    var name = this.name,
        type = this.type,
        x = this.x,
        y = this.y;
    var prefix = type === "red" ? "red_" : "black_";
    var piece = map.image(DATA.pieces.img.url + prefix + name + ".png", x, y, DATA.pieces.realSize, DATA.pieces.realSize)
        .attr(DATA.style.pieces)
        .data("name",name)
        .data("type",type)
        .data("posit",{x : x, y : y});

    piece.node.onclick = function(){
       console.log(piece)
    }

    return piece;
}