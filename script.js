let editingIndex = -1;

function getStudents() {
  return JSON.parse(localStorage.getItem("students") || "[]");
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function clearForm() {
  document.getElementById('name').value = "";
  document.getElementById('regNo').value = "";
  document.getElementById('dept').value = "";
  document.getElementById('year').value = "";
  document.getElementById('marks').value = "";
  editingIndex = -1;
}

function addOrUpdateStudent() {
  const name = document.getElementById('name').value.trim();
  const regNo = document.getElementById('regNo').value.trim();
  const dept = document.getElementById('dept').value.trim();
  const year = document.getElementById('year').value.trim();
  const marks = document.getElementById('marks').value.trim();

  if (!name || !regNo || !dept || !year || !marks) {
    alert("⚠ Please fill in all fields.");
    return;
  }

  const students = getStudents();
  const student = { name, regNo, dept, year, marks };

  if (editingIndex === -1) {
    students.push(student);
  } else {
    students[editingIndex] = student;
  }

  saveStudents(students);
  displayStudents();
  clearForm();
}

function editStudent(index) {
  const students = getStudents();
  const s = students[index];
  document.getElementById('name').value = s.name;
  document.getElementById('regNo').value = s.regNo;
  document.getElementById('dept').value = s.dept;
  document.getElementById('year').value = s.year;
  document.getElementById('marks').value = s.marks;
  editingIndex = index;
}

function deleteStudent(index) {
  const students = getStudents();
  if (confirm("🗑 Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveStudents(students);
    displayStudents();
  }
}

function displayStudents() {
  const students = getStudents();
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  students.forEach((s, index) => {
    if (
      s.name.toLowerCase().includes(searchQuery) ||
      s.regNo.toLowerCase().includes(searchQuery)
    ) {
      const row = `<tr>
        <td>${s.name}</td>
        <td>${s.regNo}</td>
        <td>${s.dept}</td>
        <td>${s.year}</td>
        <td>${s.marks}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    }
  });
}

displayStudents();
