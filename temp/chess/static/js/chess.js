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
    this.index = data.index;
    this.posit = data.posit;
}

_Pieces.prototype.init = function(){
    var _self = this;
    var name = this.name,
        type = this.type,
        j = this.index.x,
        i = this.index.y,
        x = this.posit.x,
        y = this.posit.y;
    var prefix = type === "red" ? "red_" : "black_";
    var piece = map.image(DATA.pieces.img.url + prefix + name + ".png", x, y, DATA.pieces.realSize, DATA.pieces.realSize)
        .attr(DATA.style.pieces)
        .data("name",name)
        .data("type",type)
        .data("index",{x : j, y : i})
        .data("posit",{x : x, y : y});

    piece.node.onclick = function(){
        var sel = DATA.select;
        var index = piece.data("index");
        var curUnit = DATA.map.mapArr[index.y][index.x];

        if(!sel.id){
            curUnit.attr({
                "stroke-dasharray" : "",
                "stroke-opacity" : 1
            });
            sel.id = piece.id;
            sel.operator = _self.getType();
            return;
        }
        if(piece.id === sel.id){
            curUnit.attr({
                "stroke-dasharray" : "--",
                "stroke-opacity" : 0
            });
            sel.id = null;
            sel.operator = null;
            return;
        }
        if(piece.id !== sel.id){
            var lastIndex = map.getById(sel.id).data("index");
            var lastUnit = DATA.map.mapArr[lastIndex.y][lastIndex.x];
            lastUnit.attr({
                "stroke-dasharray" : "--",
                "stroke-opacity" : 0
            });
            curUnit.attr({
                "stroke-dasharray" : "",
                "stroke-opacity" : 1
            });
            sel.id = piece.id;
            sel.operator = _self.getType();
            return;
        }
    }

    return piece;
}

_Pieces.prototype.getType = function(){
    return this.type;
}