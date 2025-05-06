/*var contactForm = document.getElementById('contactForm')
var API_URL='http://127.0.0.1:5050/api/createUser'
contactForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var name=document.getElementById('form3Example1cg').value
    var email=document.getElementById('form3Example3cg').value
    var phone=document.getElementById('form3Example4cg').value
    var password=document.getElementById('form3Example4cd').value
    var user={name,email,phone,password}
    console.log(user)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data.message)
        if(data.message=='User register in successfully'){
            alert('User  contact successfully')
           // 
            window.location.href='proj.html'
        }
      
    })
    console.log(response)
    
})*/
//for admin
/*var addForm = document.getElementById('addForm')
var API_URL='http://127.0.0.1:5050/api/login'
addForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var email=document.getElementById('email').value
    var password=document.getElementById('password').value
    var user={email,password}
    console.log(user)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.message=='User logged in successfully'){
            alert('User logged in successfully')
            sessionStorage.setItem('authToken',data.token)
            //comuserhome
             window.location.href='add.html'
        }
        else{

            alert('User not found')
        }
    })
    console.log(response)
    
})*/


// متغيرات عامة


 





