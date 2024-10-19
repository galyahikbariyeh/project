var userForm=document.getElementById('registerForm')
console.log(userForm)
var userName=document.getElementById('form3Example1cg')
var email=document.getElementById('form3Example3cg')
var password=document.getElementById('form3Example4cg')
var confirmPass=document.getElementById('form3Example4cdg')
var allUsers= JSON.parse(localStorage.getItem('userData'))||[]
var result=document.getElementById('result')
userForm.addEventListener('submit',function (event){
event.preventDefault()
console.log(userName.value)
console.log(email.value)
console.log(password.value)
console.log(confirmPass.value)

var userData=
{userName:userName.value,email:email.value,password:password.value,confirmPass:confirmPass.value}
console.log(allUsers)

if(password.value !== confirmPass.value){
    alert('password and confirm password are not the same')
        return
    }

allUsers.push(userData)
localStorage.setItem('userData',JSON.stringify(allUsers))

})
