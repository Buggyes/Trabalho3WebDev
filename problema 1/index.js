const url = 'https://dummy.restapiexample.com/api/v1/';
var editing = false;

document.addEventListener('DOMContentLoaded', function(){
    initEmployeeTable();
})

async function initEmployeeTable(){

}

async function getAllEmployees(){
    try{
    const response = await fetch(url+"employees",{
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect:"follow",
        referrerPolicy:"no-referrer"
    });
    return response.json();
    }catch(error){
        console.log(error);
    }
}

async function getEmployee(id){
    try{
        const response = await fetch(url+"employees/"+id,{
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect:"follow",
            referrerPolicy:"no-referrer"
        });
        return response.json();
        }catch(error){
            console.log(error);
        }
}

async function postEmployee(data = {}){
    try{
        const response = await fetch(url+"create",{
            method:"POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        })
        return response.json();
    }catch(error){
        console.log(error);
    }
}

async function putEmployee(id, data={}){
    try{
        const response = await fetch(url+"update/"+id,{
            method:"POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers:{
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });
        return response.json();
    }catch(error){
        console.log(error);
    }
}

async function deleteEmployee(id){
    try{
        const response = await fetch(url+"employee/"+id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });
        return response.json();
    }catch(error){
        console.log(error);
    }
}