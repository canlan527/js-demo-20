const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


function showError(input, massage) {
  const formControl = input.parentElement
  const small = formControl.querySelector('small')
  formControl.className = 'form-control error'
  small.innerText = massage
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

function checkEmail(input) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,5})$/
  if (reg.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, '邮箱格式错误')
  }
}

function checkRequire(inputArr) {
  inputArr.forEach(input => {
    // console.log(input.value)
    if(input.value.trim() === '') {
      showError(input, `${getKeyWords(input)}为必填项`)
    } else {
      showSuccess(input)
    }
  })
}

function getKeyWords (input) {   
  return input.placeholder.slice(3)
}

function checkLength (input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getKeyWords(input)}至少${min}个字符`)
  } else if(input.value.length > max) {
    showError(input, `${getKeyWords(input)}长度应在${max}个之内`)
  } else {
    showSuccess(input)
  }
}

function checkPasswordMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, '密码不匹配')
  } 
}

form.addEventListener('submit', function(e) {
  e.preventDefault()

  checkRequire([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 16)
  checkEmail(email)
  checkPasswordMatch(password, password2)
})