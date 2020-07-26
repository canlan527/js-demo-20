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

function isValidEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,5})$/
  return reg.test(String(email))
}

form.addEventListener('submit', function(e) {
  e.preventDefault()
  if(username.value.trim() === "") {
    showError(username, "用户名为必填项")
  }else {
    showSuccess(username)
  }

  if(email.value.trim() === "") {
    showError(email, "邮箱为必填项")
  } else if(!isValidEmail(email.value)) {
    showError(email, '邮箱格式错误')
  } else {
    showSuccess(email)
  }

  if(password.value.trim() === "") {
    showError(password, "密码为必填项")
  }else {
    showSuccess(password)
  }

  if(password2.value.trim() === "") {
    showError(password2, "确认密码为必填项")
  }else {
    showSuccess(password2)
  }
})