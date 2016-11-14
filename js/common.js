$(function(){

	//设置网页标题
	var titleName = "test" //明浩玻璃信息平台
	$("title").html(titleName);

	//加入收藏
	function AddFavorite(sURL, sTitle){
		sURL = encodeURI(sURL); 
		try{ 
			window.external.addFavorite(sURL, sTitle); 
		}
		catch(e){ 
			try{ 
				window.sidebar.addPanel(sTitle, sURL, ""); 
			}
			catch(e){ 
				alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
			} 
		}
	}
	$("#addFavorite").click(function(){
		AddFavorite('http:\/\/www.baidu.com','明浩玻璃')
	})

	//设为首页
	function SetHome(url){
		if (document.all){
			document.body.style.behavior='url(#default#homepage)';
			document.body.setHomePage(url);
		}
		else{
			alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
		}
	}
	$("#setHome").click(function(){
		SetHome('http:\/\/www.baidu.com')
	})

	//搜索框下拉选择
	$(".search .select").click(function(e){
		e.stopPropagation();
		$(this).addClass("selectOn");
		$(this).find("p").eq(0).hide();
		$(this).find(".list").show();

		$(this).find(".list p").click(function(e){
			e.stopPropagation();
			$(this).addClass("cur").siblings("p").removeClass("cur");
			$(".search .select").removeClass("selectOn");
			$(".search .select").find("p").eq(0).text($(this).text()).show();
			$(".search .select").find(".list").hide();
		})

		$("body").click(function(){
			$(".search .select").removeClass("selectOn");
			$(".search .select").find("p").eq(0).show();
			$(".search .select").find(".list").hide();
		})
	})

});

//News scroll
(function($){
	$.fn.extend({
	    Scroll:function(opt,callback){
	        if(!opt) var opt={};
	        var _btnUp = $("#"+ opt.up);
	        var _btnDown = $("#"+ opt.down);
	        var direct = opt.direct || "height"; //height width
	        if(direct !== "height" && direct !== "width") direct = "height";
	        var marginObj,marginInitObj;
	        var timerID;
	        var _this=this.eq(0).find("ul:first");
	        var     lineH=parseInt(_this.find("li:first").css(direct),10),  //width
	                line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), 
	                speed=opt.speed?parseInt(opt.speed,10):500; 
	                timer=opt.timer 

	        if(line==0) line=1;
	        var upHeight=0-line*lineH;

	        if(direct === "height"){
	        	marginObj = {marginTop:upHeight}
	        	marginInitObj = {marginTop:0}
	        }  
	        if(direct === "width"){
	        	marginObj = {marginLeft:upHeight} 
	        	marginInitObj = {marginLeft:0}
	        } 

	        var scrollUp=function(){
	                _btnUp.unbind("click",scrollUp); 
	                _this.animate(marginObj,speed,function(){
	                        for(i=1;i<=line;i++){
	                                _this.find("li:first").appendTo(_this);
	                        }
	                        _this.css(marginInitObj); //marginLeft
	                        _btnUp.bind("click",scrollUp); 
	                });
	        }

	        var scrollDown=function(){
	                _btnDown.unbind("click",scrollDown);
	                for(i=1;i<=line;i++){
	                        _this.find("li:last").show().prependTo(_this);
	                }
	                _this.css(marginObj); //marginLeft
	                _this.animate(marginInitObj,speed,function(){
	                        _btnDown.bind("click",scrollDown);
	                });
	        }

	        var autoPlay = function(){
	                if(timer)timerID = window.setInterval(scrollUp,timer);
	        };
	        var autoStop = function(){
	                if(timer)window.clearInterval(timerID);
	        };

	        _this.hover(autoStop,autoPlay).mouseout();
	        _btnUp.click( scrollUp ).hover(autoStop,autoPlay);
	        _btnDown.click( scrollDown ).hover(autoStop,autoPlay);

	    }       
	})
})(jQuery);