//要素を取得//
const time = document.getElementById('time');
const Start = document.getElementById('Start');
const Stop = document.getElementById('Stop');
const Reset = document.getElementById('Reset');

//変数を用意//
let startTime; //ストップウォッチを開始した時の時刻//
let elapsedTime=0; //経過時間//
let intervalID; //カウントを停止する//

//経過時間の処理//
function displayTime() {
  const ms = elapsedTime%1000;
  const s = Math.floor(elapsedTime/1000)%60;
  const m = Math.floor(elapsedTime/(1000*60))%60;
  const h = Math.floor(elapsedTime/(1000*60*60));
 
  const msStr =ms.toString().padStart(1,'0');
  const sStr = s.toString().padStart(1,'0');
  const mStr = m.toString().padStart(1,'0');
  const hStr = h.toString().padStart(1,'0');
  time.textContent= `${hStr}:${mStr}:${sStr}:${msStr}`;
}

 //「スタート」をクリックした時の処
 //繰り返しの処理
Start.addEventListener('click',function() {  
  startTime = new Date(); //(1)スタートを押したときの時間を代入
  intervalID =setInterval(function() { 
  const currentTime = Date.now(); //(2)現在までの経過時間を代入
  elapsedTime += currentTime - startTime; //elapsedTime(経過時間)は、「(2)-(1)」の差分を加算していく

  //ボタンを押した時の挙動
  Start.disabled = true;
  Stop.disabled = false;
  Reset.disabled = false;
  startTime = Date.now();//スタートを押した時の時間に現在日時を代入　
  displayTime();//カウントしている時間を表示する
  },10);
});

 //「ストップ」をクリックした時の処理
Stop.addEventListener('click',function() {  
  Start.disabled = false;
  Stop.disabled = true;
  Reset.disabled = false;
  clearInterval(intervalID);//カウントを停止する
});


//「リセット」をクリックした時の処理//
Reset.addEventListener('click',function() {   
  Start.disabled = false;
  Stop.disabled = true;
  Reset.disabled = true;
  elapsedTime=0; //カウント初期化する
  time.textContent = '0:0:0:0'; //リセット時の時間を表示する
});