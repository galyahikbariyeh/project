/*var API_URL='http://127.0.0.1:5050/api/users'
var token= sessionStorage.getItem('authToken')



if(!token){
    window.location.href='login1.html'
}





async function getUsers(){
   
    try {
        var response = await fetch(API_URL,{
            headers:{
                'Content-Type':'application/json',
                'Auth': token
            },
            method:'GET',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.message =='you are not admin'){
                
                alert('User not allowed')

               window.location.href='login1.html'
               return
           }
           else{
               alert('User logged in successfully')
           }
            var tbody=document.getElementById('tbody')
             tbody.innerHTML=''
            data.map(property=>{
                console.log(property)
                var tr=document.createElement('tr')
                var td1=document.createElement('td')
                td1.innerHTML=property.title
                tr.appendChild(td1)

                var td2=document.createElement('td')
                td2.innerHTML=property.price
                tr.appendChild(td2)

                const td3 = document.createElement('td');
                const img = document.createElement('img');
                img.src = `http://127.0.0.1:5050/uploads/${property.image}`;
                img.style.maxWidth = '100px';
                td3.appendChild(img);
                tr.appendChild(td3);

                // تاريخ الإضافة
            const td4 = document.createElement('td');
            const date = new Date(property.createdAt);
            td4.textContent = date.toLocaleDateString();
            tr.appendChild(td4);

            // أزرار التحكم
            const td5 = document.createElement('td');
            
            // زر التعديل
            const updateButton = document.createElement('button');
            updateButton.className = 'btn btn-primary me-2';
            updateButton.textContent = 'تعديل';
            updateButton.setAttribute('data-bs-toggle', 'modal');
            updateButton.setAttribute('data-bs-target', '#editModal');
            updateButton.onclick = () => editProperty(property);
            td5.appendChild(updateButton);

            // زر الحذف
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = 'حذف';
            deleteButton.onclick = () => deleteProperty(property._id);
            td5.appendChild(deleteButton);

            tr.appendChild(td5);
            tbody.appendChild(tr);
            }

            )
         
        })
    } 
    catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='login1.html'
    }
  
}

getUsers()*/
var userAPI_URL = 'http://127.0.0.1:5050/api/users';
var token = sessionStorage.getItem('authToken');
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
            if(data.message =='you are not admin'){
                
                alert('User not allowed')

               window.location.href='login1.html'
               return
           }
           else{
               alert('User logged in successfully')
           }
            
         
        })
    } 
    catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='login1.html'
    }
  
}

getUsers()


var API_URL = 'http://127.0.0.1:5050/api/real';


if (!token) {
    window.location.href = 'login1.html';
}

async function getProperties() { 
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Auth': token 
            },
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);

        if (data.message === 'you are not admin') {
            alert('User not allowed');
            window.location.href = 'login1.html';
            return;
        }

        const tbody = document.getElementById('tbody');
        if (!tbody) {
            console.error('Table body element not found');
            return;
        }

        tbody.innerHTML = '';

        data.forEach(property => {
            const tr = document.createElement('tr');
            
            // عنوان العقار
            const td1 = document.createElement('td');
            td1.textContent = property.title;
            tr.appendChild(td1);

            // سعر العقار
            const td2 = document.createElement('td');
            td2.textContent = property.price;
            tr.appendChild(td2);

            // صورة العقار
            const td3 = document.createElement('td');
            const img = document.createElement('img');
            img.src = `http://127.0.0.1:5050/uploads/${property.image}`;
            img.style.maxWidth = '100px';
            img.alt = property.title;
            td3.appendChild(img);
            tr.appendChild(td3);
            //type//
           

            // تاريخ الإضافة
           /* const td4 = document.createElement('td');
            const date = new Date(property.createdAt);
            td4.textContent = date.toLocaleDateString();
            tr.appendChild(td4);*/

           
            const td5 = document.createElement('td');
            
            // زر التعديل
            const updateButton = document.createElement('button');
            updateButton.className = 'btn btn-primary me-2';
            updateButton.textContent = 'Update';
            updateButton.setAttribute('data-bs-toggle', 'modal');
            updateButton.setAttribute('data-bs-target', '#editModal');
            updateButton.onclick = () => editProperty(property);
            td5.appendChild(updateButton);

            // زر الحذف
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteProperty(property._id);
            td5.appendChild(deleteButton);

            tr.appendChild(td5);

            ///
            
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error('Error:', error);
        alert(' An error occured while fetching data ');
        window.location.href = 'login1.html';
    }
}

