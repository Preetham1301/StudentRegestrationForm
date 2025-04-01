// Selecting elements
let studentname = document.querySelector('#sname');
let studentid = document.querySelector('#studentid');
let gmail = document.querySelector('#gmail');
let contact = document.querySelector('#mobile');
let registeredstudents = document.querySelector('#indexnumbers');
let button = document.querySelector('#submitbutton');

let editIndex = -1; // Track index for editing

function validateInputs() {
    let namePattern = /^[A-Za-z\s]+$/;  // Only letters and spaces
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Valid email format
    let contactPattern = /^\d{10}$/;  // 10-digit mobile number

    if (studentname.value === "" || studentid.value === "" || gmail.value === "" || contact.value === "") {
        alert("YOU NEED TO FILL ALL THE DETAILS");
        return;
    }
    if (!namePattern.test(studentname.value)) {
        alert("Please enter a valid name (Only letters and spaces allowed).");
        return false;
    }
    if (!emailPattern.test(gmail.value)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!contactPattern.test(contact.value)) {
        alert("PLEASE ENTER A VALID 10-DIGIT MOBILE NUMBER");
        return false;
    }
    if (studentid.value.length > 5) {
        alert("PLEASE ENTER A VALID ID (Max 5 Digits)");
        return;
    }
    return true;
}




// Function to add/update student information
function addvalue(event) {
    event.preventDefault(); // Prevent form submission

    if (!validateInputs()) return;



    let studentData = {
        name: studentname.value,
        id: studentid.value,
        email: gmail.value,
        contact: contact.value
    };

    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];


    if (editIndex === -1) {
        datastore.push(studentData);
    } else {
        datastore[editIndex] = studentData;
        editIndex = -1;
        button.textContent = "Submit";
    }

    localStorage.setItem("studentInfo", JSON.stringify(datastore));

    studentname.value = "";
    studentid.value = "";
    gmail.value = "";
    contact.value = "";

    loadValuesToTable();
}

// Function to load students into the table
function loadValuesToTable() {
    registeredstudents.innerHTML = ""; // Clear table
    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];

    datastore.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td> ${student.name}</td> 
        <td> ${student.id}</td>
        <td> ${student.email}</td>
        <td> ${student.contact}</td>
        <td>
            <button onclick="editStudent(${index})"><box-icon name='edit-alt'></box-icon></button>
            <button onclick="deleteStudent(${index})"><box-icon type='solid' name='folder-minus'></box-icon></button>
        </td>`;

        registeredstudents.appendChild(row);
    });
}

// Function to edit a student
function editStudent(index) {
    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];
    let student = datastore[index];

    studentname.value = student.name;
    studentid.value = student.id;
    gmail.value = student.email;
    contact.value = student.contact;

    editIndex = index;
    button.textContent = "Update";
}

// Function to delete a student
function deleteStudent(index) {
    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];
    datastore.splice(index, 1); // Corrected from slice() to splice()
    localStorage.setItem("studentInfo", JSON.stringify(datastore));
    loadValuesToTable();
}

// Add event listener for the submit button
button.addEventListener("click", addvalue);

// Load data when page loads
window.onload = loadValuesToTable;
