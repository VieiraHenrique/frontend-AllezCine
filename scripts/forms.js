const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
   loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});
   

const form = document.getElementById('form');
const goForm = document.querySelectorAll('.goForm');
console.log(goForm)

goForm.forEach((e)=>{
  e.addEventListener('click',()=>{
    console.log('clicked')
    form.style.display = 'flex';
  })
})
