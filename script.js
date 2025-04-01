// Selecting elements
let studentname = document.querySelector('#sname');
let studentid = document.querySelector('#studentid');
let gmail = document.querySelector('#gmail');
let contact = document.querySelector('#mobile');
let registeredstudents = document.querySelector('#indexnumbers');
let button = document.querySelector('#submitbutton');
let namePattern = /^[A-Za-z\s]+$/;
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let editIndex = -1; // Track index for editing


function addvalue() {
    if (studentname.value === "" || studentid.value === "" || gmail.value === "" || contactNumber.value === "") {
        alert(`Oops! Please fill out all fields.`);
        return;
    }

    if (studentID.value.length > 5) {
        alert(`The student ID should be less than 5 digits.`);
        return;
    }
    if (!namePattern.test(studentname)) {
        alert("Invalid Name: Only alphabets and spaces allowed!");
        event.preventDefault(); // Stop form submission
    }

    if (!emailPattern.test(gmail)) {
        alert("Invalid Email: Enter a valid email address!");
        event.preventDefault();
    }

    if (contactNumber.value.length > 10) {
        alert(`The contact number should not be more than 10 digits.`);
        return;
    }


    studentname.value = "";
    studentid.value = "";
    gmail.value = "";
    contact.value = "";


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