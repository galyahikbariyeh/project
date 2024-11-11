var userForm1=document.getElementById('registerForm')

var userName=document.getElementById('form3Example1cg')
var email=document.getElementById('form3Example3cg')


var phone =document.getElementById('form3Example4cg')
var allUsers=JSON.parse(localStorage.getItem('userData')) || []
var result=document.getElementById('result')
userForm1.addEventListener('submit',function (event){
    event.preventDefault()
    console.log(userName.value)
    console.log(email.value)
    console.log(phone.value)
    
    var p=false
    var userData=
    {userName:userName.value,email:email.value,phone:phone.value}
    console.log(allUsers)

   
        //    else if(!phone.match(/^[0-9]{10}$/)){
        //         alert('only digit')
        //         return 
        //     }
    if(phone.length !== 10){
    alert('wrong num')
        p=true
    }else{
        p=false
    }
   
    allUsers.push(userData)
    localStorage.setItem('userData',JSON.stringify(allUsers))
    
    })
// function validatePhone(){
//     var phone =document.getElementById('form3Example4cg').value;
//     if(phone.length == 0){
//         errorphone.innerHTML='phone  number is  required';
//         return false
//     }
//     if(phone.length !== 10){

//          errorphone.innerHTML='phone number should be  10  digits';
//     }
//     if(!phone.match(/^[0-9]{10}$/)){

//         errorphone.innerHTML='only digits';
//         return false
//     }
//     errorphone.innerHTML = '<i class="fas fa-check-circle></i>';
//     return true
// }
 


