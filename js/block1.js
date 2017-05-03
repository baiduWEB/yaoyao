/**
 * Created by Administrator on 2017/4/6.
 */
(function( window ){

    //生成XY轴
    function lineX(id , length , target , size){

        var className;
        var div;
        if( target === "left" ){
            className = "lineY";
        }else{
            className = "lineX";
        }

        for(var i=0; i<length; i++ ){

            div = document.createElement("div");
            div.className = className;
            div.style[target] = i*size + "px";
            id.appendChild( div );

        }

    };

    //生成坐标值
    function coordinate( id , width , height , target , size ){

        var className;
        var len = width/size;
        var ul = document.createElement("ul");

        if( target === "left" ){
            ul.className = "coordinateX";
        }else{
            ul.className = "coordinateY";
        };

        for(var i=0; i<len; i++){

            var li = document.createElement("li");
            li.innerHTML = i+1;

            ul.appendChild( li );
        }

        id.appendChild( ul );

    };

    //生成方块
    function createBlock( id , width , height , left , top ){

        var div = document.createElement("div");
        div.className = "moveBlock";
        div.style.left = left + "px";
        div.style.top = top + "px";
        div.style.transform = "rotate(0deg)";
        id.appendChild( div );

    }




    function Block( data ){

        this.settings = {};
        this.settings["id"] = data.id; //iD
        this.settings["size"] = data.size; //方块大小
        this.settings["width"] = data.width //盒子宽
        this.settings["height"] = data.height //盒子高
        this.settings["lengthX"] = data.width / data.size + 1; //X轴多少条线
        this.settings["lengthY"] = data.height / data.size + 1; //X轴多少条线
        this.settings["currentX"] = data.currentX; //方块当前位置
        this.settings["currentY"] = data.currentY; //方块当前位置
        this.settings["target"] = "top"; //方向

        //初始化
        this.init();

    };

    Block.prototype = {

        constructor : Block,

        //初始化
        init : function(){

            var _this = this;

            //创建UI
            this.ui();

            //键盘事件
            document.onkeydown = _this.keydown;

        },

        keydown : function( ev ){

            var rol = 90;
            arguments.callee["angle"] = !arguments.callee["angle"] ? 0 : arguments.callee["angle"] ;
            arguments.callee["index"] = !arguments.callee["index"] ? 0 : arguments.callee["index"];
            var div = document.querySelector(".moveBlock");
            var x = div.offsetLeft;
            var y = div.offsetTop;

            var keyCode = ev.keyCode;
            var num = ( arguments.callee["angle"] % 360 + 360 ) % 360 / 90;

            if( keyCode === 37 ){
                arguments.callee["index"] --;

            }else if( keyCode === 38 ){
                arguments.callee["index"] += 0 ;
                if( num === 0 ){
                    y = y - 50;
                }else if( num === 1 ){
                   x =  x + 50;
                }else if( num === 2 ){
                    y = y + 50;
                }else if( num === 3 ){
                    x = x - 50
                };

                if( x < 0 ){
                    x = 0;
                }else if(x > 450 ){
                    x = 450
                };

                if( y < 0 ){
                    y = 0 ;
                }else if( y > 450){
                    y = 450;
                }

                div.style.left = x + "px";
                div.style.top = y + "px";


            }else if( keyCode === 39 ){
                arguments.callee["index"] ++;

            }else if( keyCode === 40 ){
                arguments.callee["index"] += 2;

            }else{
                return;
            };


            arguments.callee["angle"] = arguments.callee["index"] * rol;
            div.style.transform = "rotate("+arguments.callee["angle"]+"deg)";

        },

        //UI
        ui : function(){

            var _this = this;
            //生成X轴线
            lineX( _this.settings.id , _this.settings.lengthX , "left" , _this.settings.size );

            //生成Y轴线
            lineX( _this.settings.id , _this.settings.lengthY , "top" , _this.settings.size );

            //生成X轴坐标
            coordinate( _this.settings.id , _this.settings.width , _this.settings.height , "left" , _this.settings.size );

            //生成Y轴坐标
            coordinate( _this.settings.id , _this.settings.width , _this.settings.height , "top" , _this.settings.size );

            //创建方块
            createBlock ( _this.settings.id  , 50 , 50 , _this.settings.currentX , _this.settings.currentY )

        }

    };



    var data = {

        id : document.querySelector("#block"),
        width : 500, //盒子宽
        height : 500, //盒子高
        currentX : 250, //方块位置
        currentY : 250, //方块位置
        size : 50 //方块大小

    };

    var block = new Block( data );




})(window);
