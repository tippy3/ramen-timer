$(function(){

var F = false;
var setTime = 0;
var timerId;

//Startボタンが押されたときの処理
function Timer(){
	if (F){
		stopTimer();
	} else {
		startTimer();
	}
}

//タイマー開始
function startTimer(){
	F = true;
	$("#startbutton").text("stop();");

	timerId = setInterval(function(){

		var time = getText();
		if (time<=0){
			finishTimer();
			return;
		}
		time--;
		reloadText(time);
		reloadGraph(time);

	},1000);
}

//タイマー停止
function stopTimer(){
	F = false;
	$("#startbutton").text("start();");
	clearInterval(timerId);
}

function resetTimer(){
	if (F){
		stopTimer();
	} else {
		setTime = 0;
	}
	reloadText(setTime);
	reloadGraph(setTime);
}

//数字を2桁表示に変換する
function str2(str){
	str = String(str);
	str = (str.length >= 2)? str : "0" + str;
	return str;
}

//テキストの取得
function getText(){
	var min = parseInt($("#m").text());
	var sec = parseInt($("#s").text());
	var time = min * 60 + sec;
	return time;
}

//テキストの更新
function reloadText(time){
	var min = Math.floor(time / 60);
	var sec = time % 60;
	$("#m").text(str2(min));
	$("#s").text(str2(sec));
}

//グラフの更新
function reloadGraph(time){
	var barLen = Math.floor(time/setTime*1000)/10;
	barLen = barLen + "%";
	$("#bar").css("width",barLen);
}

//１分足す
function plusMin(){
	var time = getText();
	time += 60;
	setTime += 60;
	reloadText(time);
}

//１０秒足す
function plusSec(){
	var time = getText();
	time += 10;
	setTime += 10;
	reloadText(time);
}

//タイマー終了
function finishTimer(){
	stopTimer();
}

	$("#min").click(plusMin);
	$("#sec").click(plusSec);
	$("#startbutton").click(Timer);
	$("#resetbutton").click(resetTimer);
});