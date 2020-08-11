//获取节点
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');
const words = ['application','programming','hero','interface','wonder','minyeonisreal'];

let selectedWord = words[Math.floor(Math.random() * words.length)]
// console.log(selectedWord)

const correctLetters = [];
const wrongLetters = [];

// 显示单词函数
function showWord() {
  wordEl.innerHTML=`${selectedWord.split('').map(letter => 
      `<span class="letter">${correctLetters.includes(letter)? letter : ''}</span>` )
  .join("")}`
  const innerWord = wordEl.innerText.replace(/\n/g,"") // 去掉换行符
  if(innerWord == selectedWord) {
    finalMessage.innerText = '恭喜你答对了！ 嘿嘿';
    popup.style.display = 'flex' // 显示弹框
  }
  // console.log(wordEl.innerText, innerWord)
}
// 显示提示框
function showNotification() {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 3000)
}
// 更新错误单词
function updateWrongLetter () {
  // 显示错误字母
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>错误：</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)} 
  `
  // 显示火柴人
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length; // 获得错误的次数
    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  })
  // 显示弹出框
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "抱歉，你的机会用尽了"
    popup.style.display="flex"
  }
}
// 键盘事件监听
window.addEventListener('keydown', e => {
  // console.log(e.keyCode)
  if(e.keyCode >= 65 && e.keyCode <=90) {
    const letter = e.key; // 获得用户按下的字母
    if(selectedWord.includes(letter)) { // 如果
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        showWord();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetter();
      } else {
        showNotification();
      }
    }
  }
})

// 再玩一次
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);//清空

  selectedWord = words[Math.floor(Math.random() * words.length)];
  showWord();
  updateWrongLetter();
  popup.style.display="none";

})

showWord();