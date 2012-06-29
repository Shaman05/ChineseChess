/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-29
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */

//偏移量
var offset = {dx : 50, dy : 20};
var baseLeft = offset.dx - 31 + 15,
    baseTop = offset.dy - 31 + 16;

//初始化棋盘
var paper = Raphael("map", 654, 660),
    map = paper.image("../images/chessMap.jpg", offset.dx, offset.dy, 554, 620),
    selectRect = paper.rect(0, 0, 62, 62).attr({
        "cursor" : "pointer",
        "stroke" : "red",
        "stroke-width" : 1,
        "stroke-opacity" : 0
    });
var mapRect = [];
initRect();

//执棋方
var currentOperator = "red";

//选棋状态
var selStatus = {
    operator : "red",
    selected : false,
    id : 1,
    type : null
}

//棋子相关数据
var po = {};

    //公用属性
    po.common = {
        size : {width : 62, height : 62},
        style : {
            "cursor" : "pointer"
        }
    };

    //黑棋初始化位置
    po.black = {
        zua    : {x : 0, y : 3},
        zub    : {x : 2, y : 3},
        zuc    : {x : 4, y : 3},
        zud    : {x : 6, y : 3},
        zue    : {x : 8, y : 3},
        paol   : {x : 1, y : 2},
        paor   : {x : 7, y : 2},
        chel   : {x : 0, y : 0},
        cher   : {x : 8, y : 0},
        mal    : {x : 1, y : 0},
        mar    : {x : 7, y : 0},
        xiangl : {x : 2, y : 0},
        xiangr : {x : 6, y : 0},
        shil   : {x : 3, y : 0},
        shir   : {x : 5, y : 0},
        jiang  : {x : 4, y : 0}
    }

    //红棋初始化位置
    po.red = {
        binga  : {x : 0, y : 6},
        bingb  : {x : 2, y : 6},
        bingc  : {x : 4, y : 6},
        bingd  : {x : 6, y : 6},
        binge  : {x : 8, y : 6},
        paol   : {x : 1, y : 7},
        paor   : {x : 7, y : 7},
        chel   : {x : 0, y : 9},
        cher   : {x : 8, y : 9},
        mal    : {x : 1, y : 9},
        mar    : {x : 7, y : 9},
        xiangl : {x : 2, y : 9},
        xiangr : {x : 6, y : 9},
        shil   : {x : 3, y : 9},
        shir   : {x : 5, y : 9},
        shuai  : {x : 4, y : 9}
    }

//棋子类
function Pieces(type,name,options){
    this.type = type;
    this.name = name;
    this.options = options;
}

Pieces.prototype.create = function(){
    var posit = this.options,
        size = po.common.size;
    var img = this.type + "_" + this.name +".png";
    var piece = paper.image("../images/" + img, baseLeft + posit.x*65, baseTop + posit.y*65, size.width, size.height)
                        .attr(po.common.style)
                        .data("name",this.name)
                        .data("type",this.type)
                        .data("posit",{x : posit.x, y : posit.y});

    //绑定棋子点击事件
    piece.node.onclick = function(e){
        if(selStatus.operator === currentOperator){
            if( (selStatus.type != null) && (piece.data("type") != selStatus.type) ){
                paper.getById(selStatus.id).toFront().animate({
                    x : piece.attrs.x,
                    y : piece.attrs.y
                },300,function(){
                    var i = piece.data("posit").x,
                        j = piece.data("posit").y;
                    mapRect[j][i].attr({"stroke-opacity" : 0});
                    var oA = paper.getById(selStatus.id).data("posit").x + 1;
                    var oB = j - paper.getById(selStatus.id).data("posit").y > 0 ? j - paper.getById(selStatus.id).data("posit").y : paper.getById(selStatus.id).data("posit").y - j;
                    paper.getById(selStatus.id).data("posit",{
                        x : i,
                        y : j
                    });
                    var otype = paper.getById(selStatus.id).data("type"),
                        oname = paper.getById(selStatus.id).data("name");
                    $("<option>" + otype + ":" + oname + oA + "进" + oB + "</option>").prependTo($("#recode"));
                    piece.remove();
                    resetSelStatus();

                    //currentOperator = currentOperator == "red" ? "black" : "red";
                    //selStatus.operator = selStatus.operator == "red" ? "black" : "red";
                });
                return;
            }
            if( (!selStatus.selected && selStatus.id != piece.id) || (selStatus.selected && selStatus.id != piece.id) ){
                selectRect.attr({
                    x : piece.attrs.x,
                    y : piece.attrs.y,
                    "stroke-opacity" : 1
                });
                selStatus.selected = true;
                selStatus.id = piece.id;
                selStatus.type = piece.data("type");
                return;
            }
            resetSelStatus();
            $(map.node).unbind();
        }
    }

    //绑定棋子hover事件
    piece.node.onmouseover = function(){
        if(selStatus.selected && (piece.data("type") !== paper.getById(selStatus.id).data("type"))){
            var i = piece.data("posit").x,
                j = piece.data("posit").y;
            mapRect[j][i].attr({"stroke-opacity" : 1})
        }
    }
    piece.node.onmouseout = function(){
        var i = piece.data("posit").x,
            j = piece.data("posit").y;
        mapRect[j][i].attr({"stroke-opacity" : 0})
    }
    return piece;
}

//构建方阵
function initRect(){
    for(var i = 0 ; i < 10 ; i++){
        mapRect[i] = [];
        for(var j = 0 ; j < 9 ; j ++){
            var x = baseLeft + 65*j,
                y = baseTop + 65*i;
            var rect = paper.rect(x, y, 62, 62).attr({
                "fill" : "green",
                "fill-opacity" :.05,
                "stroke" : "red",
                "stroke-width" : 1,
                "stroke-dasharray" : "- ",
                "stroke-opacity" : 0
            });
            $(rect.node).data("posit",{
                x : j,
                y : i
            });
            mapRect[i].push(rect);
            rect.node.onmouseover = function(){
                if(selStatus.selected){
                    $(this)[0].style.strokeOpacity = 1;
                    $(this)[0].style.cursor = "pointer";
                }
            };
            rect.node.onmouseout = function(){
                $(this)[0].style.strokeOpacity = 0;
                $(this)[0].style.cursor = "default";
            };
            rect.node.onclick = function(){
                if(selStatus.selected){
                    var oA = paper.getById(selStatus.id).data("posit").x + 1;
                    var oB = $(this).data("posit").y - paper.getById(selStatus.id).data("posit").y > 0 ? $(this).data("posit").y - paper.getById(selStatus.id).data("posit").y : paper.getById(selStatus.id).data("posit").y - $(this).data("posit").y;
                    var otype = paper.getById(selStatus.id).data("type"),
                        oname = paper.getById(selStatus.id).data("name");
                    paper.getById(selStatus.id).toFront().animate({
                        x : $(this)[0].attributes.x.value,
                        y : $(this)[0].attributes.y.value
                    },300,function(){

                        $("<option>" + otype + ":" + oname + oA + "进" + oB + "</option>").prependTo($("#recode"));
                        resetSelStatus();
                        //currentOperator = currentOperator == "red" ? "black" : "red";
                        //selStatus.operator = selStatus.operator == "red" ? "black" : "red";
                    }).data("posit",{
                        x : $(this).data("posit").x,
                        y : $(this).data("posit").y
                    });
                }
            }
        }
    }
}

//重置选棋方法
function resetSelStatus(){
    selectRect.attr({
        "stroke-opacity" : 0
    });
    selStatus.selected = false;
    selStatus.id = 1;
    selStatus.type = null;
}