"use strict"

const text = document.getElementById("text");
const btn = document.getElementById("btn");
const forecast_word = document.getElementById("forecast_word");
const forecast_time = document.getElementById("forecast_time");
const result = document.getElementById("result");
const monkeybord = document.getElementById("monkeybord");
const monkeys = document.getElementsByClassName("monkey");

// const letters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let play = false;
let monkey_interval;
let start_time;
let total_time = 0;

//この文字数を越えたら新しい<p>へ移行(処理速度低減対策)
const word_rimit = 20;
//テキストの冊数
let current_monkey = 0;
//総文字数
let word_count = 0;

//タイプスピード(ミリ秒)
const interval_speed = 10;

//ランダム打ち込み
function render_random(){
  let moji = text.value;
  let arr = [...moji];
  let ran = Math.floor(Math.random() * 26);

  //textに含まれる(惜しい)文字なら<span>で囲んで色付け
  if(arr.indexOf(letters[ran]) > -1){
    monkeys[current_monkey].innerHTML += `<span>${letters[ran]}</span>`;

  } else {//かすりもしない文字の場合
    monkeys[current_monkey].innerHTML += letters[ran];

    //一定以上の文字数なら新しいボックスへ
    if(monkeys[current_monkey].textContent.length > word_rimit){

      //現在の文字数を総文字数へ追加
      word_count += monkeys[current_monkey].textContent.length;

      //新しい<p>を作り移行
      current_monkey++;
      const new_monkey = document.createElement("p");
      new_monkey.className = "monkey";
      monkeybord.appendChild(new_monkey);
    };
  };

  //現在の文字数と経過時間を表示
  result.textContent = `${monkeys[current_monkey].textContent.length + word_count}文字 : ${conversion(Date.now() - start_time + total_time)}`;

  //常に下までスクロール
  monkeybord.scrollTop = monkeybord.scrollHeight;
  complete();
};

//文字の完成の見極め
function complete(){
  if(monkeys[current_monkey].textContent.indexOf(text.value,(monkeys[current_monkey].textContent.length - text.value.length)) > -1){
    stopped();
    let result_time = Date.now() - start_time + total_time;
    result.textContent = `${monkeys[current_monkey].textContent.length + word_count}文字 : ${conversion(result_time)}で出来ました！`;
    btn.textContent = "もう一度";
    for(let i = 0;i < monkeys.length;i++){
      monkeys[i].classList.add("success");
    };
  };
};

//ミリ秒を日時分秒に変換
function conversion(time){
  let t = time / 1000;
  let day = Math.floor(t / 86400);
  let hour = Math.floor(t % 86400 / 3600);
  let min = Math.floor(t % 3600 / 60);
  let sec = Math.floor(t % 60);
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
  monkey_interval = setInterval(render_random,interval_speed);
  start_time = Date.now();
  btn.textContent = "猿を止める";
  text.disabled = true;
};

//停止
function stopped(){
  play = false;
  total_time += Date.now() - start_time;
  clearInterval(monkey_interval);
};

//入力していないとスタート出来ないように
text.addEventListener("input",()=>{
  if(text.value.length > 0){
    btn.classList.remove("disabled");
    btn.textContent = "猿にお願いする";
    text.value = check(text.value,letters);

    //入力文字数に応じて必要時間等を計算して出力
    let f_word = letters.length ** text.value.length;
    let f_time = f_word * interval_speed;
    forecast_word.textContent = ` ${f_word}文字`;
    forecast_time.textContent = ` ${conversion(f_time)}`;
  } else {
    btn.classList.add("disabled");
    btn.textContent = "入力してください";
    result.textContent = "何か入力して";
    forecast_word.textContent = "";
    forecast_time.textContent = "";
  };
});

//入力文字を判定と文字数によるコメント表示
function check(str,arr){
  let translate = "";
  for(let i = 0;i < str.length;i++){
    if(arr.includes(str[i])){
      translate += str[i];
      result.classList.remove("error");
      if(translate.length == 1){
        result.textContent = "一瞬で終わらせよう";
      } else if(translate.length == 2){
        result.textContent = "これは余裕ですね";
      } else if(translate.length == 3){
        result.textContent = "ちょっと時間下さい";
      } else if(translate.length == 4){
        result.textContent = "ホントにやります？";
      } else if(translate.length == 5){
        result.textContent = "考え直しましょう";
      } else if(translate.length == 6){
        result.textContent = "正気ですか？";
      } else {
        result.textContent = "( ;∀;)";
      };
    }else{
      result.textContent = "半角英字で入力して下さい";
      result.classList.add("error");
    };
  };
  return translate;
};

//スタートボタン
btn.addEventListener("click",()=>{
  if(monkeys[current_monkey].classList.contains("success")){
    window.location.reload(false);
  } else if(!play){
    start_monkey();
  } else {
    stopped();
    btn.textContent = "猿に再開させる";
  };
});

//Enterでもスタート出来るように
window.addEventListener("keydown",(e)=>{
  if((e.key === "Enter") && (text.value.length > 0)){
    start_monkey();
  };
});

//textにフォーカス
window.onload = text.focus();