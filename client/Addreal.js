/*var API_URL='http://127.0.0.1:5050/api/users'
var token= sessionStorage.getItem('authToken')



if(!token){
    window.location.href='add.html'
}
function init() {
   
    
    
   
    propertyForm.addEventListener('submit', handleAddProperty);
    refreshBtn.addEventListener('click', fetchProperties);
}

async function handleAddProperty(e) {

    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];
    
    if (!title || !price || !imageFile) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', image);
    
    try {
        const response = await fetch('http://localhost:5050/api/createReal', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Auth': token
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('تم إضافة العقار بنجاح');
            propertyForm.reset();
            fetchProperties();
        } else {
            alert(data.message || 'خطأ في إضافة العقار');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    }
}

// جلب قائمة العقارات
async function fetchProperties() {
    try {
        const response = await fetch('http://localhost:5000/api/real');
        const data = await response.json();
        
        if (response.ok) {
            displayProperties(data);
        } else {
            alert('خطأ في جلب العقارات');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ أثناء الاتصال بالخادم');
    }
}

// عرض العقارات في الصفحة
function displayProperties(properties) {
    propertiesList.innerHTML = '';
    
    if (properties.length === 0) {
        propertiesList.innerHTML = '<p>لا توجد عقارات متاحة</p>';
        return;
    }
    
    properties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        
        propertyCard.innerHTML = `
            <h4>${property.title}</h4>
            <p><strong>السعر:</strong> ${property.price} ريال</p>
            <img src="http://localhost:5000${property.imageUrl}" alt="${property.title}">
        `;
        
        propertiesList.appendChild(propertyCard);
    });
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', init);*/
/*var API_URL = 'http://127.0.0.1:5050/api/real';
var token = sessionStorage.getItem('authToken');


// التحقق من وجود token
if (!token) {
    window.location.href = 'login1.html'; // توجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك token
}

// دالة جلب العقارات
async function getProperties() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                Auth:token // تغيير من 'Auth' إلى 'Authorization'
            },
            method: 'GET',
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
    

        

        // عرض العقارات في الجدول
        const tbody = document.getElementById('tbody');
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
        })
    }

     catch (error) {
        console.error('Error:', error);
        alert(error.message);
        window.location.href = 'login1.html';
    }
}

// دالة حذف العقار
async function deleteProperty(id) {
    if (!confirm('هل أنت متأكد من حذف هذا العقار؟')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                Auth:token
            },
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'حدث خطأ أثناء الحذف');
        }

        alert('تم حذف العقار بنجاح');
        getProperties(); // تحديث القائمة

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// دالة تعديل العقار
async function editProperty(property) {
    // ملء نموذج التعديل بالبيانات الحالية
    document.getElementById('editPropertyId').value = property._id;
    document.getElementById('editTitle').value = property.title;
    document.getElementById('editPrice').value = property.price;
    // يمكنك إضافة المزيد من الحقول حسب الحاجة
}

// دالة حفظ التعديلات
async function saveEdit() {
    const id = document.getElementById('editPropertyId').value;
    const title = document.getElementById('editTitle').value;
    const price = document.getElementById('editPrice').value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Auth:token
            },
            method: 'PUT',
            body: JSON.stringify({ title, price })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'حدث خطأ أثناء التعديل');
        }

        alert('تم تعديل العقار بنجاح');
        $('#editModal').modal('hide'); // إغلاق المودال باستخدام jQuery إذا كنت تستخدم Bootstrap
        getProperties(); // تحديث القائمة

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// دالة إضافة عقار جديد
async function addProperty() {
    const formData = new FormData();
    formData.append('title', document.getElementById('addTitle').value);
    formData.append('price', document.getElementById('addPrice').value);
    formData.append('image', document.getElementById('addImage').files[0]);

    try {
        const response = await fetch(API_URL, {
            headers: {
                Auth:token
                // لا تضيف Content-Type هنا، سيتم ضبطه تلقائياً لـ FormData
            },
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'حدث خطأ أثناء الإضافة');
        }

        alert('تم إضافة العقار بنجاح');
        $('#addModal').modal('hide'); 
        document.getElementById('addPropertyForm').reset(); 
        getProperties();

    } catch (error) {
        console.log(error)
        alert('User not found')
        window.location.href='login1.html'
    }
}


document.addEventListener('DOMContentLoaded', getProperties);*/












