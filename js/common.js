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

})