document.addEventListener('DOMContentLoaded', getProperties);





//delete 
async function  deleteProperty(id) {
    var conf= confirm('Are you sure you want delete this Realestate')
    console.log(conf)
    var DELET_URL='http://127.0.0.1:5050/api/deleteReal'
    if(conf){
      var response= await fetch(DELET_URL+"/"+id,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
                'Auth': token
        }
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.message == 'RealEstate delete successfully '){
            alert('RealEstate delete successfully')
            window.location.reload()
          
        }
        else{
            window.location.reload()
        }
       
      })
    }
    else{
      //do nothing
    }
      
    }
   ///////////
   //add
   async function addProperty() {
    const title = document.getElementById('addTitle').value;
    const price = document.getElementById('addPrice').value;
    const imageFile = document.getElementById('addImage').files[0];
  
    if (!title || !price || !imageFile) {
       alert('Please fill out all fields')
        return;
    }

   
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(imageFile.type)) {
        alert('Type of image JPEG  PNG');
        return;
    }

   
    if (imageFile.size > 2 * 1024 * 1024) {
     alert('The size of image at least 2MB')
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', imageFile);
   

    try {
        const response = await fetch('http://127.0.0.1:5050/api/createreal', { 
            method: 'POST',
            headers: {
                'Auth': token
            },
            body: formData
        });

        
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add property');
        }

       alert('Add successfully')
        $('#addModal').modal('hide');
        document.getElementById('addPropertyForm').reset();
        getProperties();
    } catch (error) {
        console.error('Error details:', error);
       
    }
}

/*var realToUpdate
async function editProperty(property) {
    realToUpdate = property
console.log(property._id)
var editTitle=document.getElementById('editTitle')
editTitle.value=property.title
var editPrice=document.getElementById('editPrice')
editPrice.value=property.price

}

var subUpdate=document.getElementById('editPropertyForm')
subUpdate.addEventListener('submit',async function(e){
    e.preventDefault()
    var title = document.getElementById('addTitle').value;
    var price = document.getElementById('addPrice').value;
   // var imageFile = document.getElementById('addImage').files[0];
   var id =realToUpdate._id
var property = {title,price}
 console.log(property,id)
 var res=await fetch('http://127.0.0.1:5050/api/updateReal'+"/"+id,{
    method:"PUT",
    headers:{
        'Content-Type':'application/json',
            'Auth': token
    },
    body:JSON.stringify(property)
 }).then(res=>res.json())
 .then(data=>{
    console.log(data)
    if(data.message == 'RealEstate update successfully'){
        alert('RealEstate update successfully')
        getProperties()
    }
    else{
        alert('realestate not found')
    }
 })

})*/
let realToUpdate = null;

async function editProperty(property) {
    realToUpdate = property;
    console.log('Editing property ID:', property._id);
    
    document.getElementById('editTitle').value = property.title;
    document.getElementById('editPrice').value = property.price;
}

document.getElementById('editPropertyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!realToUpdate) {
       alert('The property has not been identified')
        return;
    }

    const title = document.getElementById('editTitle').value;
    const price = document.getElementById('editPrice').value;
    const id = realToUpdate._id;

    if (!title || !price) {
      alert('Please fill out all fields')
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5050/api/updateReal/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            },
            body: JSON.stringify({ title, price })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message );
        }

        alert('RealEstate update successfully');
        getProperties();
        $('#editModal').modal('hide'); 
        return
    } catch (error) {
        console.error('Error:', error);
       
    }
});


/*var addPropertyForm=document.getElementById('addPropertyForm')
addPropertyForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    var title = document.getElementById('addTitle').value;
    var price = document.getElementById('addPrice').value;
    var imageFile = document.getElementById('addImage').files[0];
    var realestate={title,price,imageFile}
    console.log(realestate)

    var response= await fetch('http://127.0.0.1:5050/api/createreal',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(realestate),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data.message)
        if(data.message=='تمت الإضافة بنجاح'){
            alert('RealEstate added successfully')
           // 
          
        }
      
    })
    console.log(response)
    
})*/


