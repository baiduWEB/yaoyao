/**
 * Created by Administrator on 2017/4/6.
 */
(function( window ){

    //写一个绑定事件函数
    function bind( obj , event , fn ){

        if( typeof  obj !== "object" || typeof fn !== "function" ){
            return;
        };
        var arg = Array.prototype.slice.call( arguments , 3 );

        if( obj.addEventListener ){
            obj.addEventListener( event , function(){
                fn.apply( obj , arg );
            } , false );
        }else{
            obj.attachEvent( "on"+event , function(){
                fn.apply( obj , arg );
            })
        };

    };

    //定义一个绑定事件的类
    function Event(){
        this.event = {};
    };

    //绑定事件
    Event.prototype.on = function( event , fn ){
        if( this.event[event] && typeof fn != "function" ){
            this.event[event].push( fn );
        }else{
            this.event[event] = [fn];
        }
    };

    //触发事件
    Event.prototype.emit = function( event ){
        var eventList = this.event[event];
        var arg = Array.prototype.splice.call( arguments , 1)

        for(var i=0; i<eventList.length; i++){
            eventList[i].apply( this , arg );
        }
    };

    //每一个表单绑定 验证对象
    window.$ = function( obj ){

        var id = document.querySelector( obj );

        if( id.getAttribute("formS") !== null ){
            return {
                form : function(){}
            };
        }else{
            id.setAttribute("formS", true)
            return new Form( id );
        }


    };

    //创建表单验证
    function Form( id ){

        //事件对象
        this.event = new Event();
        //表单ID
        this.id = id;
        //表单提交按钮
        this.subimit =  id.querySelector(".subimit button");

        //表单验证的一切依据 （）
        this.data = {
            //名称
            name : {

                name : "name", //名称
                submit : false, // 验证是否通过 true 为通过
                parent : this.id.querySelector(".name"), //父级
                ipt : this.id.querySelector(".name input"), //input
                text : this.id.querySelector(".name .promit"), // 提示文本
                hint : "必填，长度为4～16个字符",
                error : "名称不能为空(必填，长度为4～16个字符)",
                correct : "名称正确",
                reg : function( value ){
                    var value = value;
                    var len = 0;
                    var charCode = 0;

                    for(var i=0; i<value.length; i++ ){
                        charCode = value.charCodeAt( i );
                        if( charCode > 122 ){
                            len  = len + 2;
                        }else{
                            len ++;
                        }
                    };

                    if(  len > 16  || len < 4 || value === "" ){
                        return false;
                    }else{
                        return true;
                    }
                }
            },
            //密码
            passWord : {

                name : "passWord" , //名称
                submit : false, // 验证是否通过 true 为通过
                parent : this.id.querySelector(".passWord"), //父级
                ipt : this.id.querySelector(".passWord input"),
                text : this.id.querySelector(".passWord .promit"),
                hint : "必填 ， 长度为6～12位英文数字组合",
                error : "请填写正确的密码格式（长度为6～12位英文数字组合）",
                correct : "密码可用",
                reg : function( value ){
                    var reg = /^[\w]{6,12}$/;
                    if (value.match(reg) ){
                        return true;
                    }else{
                        return false;
                    }
                }

            },

            //确认密码
            isPassWord : {

                name : "isPassWord",
                submit : false, // 验证是否通过 true 为通过
                parent : this.id.querySelector(".isPassWord"), //父级
                ipt : this.id.querySelector(".isPassWord input"),
                text : this.id.querySelector(".isPassWord .promit"),
                hint : "再次输入相同密码",
                error : "两次输入密码不同",
                correct : "输入正确",
                reg : function( value , passWord){
                    console.log( value )
                    console.log( passWord )

                    if( value === passWord ){
                        return true;
                    }else{
                        return false;
                    }

                }

            },

            //邮箱
            email : {

                name : "email",
                submit : false, // 验证是否通过 true 为通过
                parent : this.id.querySelector(".email"), //父级
                ipt : this.id.querySelector(".email input"),
                text : this.id.querySelector(".email .promit"),
                hint : "请填写正确的邮箱地址",
                error : "邮箱格式错误",
                correct : "邮箱格式正确",
                reg : function( value ){
                    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    if( reg.test(value) ){
                        return true;
                    }else{
                        return false;
                    }
                }

            },

            //手机
            phone : {

                name : "phone",
                submit : false, // 验证是否通过 true 为通过
                parent : this.id.querySelector(".phone"), //父级
                ipt : this.id.querySelector(".phone input"),
                text : this.id.querySelector(".phone .promit"),
                hint : "请输入您的手机号码",
                error : "手机号码有误",
                correct : "手机号码正确",
                reg : function(value){
                    var reg = /^1\d{10}$/;
                    if( reg.test( value ) ){
                        return true;
                    }else{
                        return false;
                    }
                }

            }

        };

        //初始化
        this.init();
    };

    Form.prototype = {

        constructor : Form ,

        init : function (){

            var _this = this;
            var data = this.data;

            //所有input 绑定focus / blur事件
            for(var attr in data ){

                bind( data[attr].ipt , "focus" , this.focus , data[attr] );
                //验证密码的时候需要特殊处理，
                if( attr === "isPassWord" ){
                    bind( data[attr].ipt , "blur" , this.blur , data[attr] , data["passWord"] );
                }else{
                    bind( data[attr].ipt , "blur" , this.blur , data[attr] );
                };

            };

            this.id.onsubmit = function(){
                var off = true;

                for(var attr in data ){

                    var sub = data[attr].submit;

                    if( sub === false ){
                        _this.event.emit("submit" , sub , data[attr] );
                        return false;
                    }

                };

                _this.event.emit("submit" , sub , data );

            };

        },

        //聚焦事件
        focus : function( obj ){

            var text = obj.text,
                value = obj.ipt.value;
            //显示提示
            if( value === "" || !value ){
                text.innerHTML = obj.hint;
            }

        },

        //离焦事件
        blur : function( obj , passWord ){

            var text = obj.text,
                parent = obj.parent,
                value = obj.ipt.value;
            var reg;

            if( obj.name === "isPassWord" ){
                reg = obj.reg( value , passWord.ipt.value );
            }else{
                reg = obj.reg( value );
            };


            if( reg ){

                obj.submit = true;
                removeClass( parent , "red");
                addClass( parent , "green");
                text.innerHTML = obj.correct;

            }else{
                obj.submit = false;
                removeClass( parent , "green");
                addClass( parent , "red");
                text.innerHTML = obj.error;
            }

        },

        //form
        form : function( fn ){


            //绑定事件
            this.event.on("submit" , fn )

        }

    };

    /*
     7 , 移除class类名
     利用正则的方式 进行匹配删除
     */
    function removeClass( obj , getClass){
        var str = obj.className;
        var re = new RegExp('\\b\\s+'+getClass+'\|'+getClass+'\\s+\|'+getClass+'\\b', 'g' );
        str = str.replace( re , '' );
        return obj.className = str;
    };

    /*
     8 , 添加class类名
     分为俩种情况  一种就是如果它本身没有class的时候 和它本身有class的时候
     */
    function addClass(obj,className)
    {
        if(obj.className == '')
        {
            obj.className = className;
        }else
        {
            var arrClass = obj.className.split(' ');
            var numClass = arrClassName(arrClass,className);
            if(numClass == -1)
            {
                obj.className += ' '+className;
            };
        };
    };
    function arrClassName(arr,cn)
    {
        for(var i=0; i<arr.length; i++)
        {
            if(arr[i] == cn)
            {
                return 1;
            };
        };
        return -1;
    };


})(window);
