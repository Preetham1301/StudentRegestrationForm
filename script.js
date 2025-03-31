// Selecting elements
let studentname = document.querySelector('#sname');
let studentid = document.querySelector('#studentid');
let gmail = document.querySelector('#gmail');
let contact = document.querySelector('#mobile');
let registeredstudents = document.querySelector('#indexnumbers');
let button = document.querySelector('#submitbutton');

let editIndex = -1; // Track index for editing


function addvalue() {
    let datastore = JSON.parse(localStorage.getItem("studentInfo"));
    let studentData = {
        name: studentname.value,
        id: studentid.value,
        email: gmail.value,
        contact: contact.value
    }
    if (editIndex === -1) {
        datastore.push(studentData)
    } else {
        datastore[editIndex] = studentData;
        editIndex = -1;
        button.textContent = "submit";
    }

    localStorage.setItem("studentInfo", JSON.stringify(datastore));

    studentname.value = "";
    studentid.value = "";
    gmail.value = "";
    contact.value = "";

    loadValuesToTable();
}


function loadValuesToTable() {
    registeredstudents.innerHTML = " ";
    let datastore = JSON.parse(localStorage.getItem("studentInfo"));

    datastore.forEach((student, index) => {
        let row = document.createElement("tr")
        row.innerHTML = `
        <td> ${student.name}</td> 
        <td> ${student.id}</td>
        <td> ${student.email}</td>
        <td> ${student.contact}</td>
        <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        </td>`;

        registeredstudents.appendChild(row)
    });
}

function editStudent(index) {
    let datastore = JSON.parse(localStorage.getItem("studentInfo"));
    let student = datastore[index];

    studentname.value = student.name;
    studentid.value = student.id;
    gmail.value = student.email;
    contact.value = student.contact;

    editIndex = index;
    button.textContent = "update";

}

function deleteStudent(index) {
    let datastore = JSON.parse(localStorage.getItem("studentInfo"));
    datastore.splice(index, 1);
    localStorage.setItem("studentInfo", JSON.stringify(datastore));
    loadValuesToTable();
}


button.addEventListener("click", addvalue);

window.onload = loadValuesToTable;