let students = JSON.parse(
    localStorage.getItem("students")
) || [];

let editIndex = -1;

function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let regno = document.getElementById("regno").value.trim();
    let department = document.getElementById("department").value.trim();
    let year = document.getElementById("year").value;
    let email = document.getElementById("email").value.trim();

    if (!name || !regno || !department || !year || !email) {
        alert("Please fill all fields!");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

    let duplicate = students.some((student, index) =>
        student.regno.toLowerCase() === regno.toLowerCase()
        && index !== editIndex
    );

    if (duplicate) {
        alert("Register number already exists!");
        return;
    }

    let student = {
        name,
        regno,
        department,
        year,
        email
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    saveStudents();
    clearForm();
    displayStudents();
}

function displayStudents() {
    let list = document.getElementById("studentList");
    let search = document.getElementById("search")
        .value.toLowerCase();

    list.innerHTML = "";

    students.forEach((student, index) => {
        if (
            student.name.toLowerCase().includes(search) ||
            student.regno.toLowerCase().includes(search)
        ) {
            list.innerHTML += `
                <tr>
                    <td>${escapeHTML(student.name)}</td>
                    <td>${escapeHTML(student.regno)}</td>
                    <td>${escapeHTML(student.department)}</td>
                    <td>${escapeHTML(student.year)}</td>
                    <td>${escapeHTML(student.email)}</td>
                    <td>
                        <button class="edit-btn"
                            onclick="editStudent(${index})">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="deleteStudent(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function editStudent(index) {
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("regno").value = student.regno;
    document.getElementById("department").value = student.department;
    document.getElementById("year").value = student.year;
    document.getElementById("email").value = student.email;

    editIndex = index;
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveStudents();
        displayStudents();
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("regno").value = "";
    document.getElementById("department").value = "";
    document.getElementById("year").value = "";
    document.getElementById("email").value = "";
}

displayStudents();
