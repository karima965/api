// Get saved students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Save students in Local Storage
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Display students on the page
function displayStudents() {
  const studentList = document.getElementById("studentList");
  const studentCount = document.getElementById("studentCount");

  studentList.innerHTML = "";
  studentCount.textContent = students.length;

  if (students.length === 0) {
    studentList.innerHTML =
      '<p class="empty-message">No students added yet.</p>';
    return;
  }

  students.forEach(function (student, index) {
    const item = document.createElement("div");
    item.className = "student-item";

    const info = document.createElement("div");

    const name = document.createElement("div");
    name.className = "student-name";
    name.textContent = student.name;

    const email = document.createElement("div");
    email.className = "student-email";
    email.textContent = student.email;

    info.appendChild(name);
    info.appendChild(email);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    // Delete student after confirmation
    deleteButton.onclick = function () {
      if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        saveStudents();
        displayStudents();
      }
    };

    item.appendChild(info);
    item.appendChild(deleteButton);
    studentList.appendChild(item);
  });
}

// Add a new student
document.getElementById("studentForm").onsubmit = function (event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();

  const student = {
    name: name,
    email: email,
  };

  students.push(student);

  saveStudents();
  displayStudents();

  alert("Student added successfully!");

  document.getElementById("studentForm").reset();
};

// Display API users on the page
function displayApiUsers(users) {
  const apiList = document.getElementById("apiList");
  const apiCount = document.getElementById("apiCount");

  apiList.innerHTML = "";
  apiCount.textContent = users.length;

  users.forEach(function (user) {
    const card = document.createElement("div");
    card.className = "api-user";

    const name = document.createElement("strong");
    name.textContent = user.firstName + " " + user.lastName;

    const email = document.createElement("span");
    email.textContent = user.email;

    card.appendChild(name);
    card.appendChild(email);
    apiList.appendChild(card);
  });
}

// Load users from the API
document.getElementById("loadApiButton").onclick = function () {
  const apiStatus = document.getElementById("apiStatus");

  apiStatus.textContent = "Loading users...";

  fetch("https://dummyjson.com/users?limit=10")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network error");
      }

      return response.json();
    })
    .then(function (data) {
      // Save API users in Local Storage
      const users = data.users;
      localStorage.setItem("apiUsers", JSON.stringify(users));

      displayApiUsers(users);

      apiStatus.textContent = "Users loaded successfully.";
    })
    .catch(function (error) {
      apiStatus.textContent =
        "Error loading users. Check your internet connection.";
      console.log(error);
    });
};

// Ask the user for the course name
document.getElementById("courseButton").onclick = function () {
  const course = prompt("What is your course name?");

  if (course !== null && course.trim() !== "") {
    const courseName = course.trim();

    // Save course name in Local Storage
    localStorage.setItem("courseName", courseName);

    document.getElementById("courseName").textContent = courseName;

    alert("Welcome to " + courseName + "!");
  }
};

// Refresh the page
document.getElementById("refreshButton").onclick = function () {
  window.location.reload();
};

// Restore saved course name
const savedCourse = localStorage.getItem("courseName");

if (savedCourse) {
  document.getElementById("courseName").textContent = savedCourse;
}

// Restore saved API users
const savedApiUsers = JSON.parse(localStorage.getItem("apiUsers")) || [];

if (savedApiUsers.length > 0) {
  displayApiUsers(savedApiUsers);

  document.getElementById("apiStatus").textContent =
    "Saved API users loaded successfully.";
}

// Display saved students when the page opens
displayStudents();
