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

            var width = _this.settings.width;
            var height = _this.settings.height;
            var currentX = _this.settings.currentX;
            var currentY = _this.settings.currentY;
            var speed = 50;
            var rol = 90; //旋转犄角
            var angle = 0; //角度
            var div = document.querySelector(".moveBlock");

            //动作队列;
            var animate = [];

            function animation(){
                for(var i=0; i<animate.length; i++){
                    if( animate[i].name === "rotate" ){
                        div.style.transform = "rotate("+animate[i].value+"deg)";
                    }else{
                        div.style[ animate[i].name ] =  animate[i].value + "px";
                    }
                };
                animate = [];
            };

            //限制
            function xz( target , value ){

                if( currentX < 0 ){
                    currentX = 0 ;
                }else if( currentX > 450){
                    currentX = 450;
                };
                if( currentY < 0 ){
                    currentY = 0 ;
                }else if( currentY > 450){
                    currentY = 450;
                };
                if( value < 0 ){
                    value = 0 ;
                }else if( value > 450){
                    value = 450;
                }
                animate.push({
                    "name" : target,
                    "value" : value
                })
            }

            //键盘事件
            document.onkeydown = function( ev ){
                var ev = ev || event;

                var keyCode = ev.keyCode;

                if( keyCode === 37 ){
                    angle = angle - 90;
                    animate.push( {
                        "name" : "rotate",
                        "value" : angle
                    });
                }else if( keyCode === 38 ){
                    ev.preventDefault();
                    angle = angle + 0 ;
                }else if( keyCode === 39 ){
                    angle = angle + 90;
                    animate.push( {
                        "name" : "rotate",
                        "value" : angle
                    });
                }else if( keyCode === 40 ){
                    angle = angle + 180;
                    animate.push( {
                        "name" : "rotate",
                        "value" : angle
                    });
                    ev.preventDefault();
                };

                var num = ( angle % 360 + 360 ) % 360 / 90;

                if( num === 0 ){
                    currentY = currentY - speed;
                    xz( "top" , currentY );
                }else if( num === 1 ){
                    currentX =  currentX + 50;
                    xz( "left" , currentX );
                }else if( num === 2 ){
                    currentY = currentY + 50;
                    xz( "top" , currentY );
                }else if( num === 3 ){
                    currentX = currentX - 50;
                    xz( "left" , currentX );
                };

                animation();
            };

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
