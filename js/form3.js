/**
 * Created by Administrator on 2017/4/6.
 */
(function( window ){

        var data = {

            "北京" : ["城市大学" , "清华大学" , "北京大学" , "航天大学" , "矿质大学" , "外国语言大学"],
            "内蒙古" : ["师范大学" , "机电大学" , "医科院" , "地质大学" , "稀土工程" ],
            "海南" : ["海南大学" , "广厦大学" , "邮电大学" , "机电一体化" ]

        };

        var radio = document.querySelectorAll(".people input");
        var div = document.querySelectorAll(".tag>div");
        var select = document.querySelectorAll(".tag select");
        var city = document.querySelector("#city");
        var school = document.querySelector("#school");

        //初始化
        init();

        for(var i=0; i<radio.length; i++ ){
            radio[i].index = i;
            radio[i].onclick = function(){

                var index= this.index;

                div[0].style.display = "none";
                div[1].style.display = "none";
                div[index].style.display = "block";

            };
        };

    city.onchange = function(){

        school.innerHTML = "";

        var value = this.value;
        var option1 = document.createElement("option");

        option1.value = "请选择大学";
        option1.innerHTML = "请选择大学";
        school.appendChild( option1 )

        if( value !== "请选择城市" ){
            for( var i=0; i<data[value].length; i++){

                var option2 = document.createElement("option");
                option2.value = data[value][i];
                option2.innerHTML = data[value][i];
                school.appendChild( option2 )

            }
        };

    }

    function init(){

        radio[0].checked = true;
        div[0].style.display = "block";

        for(var attr in data ){
            var option = document.createElement("option");
            option.value = attr;
            option.innerHTML = attr;
            city.appendChild( option )
        };


    };



})(window);
