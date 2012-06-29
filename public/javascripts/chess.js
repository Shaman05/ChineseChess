/**
 * Created with JetBrains WebStorm.
 * User: chenD1
 * Date: 12-6-29
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */

//偏移量
var offset = {dx : 50, dy : 20};

//初始化棋盘
var paper = Raphael("map", 654, 660),
    map = paper.image("../images/chessMap.jpg", offset.dx, offset.dy, 554, 620),
    selectRect = paper.rect(0, 0, 62, 62).attr({
        "cursor" : "pointer",
        "stroke" : "red",
        "stroke-width" : 1,
        "stroke-opacity" : 0
    }),
    mouseMoveRect = paper.rect(0, 0, 62, 62).attr({
        "stroke" : "red",
        "stroke-width" : 1,
        "stroke-dasharray" : "- ",
        "stroke-opacity" : 0
    });

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
        style : {"cursor" : "pointer"}
    };

var baseLeft = offset.dx - po.common.size.width/2 + 15,
    baseTop = offset.dy - po.common.size.height/2 + 16;
    //黑棋初始化位置
    po.black = {
        zua    : {x : baseLeft + 65*0, y : baseTop + 65*3},
        zub    : {x : baseLeft + 65*2, y : baseTop + 65*3},
        zuc    : {x : baseLeft + 65*4, y : baseTop + 65*3},
        zud    : {x : baseLeft + 65*6, y : baseTop + 65*3},
        zue    : {x : baseLeft + 65*8, y : baseTop + 65*3},
        paol   : {x : baseLeft + 65*1, y : baseTop + 65*2},
        paor   : {x : baseLeft + 65*7, y : baseTop + 65*2},
        chel   : {x : baseLeft + 65*0, y : baseTop + 65*0},
        cher   : {x : baseLeft + 65*8, y : baseTop + 65*0},
        mal    : {x : baseLeft + 65*1, y : baseTop + 65*0},
        mar    : {x : baseLeft + 65*7, y : baseTop + 65*0},
        xiangl : {x : baseLeft + 65*2, y : baseTop + 65*0},
        xiangr : {x : baseLeft + 65*6, y : baseTop + 65*0},
        shil   : {x : baseLeft + 65*3, y : baseTop + 65*0},
        shir   : {x : baseLeft + 65*5, y : baseTop + 65*0},
        jiang  : {x : baseLeft + 65*4, y : baseTop + 65*0}
    }

    //红棋初始化位置
    po.red = {
        binga  : {x : baseLeft + 65*0, y : baseTop + 65*6},
        bingb  : {x : baseLeft + 65*2, y : baseTop + 65*6},
        bingc  : {x : baseLeft + 65*4, y : baseTop + 65*6},
        bingd  : {x : baseLeft + 65*6, y : baseTop + 65*6},
        binge  : {x : baseLeft + 65*8, y : baseTop + 65*6},
        paol   : {x : baseLeft + 65*1, y : baseTop + 65*7},
        paor   : {x : baseLeft + 65*7, y : baseTop + 65*7},
        chel   : {x : baseLeft + 65*0, y : baseTop + 65*9},
        cher   : {x : baseLeft + 65*8, y : baseTop + 65*9},
        mal    : {x : baseLeft + 65*1, y : baseTop + 65*9},
        mar    : {x : baseLeft + 65*7, y : baseTop + 65*9},
        xiangl : {x : baseLeft + 65*2, y : baseTop + 65*9},
        xiangr : {x : baseLeft + 65*6, y : baseTop + 65*9},
        shil   : {x : baseLeft + 65*3, y : baseTop + 65*9},
        shir   : {x : baseLeft + 65*5, y : baseTop + 65*9},
        shuai  : {x : baseLeft + 65*4, y : baseTop + 65*9}
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
    var piece = paper.image("../images/" + img, posit.x, posit.y, size.width, size.height).attr(po.common.style).data("type",this.type);;

    //绑定棋子点击事件
    piece.node.onclick = function(e){
        if(selStatus.operator == currentOperator){
            if( (selStatus.type != null) && (piece.data("type") != selStatus.type) ){
                paper.getById(selStatus.id).toFront().animate({
                    x : piece.attrs.x,
                    y : piece.attrs.y
                },300,function(){
                    piece.remove();
                    resetSelStatus();
                    currentOperator = currentOperator == "red" ? "black" : "red";
                    selStatus.operator = selStatus.operator == "red" ? "black" : "red";
                });
                return;
            }
            if( (!selStatus.selected && selStatus.id != piece.id) || (selStatus.selected && selStatus.id != piece.id) ){
                selectRect.attr({
                    x : piece.attrs.x,
                    y : piece.attrs.y,
                    "stroke-opacity" : 1
                });
                mouseMoveRect.attr({
                    x : piece.attrs.x,
                    y : piece.attrs.y,
                    "stroke-opacity" : 1
                });
                $(map.node).bind("mouseover", function(e){
                    $(this).bind("mousemove", function(e){
                        mouseMoveRect.attr({
                            x : e.pageX - $(this).offset().left + 15,
                            y : e.pageY - $(this).offset().top - 15
                        })
                    })
                })
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
        if(selStatus.selected){
            mouseMoveRect.attr({
                x : piece.attrs.x,
                y : piece.attrs.y
            });
        }else{
            //
        }
    }
    return piece;
}

//重置选棋方法
function resetSelStatus(){
    selectRect.attr({
        "stroke-opacity" : 0
    });
    mouseMoveRect.attr({
        "stroke-opacity" : 0
    })
    selStatus.selected = false;
    selStatus.id = 1;
    selStatus.type = null;
}