const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const submit = document.getElementById("submit");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// 设置虚拟交易数组
const dummyTransactions = [];


const localStorageTransac = JSON.parse(localStorage.getItem('transaction'));

let transaction = localStorage.getItem('transaction') !== null ? localStorageTransac : [];


function addTransaction (e) {
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('请输入交易金额');
  } else {
    const newTransac = {
      id:generateId(),
      text: text.value,
      amount: +amount.value // +类型转行
    }
    transaction.push(newTransac);
    addTransactionDOM(newTransac);
    updateValues();
    updateLocaStorage();

    text.value = "";
    amount.value = "";
  }
}

function generateId (id) {
  return Math.floor(Math.random() * 100000000)
}


// 添加 transactions交易到DOM list中
function addTransactionDOM(transaction) {
  // 获得金额的符号 知道这次交易是支出还是收入
  let sign = transaction.amount < 0 ? "-" : "+";
  
  // console.log(sign);
  // 创建 li 标签
  const item = document.createElement("li");
  // 基于金额正负添加对应类名
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransac(${transaction.id})">x</button>`;
  list.appendChild(item);
}

// 更新余额、收入、支出的金额
function updateValues() {
  // 通过map()返回交易金额数组
  const amount = transaction.map(ele => ele.amount)
  // console.log(amount)
  // reduce 得到余额
  const total = amount.reduce((acc, item) =>(acc += item), 0).toFixed(2);
  // console.log(total)
  // filter&reduce 得到收入 支出
  const income = amount.filter(ele => ele > 0).reduce((acc, item) => (acc+=item), 0).toFixed(2);
  const expense = (amount.filter(ele => ele < 0).reduce((acc, item) => (acc += item),0) * -1).toFixed(2);
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `${income}`;
  moneyMinus.innerText = `${expense}`;
}

// 删除
function removeTransac(id) {
  transaction = transaction.filter(ele => ele.id !== id);
  updateLocaStorage();
  init();
}


//本地存储
function updateLocaStorage() {
  localStorage.setItem('transaction', JSON.stringify(transaction));
}

// 初始化
function init () {
  list.innerHTML = "";
  transaction.forEach(addTransactionDOM);
  updateValues();
}
init();

// 事件监听
submit.addEventListener('submit', addTransaction)