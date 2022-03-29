"use strict"

const start = document.getElementById("start");
const monkey = document.getElementById("monkey");
const text = document.getElementById("text");

// const letters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let play = false;
let time;

function render_random(){
  let ran = Math.floor(Math.random() * 26);
  // console.log(ran)
  monkey.textContent += letters[ran];
  kensaku();
};

function kensaku(){
  if(monkey.textContent.lastIndexOf(text.value) > -1){
    stopped();
    monkey.classList.add("success");
  };
};

function stopped(){
  play = false;
  clearInterval(time);
}


start.addEventListener("click",()=>{
  if(!play){
    play = true;
    time = setInterval(render_random,100);
    start.textContent = "猿を止める"
    console.log(text.value);
  } else {
    stopped();
    start.textContent = "猿に再開させる"
  }
});


console.log(letters.length)