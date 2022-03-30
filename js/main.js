"use strict"

const start = document.getElementById("start");
const monkey = document.getElementById("monkey");
const text = document.getElementById("text");
const elapsed_time = document.getElementById("elapsed_time");

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
  //惜しい文字を<span>で囲んで色付け
  if(arr.indexOf(letters[ran]) > -1){
    monkey.innerHTML += `<span>${letters[ran]}</span>`;
  } else {
    monkey.innerHTML += letters[ran];
  }
  kensaku();
};

//文字の完成の見極め
function kensaku(){
  // if(monkey.textContent.lastIndexOf(text.value) > -1){
  if(monkey.textContent.indexOf(text.value,(monkey.textContent.length - text.value.length)) > -1){
    stopped();
    let finish_time = Date.now();
    elapsed_time.textContent = `${(finish_time - start_time) / 1000}秒 : ${monkey.textContent.length}文字で出来ました！`;
    monkey.classList.add("success");
  };
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
  } else {
    start.classList.add("disabled");
    start.textContent = "入力してください";
  };
});

//スタートボタン
start.addEventListener("click",()=>{
  if(!play){
    play = true;
    time = setInterval(render_random,10);
    start_time = Date.now();
    start.textContent = "猿を止める";
    text.disabled = true;
  } else {
    stopped();
    start.textContent = "猿に再開させる";
  };
});