/**
 * Created by Administrator on 2017/4/6.
 */
(function(){

    var doc = {

        nameIpt : document.querySelector("#name input"),
        nameBtn : document.querySelector("#name button"),
        namePro : document.querySelector("#name .promit"),

        ageIpt : document.querySelector("#age input"),
        ageBtn : document.querySelector("#age button"),
        agePro : document.querySelector("#age .promit"),

        jobIpt : document.querySelector("#job input"),
        jobBtn : document.querySelector("#job button"),
        jobPro : document.querySelector("#job .promit")

    };

    //button按钮添加事件
    bind( doc.nameBtn , "click" , name );
    bind( doc.ageBtn , "click" , age );
    bind( doc.jobBtn , "click" , job );

    //name验证 必填，长度为4～16个字符
    function name(){

        var value = doc.nameIpt.value;
        var len = 0;
        var charCode = 0;

        for(var i=0; i<value.length; i++ ){

            charCode = value.charCodeAt( i );
            if( charCode > 122 ){
                len  = len + 2;
            }else{
                console.log( len )
                len ++;
            }
        };

        if( len > 16  || value === "" ){
            document.querySelector("#name").className = "clear red"
            doc.namePro.style.display = "block";
        }else{
            document.querySelector("#name").className = "clear green"
            doc.namePro.style.display = "none";
        }

    };

    //age验证 姓名不能为空
    function age(){
        var value = doc.ageIpt.value;
        if( value === "" ){
            document.querySelector("#age").className = "clear red"
            doc.agePro.style.display = "block";
        }else{
            document.querySelector("#age").className = "clear green"
            doc.agePro.style.display = "none";
        }
    };

    //job 验证名称格式正确
    function job(){
        var value = doc.jobIpt.value;
        if( value === "" ){
            document.querySelector("#job").className = "clear red"
            doc.jobPro.style.display = "block";
        }else{
            document.querySelector("#job").className = "clear green"
            doc.jobPro.style.display = "none";
        }
    };

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