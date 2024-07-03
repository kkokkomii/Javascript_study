//랜덤 번호 지정
//유저가 번호 입력. GO 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 Down!
//랜덤번호 > 유저번호 Up!
//Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가, 버튼이 disable
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 꺾지 않는다


let random_num = 0

let PlayButton = document.getElementById("play_button")
let resetButton = document.getElementById('Reset_button')
let showAnswer = document.getElementById("answer_button")


let UserId = document.getElementById("user_id")
let result = document.getElementById("result_area")
let chanceNum = document.getElementById("chance_area")
let historyNum = document.getElementById("history_area")

let chances = 3
let gameover = false

let history = []

PlayButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
showAnswer.addEventListener("click", show_answer)
UserId.addEventListener("focus", function(){UserId.value=""})


function pickRandomNumber(){
  random_num = Math.floor(Math.random()*100)+1
  console.log("정답" + random_num)
}

function play(){
  let userValue = UserId.value
  //유효성 검사

  if(userValue <1 || userValue >100){
    result.textContent = "1과 100 사이 숫자를 입력해 주세요"
    return;
  }
  if(history.includes(userValue)==true){
    result.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
    return;
  }
  chances --;
  chanceNum.textContent = `남은 횟수 : ${chances} 번`

  if(userValue < random_num){
    result.textContent = "UP!!!!!"
    result.style.color = "red";

  }else if(userValue > random_num){
    result.textContent = "Down!!!!!"
    result.style.color = "grey";

  }else if(userValue == random_num){
    result.textContent = "굿굿 정답입니다"
    gameover = true
  }

  history.push(userValue)

  if(userValue != random_num && chances == 0){
    gameover = true
  }

  if(gameover == true){
    if(userValue == random_num){
      PlayButton.disabled = true
      result.textContent = "정답입니다!!!!"
      result.style.color = "pink";
    }else if(chances == 0){
      PlayButton.disabled = true
      result.textContent = "게임오버!!!!"
      result.style.color = "black";
  
    }


  }
  historyNum.textContent = `지금까지 입력한 숫자입니다 : ${history} `
}
  

function show_answer(){
  showAnswer.textContent = `정답 : ${random_num}`
}

function reset(){
  //user input 창이 깨끗하게 정리되고
  //새로운 번호가 생성되고
  UserId.value = ""
  pickRandomNumber()
  PlayButton.disabled = false
  chances = 3
  chanceNum.textContent = `남은 기회 : ${chances} 번`
  result.textContent = "처음부터 다시 시작합니다"
  showAnswer.textContent = `정답을 확인하려면 눌러주세요`
  history = []
  historyNum.textContent = `지금까지 입력한 숫자입니다 `
}

pickRandomNumber()
