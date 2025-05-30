var userAPI_URL = 'http://127.0.0.1:5050/api/users';
//var token = sessionStorage.getItem('authToken');
async function getUsers(){
   
    try {
        var response = await fetch(userAPI_URL,{
            headers:{
                'Content-Type':'application/json',
                'Auth': token
            },
            method:'GET',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.message){
                
                alert('User not allowed')

             //  window.location.href='login1.html'
               return
           }
           else{
               alert('User logged in successfully')
           }
            
         
        })
    } 
    catch (error) {
        console.log(error)
        //alert('User not found')
       // window.location.href='login1.html'
    }
  
}

getUsers()
var API_URL = 'http://127.0.0.1:5050/api/real';

async function getProperties() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);

        const tbody = document.getElementById('tbody');
        if (!tbody) {
            console.error('Table body element not found');
            return;
        }

        tbody.innerHTML = '';

        data.forEach(property => {
            const tr = document.createElement('tr');
            
            const td1 = document.createElement('td');
            td1.textContent = property.title;
            tr.appendChild(td1);

            const td2 = document.createElement('td');
            td2.textContent = property.price;
            tr.appendChild(td2);

            const td3 = document.createElement('td');
            const img = document.createElement('img');
            img.src = `http://127.0.0.1:5050/uploads/${property.image}`;
            img.style.maxWidth = '100px';
            img.alt = property.title;
            td3.appendChild(img);
            tr.appendChild(td3);

            const tdType = document.createElement('td');
            tdType.textContent = property.type;
            tr.appendChild(tdType);

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching data');
    }
}

document.addEventListener('DOMContentLoaded', getProperties);