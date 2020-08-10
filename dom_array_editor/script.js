// 获取节点
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch random user and add money
// function getRandomUser() {
//   fetch('https://randomuser.me/api')
//     .then(res => res.json) 
//     .then(data => console.log(data))
// }

async function getRandomUser() {
  const res = await fetch('https://www.fastmock.site/mock/67928f1ded414f21ab8affc102156301/jsdemo/api/array_demo')
  const data = await res.json()
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random()  * 1000000)
  }
  addData(newUser)
}

getRandomUser()
getRandomUser()
getRandomUser()

// 添加随机生成的对象到 data 数组
function addData(obj) {
  data.push(obj)
  updataDom();
}
//更新节点
function updataDom (provideData = data) {
  // clear maiin
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
  provideData.forEach(ele => {
    const elemDom = document.createElement('div');
    elemDom.classList.add('person');
    elemDom.innerHTML = `<strong>${ele.name}</strong> <span>${fomatDollars(ele.money)}</span>`
    main.appendChild(elemDom)
  })
}
// 转换货币合适
function fomatDollars(money) {
  money = '$'+ money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  return money
}

// 资金翻倍
function doubleMoney() {
  data = data.map(user =>{
    return{...user, money:user.money * 2}
  })
  updataDom()
}
// 排序
function sortRich() {
 data.sort((a, b) => b.money -a.money) 
  updataDom()
}
// 查询百万富翁
function showMillon () {
  data = data.filter(ele => ele.money > 1000000)
  updataDom()
}
// 计算求和
function calcFn () {
  const wealth = data.reduce((acc, ele) => {
    return acc += ele.money
  }, 0)
  const wealthElem = document.createElement('div');
  wealthElem.innerHTML = `<h3>Total Wealth: ${fomatDollars(wealth)}</h3>`
  main.appendChild(wealthElem)
}
// 事件监听
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortRich)
showMillionairesBtn.addEventListener('click', showMillon)
calculateWealthBtn.addEventListener('click', calcFn)