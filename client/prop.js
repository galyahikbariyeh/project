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
class PropertyViewer {
    constructor() {
        this.apiUrl = 'http://localhost:5050/api/real';
        this.container = document.getElementById('properties-container');
        this.init();
    }

    async init() {
        this.showLoading();
        try {
            const properties = await this.fetchProperties();
            if (properties.length === 0) {
                this.showNoPropertiesMessage();
            } else {
                this.displayProperties(properties);
            }
        } catch (error) {
            this.showErrorMessage(error);
        }
    }

    async fetchProperties() {
        const response = await fetch(this.apiUrl);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'فشل في جلب البيانات من السيرفر');
        }

        return await response.json();
    }

    displayProperties(properties) {
        this.container.innerHTML = properties.map(property => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="property-card">
                    <div class="property-img-container">
                        <img src="http://localhost:5050/uploads/${property.image}" class="property-img" alt="${property.title}">
                    </div>
                    <div class="property-body">
                        <h5 class="property-title">${property.title}</h5>
                        
                        <p class="property-price"> Jod${property.price} </p>
                        <span class="property-type">${property.type}</span>
                        <button class="contact-btn mt-3">
                            <i class="fas fa-phone"></i>  Contact us
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showLoading() {
        this.container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">جاري التحميل...</span>
                </div>
                <p class="mt-3">جاري جلب البيانات...</p>
            </div>
        `;
    }

    showNoPropertiesMessage() {
        this.container.innerHTML = `
            <div class="alert alert-info text-center">
                <i class="fas fa-info-circle fa-2x mb-3"></i>
                <h4>لا توجد عقارات متاحة حالياً</h4>
                <p>سيتم إضافة عقارات جديدة قريباً</p>
            </div>
        `;
    }

    showErrorMessage(error) {
        this.container.innerHTML = `
            <div class="error-container">
                <i class="fas fa-exclamation-triangle fa-2x text-danger mb-3"></i>
                <h4>حدث خطأ في جلب البيانات</h4>
                <p class="text-muted">${error.message}</p>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    <i class="fas fa-sync-alt"></i> إعادة المحاولة
                </button>
            </div>
        `;
    }
}

// Initialize the PropertyViewer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PropertyViewer();
});