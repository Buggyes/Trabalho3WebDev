const dbUrl = 'http://localhost:3000/employees';
var editing = false;
var beingEdited = 0;

document.addEventListener('DOMContentLoaded', function () {
    initEmployeeTable();
})

async function initEmployeeTable() {
    let empTable = document.getElementById("employeeTable");
    let emps = await getAllEmployees();
    for (let i = 0; i < emps.length; i++) {
        console.log(emps[i]);
        let tray = document.createElement('tr');
        tray.id = emps[i].id;
        let name = document.createElement('td');
        let nameTxt = document.createTextNode(emps[i].name);
        let salary = document.createElement('td');
        let salaryTxt = document.createTextNode(emps[i].salary);
        let age = document.createElement('td');
        let ageTxt = document.createTextNode(emps[i].age);
        let options = document.createElement('td');
        let editBtn = document.createElement('button');
        let editBtnText = document.createTextNode('Edit');
        let deleteBtn = document.createElement('button');
        let deleteBtnText = document.createTextNode('Delete');

        editBtn.addEventListener('click', async function () {
            if (editing == false) {
                editing = true;
                beingEdited = emps[i].id;
                let editTray = document.getElementById(emps[i].id);

                let nameInput = document.createElement('input');
                nameInput.setAttribute('type', 'text');
                nameInput.value = emps[i].name;
                nameInput.id = "nameInput" + emps[i].id;;
                editTray.cells[0].appendChild(nameInput);

                let salaryInput = document.createElement('input');
                salaryInput.setAttribute('type', 'number');
                salaryInput.value = emps[i].salary;
                salaryInput.id = "salaryInput" + emps[i].id;;
                editTray.cells[1].appendChild(salaryInput);

                let ageInput = document.createElement('input');
                ageInput.setAttribute('type', 'number');
                ageInput.value = emps[i].age;
                ageInput.id = "ageInput" + emps[i].id;;
                editTray.cells[2].appendChild(ageInput);

                nameTxt.remove();
                salaryTxt.remove();
                ageTxt.remove();

                editBtnText.remove();
                saveBtnText = document.createTextNode('Save');
                editBtn.appendChild(saveBtnText);
                deleteBtnText.remove();
                cancelBtnText = document.createTextNode('Cancel');
                deleteBtn.appendChild(cancelBtnText);
            }
            else if (editing == true && emps[i].id != beingEdited)
                location.reload()
            else {
                editing = false;

                let nameInput = document.getElementById("nameInput" + emps[i].id);
                let salaryInput = document.getElementById("salaryInput" + emps[i].id);
                let ageInput = document.getElementById("ageInput" + emps[i].id);

                let newName = nameInput.value;
                let newSalary = salaryInput.value;
                let newAge = ageInput.value;

                if(newAge < 18){
                    window.alert("O funcionário precisa ser maior de idade!");
                    editing = true;
                }
                else{
                    await putEmployee(emps[i].id,
                        {
                            id: emps[i].id,
                            name: newName,
                            salary: newSalary,
                            age: newAge
                        })
                    window.location.reload();
                }
            }
        });

        deleteBtn.addEventListener('click', async function () {
            if (editing == true) {
                window.location.reload();
            }
            else{
                let id = emps[i].id;
                let dTray = document.getElementById(id);
                dTray.remove();

                await deleteEmployee(id);
            }
        })

        name.appendChild(nameTxt);
        salary.appendChild(salaryTxt);
        age.appendChild(ageTxt);
        editBtn.appendChild(editBtnText);
        deleteBtn.appendChild(deleteBtnText);

        options.appendChild(editBtn);
        options.appendChild(deleteBtn);

        tray.appendChild(name);
        tray.appendChild(salary);
        tray.appendChild(age);
        tray.appendChild(options);

        empTable.appendChild(tray);
    }
}

async function addEmployee() {
    let name = document.getElementById("nameForm").value;
    let salary = document.getElementById("salaryForm").value;
    let age = document.getElementById("ageForm").value;

    if(age < 18)
        window.alert("O funcionário precisa ser maior de idade!");
    else{
        await postEmployee({ name: name, salary: salary, age: age })
        .then(
            window.location.reload()
        );
    }
}

async function getAllEmployees() {
    try {
        const response = await fetch(dbUrl, {
            method: "GET",
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
    } catch (error) {
        console.log(error);
    }
}

async function getEmployee(id) {
    try {
        const response = await fetch(dbUrl + "/" + id, {
            method: "GET",
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
    } catch (error) {
        console.log(error);
    }
}

async function postEmployee(data = {}) {
    try {
        const response = await fetch(dbUrl, {
            method: "POST",
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
    } catch (error) {
        console.log(error);
    }
}

async function putEmployee(id, data = {}) {
    try {
        const response = await fetch(dbUrl + "/" + id, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function deleteEmployee(id) {
    try {
        const response = await fetch(dbUrl + "/" + id, {
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
    } catch (error) {
        console.log(error);
    }
}