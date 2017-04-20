/**
 * Created by Administrator on 2017/4/6.
 */
(function(){


    //写一个绑定事件函数
    function bind( obj , event , fn ){

        if( typeof  obj !== "object" || typeof fn !== "function" ){
            return;
        };

        if( obj.addEventListener ){
            obj.addEventListener( event , fn , false );
        }else{
            obj.attachEvent( "on"+event , function(){
                fn.call( obj , arguments );
            })
        };

    };

})(window);
