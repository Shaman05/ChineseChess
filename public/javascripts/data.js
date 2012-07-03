/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-7-3
 * Time: 上午12:36
 * To change this template use File | Settings | File Templates.
 */

var DATA = {
    map : {
        size : {
            width : 500,
            height : 550
        },
        offsetTop : 50,
        offsetLeft : 50,
        mapArr : []
    },
    pieces : {
        size : 50,
        realSize : 40,
        img : {
            url : '../public/images/',
            redPrefix : 'red_',
            blackPrefix : 'black_'
        },
        array : [
            ["black_che" , "black_ma"  , "black_xiang" , "black_shi" , "black_jiang" , "black_shi" , "black_xiang" , "black_ma"  , "black_che"],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            [null        , "black_pao" , null          , null        , null          , null        , null          , "black_pao" , null       ],
            ["black_zu"  , null        , "black_zu"    , null        , "black_zu"    , null        , "black_zu"    , null        , "black_zu" ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            ["red_bing"  , null        , "red_bing"    , null        , "red_bing"    , null        , "red_bing"    , null        , "red_bing" ],
            [null        , "red_pao"   , null          , null        , null          , null        , null          , "red_pao"   , null       ],
            [null        , null        , null          , null        , null          , null        , null          , null        , null       ],
            ["red_che"   , "red_ma"    , "red_xiang"   , "red_shi"   , "red_shuai"   , "red_shi"   , "red_xiang"   , "red_ma"    , "red_che"  ]

        ]
    },
    style : {
        stroke : {
            "stroke" : "black",
            "stroke-width" : .5,
            "fill" : "none"
        },
        backLayer : {
            "fill" : "none"
        },
        limit : {
            "fill" : "#d1bf9a",
            "stroke-opacity" : .5
        },
        text : {
            "stroke" : "#585040",
            "font-size" : 28,
            "font-family" : "黑体",
            "fill" : "none"
        },
        number : {
            "font-size" : 14
        },
        rectUnit : {
            "fill" : "#d1bf9a",
            "fill-opacity" : 0,
            "cursor" : "pointer",
            "stroke" : "green",
            "stroke-dasharray" : "--",
            "stroke-width" : .5,
            "stroke-opacity" : 0
        },
        pieces : {
            "cursor" : "pointer"
        }
    },
    text : {
        CH : "楚 河",
        HJ : "汉 界",
        Num : [
            ["1","2","3","4","5","6","7","8","9"],
            ["九","八","七","六","五","四","三","二","一"]
        ]
    },
    select : {
        operator : null,
        id : null
    }
};