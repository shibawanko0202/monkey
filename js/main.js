"use strict"

const start = document.getElementById("start");
const monkey = document.getElementById("monkey");
const text = document.getElementById("text");
const forecast = document.getElementById("forecast");
const result = document.getElementById("result");
const monkeybord = document.getElementById("monkeybord");

// const letters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let play = false;
let time;
let start_time;

//ランダム打ち込み
function render_random(){
  let moji = text.value;
  let arr = [...moji];
  let ran = Math.floor(Math.random() * 26);
  //textに含まれる文字なら<span>で囲んで色付け
  if(arr.indexOf(letters[ran]) > -1){
    monkey.innerHTML += `<span>${letters[ran]}</span>`;
  } else {
    monkey.innerHTML += letters[ran];
  };
  result.textContent = `${monkey.textContent.length}文字 : ${conversion(Date.now() - start_time)}`;
  //常に下までスクロール
  monkeybord.scrollTop = monkeybord.scrollHeight;
  complete();
};

//文字の完成の見極め
function complete(){
  if(monkey.textContent.indexOf(text.value,(monkey.textContent.length - text.value.length)) > -1){
    stopped();
    let finish_time = Date.now();
    let result_time = finish_time - start_time;
    result.textContent = `${monkey.textContent.length}文字 : ${conversion(result_time)}で出来ました！`;
    monkey.classList.add("success");
    start.textContent = "もう一度";
  };
};

//ミリ秒を日時分秒に変換
function conversion(time){
  let r_time = time / 1000;
  let day = Math.floor(r_time / 86400);
  let hour = Math.floor(r_time % 86400 / 3600);
  let min = Math.floor(r_time % 3600 / 60);
  let sec = Math.ceil(r_time % 60);
  if(day > 0){
    return `${day}日${hour}時間${min}分${sec}秒`;
  } else if(hour > 0){
    return `${hour}時間${min}分${sec}秒`;
  } else if(min > 0){
    return `${min}分${sec}秒`;
  } else {
    return `${sec}秒`;
  };
};

//開始
function start_monkey(){
  play = true;
  time = setInterval(render_random,10);
  start_time = Date.now();
  start.textContent = "猿を止める";
  text.disabled = true;
};

//停止
function stopped(){
  play = false;
  clearInterval(time);
};

//入力していないとスタート出来ないように
text.addEventListener("input",()=>{
  if(text.value.length > 0){
    start.classList.remove("disabled");
    start.textContent = "猿にお願いする";
    //入力文字数に応じて必要時間等を計算して出力
    let f_word = letters.length ** text.value.length;
    let f_time = f_word * 10;
    forecast.textContent = `推定必要文字時間 : ${f_word}文字 : ${conversion(f_time)}`;
  } else {
    start.classList.add("disabled");
    start.textContent = "入力してください";
    result.textContent = "";
  };
});

//スタートボタン
start.addEventListener("click",()=>{
  if(monkey.classList.contains("success")){
    window.location.reload(false);
  } else if(!play){
    start_monkey();
  } else {
    stopped();
    start.textContent = "猿に再開させる";
  };
});

//Enterでもスタート出来るように
window.addEventListener("keydown",(e)=>{
  if((e.key === "Enter") && (text.value.length > 0)){
    start_monkey();
  };
});