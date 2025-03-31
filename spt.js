
// Function to add or update student information
function addInformation() {
    if (studentname.value === "" || studentid.value === "" || gmail.value === "" || contact.value === "") {
        alert("YOU NEED TO FILL ALL THE DETAILS");
        return;
    }

    if (studentid.value.length > 5) {
        alert("PLEASE ENTER A VALID ID (Max 5 Digits)");
        return;
    }

    if (contact.value.length !== 10) {
        alert("PLEASE ENTER A VALID 10-DIGIT MOBILE NUMBER");
        return;
    }

    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];

    let studentData = {
        name: studentname.value,
        id: studentid.value,
        email: gmail.value,
        contact: contact.value,
    };

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
    registeredstudents.innerHTML = "";
    let datastore = JSON.parse(localStorage.getItem("studentInfo")) || [];

    datastore.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
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
    datastore.splice(index, 1);
    localStorage.setItem("studentInfo", JSON.stringify(datastore));
    loadValuesToTable();
}

// Event listener for the submit button
button.addEventListener("click", addInformation);

// Load data when page loads
window.onload = loadValuesToTable;
