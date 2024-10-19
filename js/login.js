var Loginform=document.getElementById('Loginform')
var email=document.getElementById('form3Example3')
var password=document.getElementById('form3Example4')
var allUsers=JSON.parse(localStorage.getItem('userData')) || []
Loginform.addEventListener('submit',function(event){
 event.preventDefault();
    var userFound=false
    console.log(email.value)
    console.log(password.value)






    // for(var i=0;i<allUsers.length;i++){
    //     if(allUsers[i].email !== email.value){
    //         Swal.fire({
    //                     icon: "error",
    //                     title: "Login failed for email",
                        
    //                   });
    //         break
    //     }
    //     else if(allUsers[i].password!== password.value){
    //         Swal.fire({
    //                     icon: "error",
    //                     title: "Login failed for password",
                        
    //                   });
    //         break
    //     }
        
    //     else if(allUsers[i].email===email.value && allUsers[i].password===password.value){
           
    //         Swal.fire("Login successfull");
    //         window.location.href='proj.html'
    //         break
    //     }
        
    //     }
    for(var i=0;i<allUsers.length;i++){
    if(allUsers[i].email === email.value && allUsers[i].password === password.value){
        userFound=true
    }
    }
    if(userFound){
       
        Swal.fire("Login successfull");
        
     window.location.href='proj.html'
    }
         
    else{
        Swal.fire({
            icon: "error",
            title: "Login failed",
            
          });
       
       
    }
    


});