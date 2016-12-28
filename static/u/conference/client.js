 var isAdmin = 0;	//全局变量，0表示不在管理员时间，1表示管理员消息正在显示
 var t;		//用于管理员事件的记时
 //连接websocket后端服务器
socket = io('https://wall.cgcgbcbc.com');

//作为刷新时需要获取前三条历史消息
$.get("https://wall.cgcgbcbc.com/api/messages?num=3",function(arr){
	

	var username1 = document.getElementById('username1');
	var username2 = document.getElementById('username2');
	var username3 = document.getElementById('username3');
	username1.innerHTML=arr[2].nickname;
	username2.innerHTML=arr[1].nickname;
	username3.innerHTML=arr[0].nickname;
	
	var text1 = document.getElementById('text1');
	var text2 = document.getElementById('text2');
	var text3 = document.getElementById('text3');
	text1.innerHTML=arr[2].content;
	text2.innerHTML=arr[1].content;
	text3.innerHTML=arr[0].content;
	
	var img1 = document.getElementById('img1');
	var img2 = document.getElementById('img2');
	var img3 = document.getElementById('img3');
	img1.setAttribute("src","loading.gif");		//先从本地加载一张loading中的图片，如果头像没有加载出来会先显示这张。
	img1.setAttribute("src",arr[2].headimgurl);
	img2.setAttribute("src","loading.gif");		//同上
	img2.setAttribute("src",arr[1].headimgurl);
	img3.setAttribute("src","loading.gif");		//同上
	img3.setAttribute("src",arr[0].headimgurl);
});



var win = window.open('http://b.com/bar');
win.postMessage('Hello, bar!', 'http://b.com'); 
// URL: http://b.com/bar
window.addEventListener('message',function(event) {
    console.log(event.data);
});


//当获得一个新的消息时进行相应
socket.on('new message',function(obj){
	//$("#img3").removeClass("bigger-animation");
	//debugger;
	var username1 = document.getElementById('username1');
	var username2 = document.getElementById('username2');
	var username3 = document.getElementById('username3');
	var temp = $("#username2").text();
	if(isAdmin == 0){username1.innerHTML=temp;}
	temp = $("#username3").text();
	username2.innerHTML=temp;
	username3.innerHTML=obj.nickname;
	
	var text1 = document.getElementById('text1');
	var text2 = document.getElementById('text2');
	var text3 = document.getElementById('text3');
	var temp = $("#text2").text();
	if(isAdmin == 0){text1.innerHTML=temp;}
	temp = $("#text3").text();
	text2.innerHTML=temp;	
	text3.innerHTML=obj.content;
	
	temp=$("#img2").attr("src");
	if(isAdmin == 0){$("#img1").attr("src",temp);}
	temp=$("#img3").attr("src");
	$("#img2").attr("src",temp);
	temp=obj.headimgurl;
	var img3 = document.getElementById('img3');
	img3.setAttribute("src","loading.gif");
	$("#img3").attr("src",temp);
	//debugger;
	//$("#img3").addClass("bigger-animation");
	$("#img3").animate({width:"50%"},400).animate({width:"100%"},400);
});

//监听管理员
socket.on('admin',function(obj){
	
	
	if(isAdmin == 0){
		isAdmin = 1;
		var username1 = document.getElementById('username1');
		username1.innerHTML="admin";	//更换显示的管理员名称
		$("#img1").attr("src","admin.jpg");	//更换显示的管理员头像
		var text1 = document.getElementById('text1');
		text1.innerHTML = obj.content;
		var message1 = document.getElementById('message1');
		message1.setAttribute("style","background-color:#6097BF");
		var ttext = document.getElementById("div-t1");
		ttext.setAttribute("style","color:#C81FD5");
		t=setTimeout("finishAdmin()",10000);
	}
	else if(isAdmin == 1){
		clearTimeout(t);
		var text1 = document.getElementById('text1');
		text1.innerHTML = obj.content;
		t=setTimeout("finishAdmin()",10000);
	}
});

function finishAdmin(){
	isAdmin = 0;
	
	$.get("https://wall.cgcgbcbc.com/api/messages?num=3",function(arr){
	
	var username1 = document.getElementById('username1');
	username1.innerHTML=arr[2].nickname;
	
	var text1 = document.getElementById('text1');
	text1.innerHTML=arr[2].content;
	
	var img1 = document.getElementById('img1');
	img1.setAttribute("src",arr[2].headimgurl);
	
	var message1 = document.getElementById('message1');
		message1.setAttribute("style","background-color:gray");
	var ttext = document.getElementById("div-t1");
		ttext.setAttribute("style","color:black");
	});
}

