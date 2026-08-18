/* =========================================
   DATABASE USING LOCAL STORAGE
========================================= */


let students =
    JSON.parse(localStorage.getItem("students")) || [];


let teachers =
    JSON.parse(localStorage.getItem("teachers")) || [];


let courses =
    JSON.parse(localStorage.getItem("courses")) || [];



/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "teachers",
        JSON.stringify(teachers)
    );

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );
}



/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId) {

    // Hide every page

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    // Show selected page

    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Load tables

    if (pageId === "viewStudent") {

        displayStudents();

    }


    if (pageId === "viewTeacher") {

        displayTeachers();

    }


    if (pageId === "viewCourse") {

        displayCourses();

    }


    // Scroll to top

    window.scrollTo(0, 0);
}



/* =========================================
   START WITH DASHBOARD
========================================= */

showPage("dashboard");



/* =========================================
   STUDENT - ADD
========================================= */

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const student = {

            id: Date.now(),

            name:
                document
                    .getElementById("studentName")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("studentEmail")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("studentPhone")
                    .value
                    .trim(),

            password:
                document
                    .getElementById("studentPassword")
                    .value

        };


        students.push(student);

        saveData();


        alert("Student added successfully!");


        this.reset();


        showPage("viewStudent");

    });



/* =========================================
   DISPLAY STUDENTS
========================================= */

function displayStudents() {

    const tbody =
        document.getElementById("studentTableBody");


    tbody.innerHTML = "";


    if (students.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }


    students.forEach(function(student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.id}
            </td>

            <td>
                ${escapeHTML(student.name)}
            </td>

            <td>
                ${escapeHTML(student.email)}
            </td>

            <td>
                ${escapeHTML(student.phone)}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tbody.appendChild(row);

    });

}



/* =========================================
   EDIT STUDENT
========================================= */

function editStudent(id) {

    const student =
        students.find(function(item) {

            return item.id === id;

        });


    if (!student) {
        return;
    }


    document.getElementById("editStudentId").value =
        student.id;


    document.getElementById("editStudentName").value =
        student.name;


    document.getElementById("editStudentEmail").value =
        student.email;


    document.getElementById("editStudentPhone").value =
        student.phone;


    document.getElementById("editStudentPassword").value =
        "";


    showPage("editStudent");

}



/* =========================================
   UPDATE STUDENT
========================================= */

document
    .getElementById("editStudentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            Number(
                document.getElementById("editStudentId").value
            );


        const student =
            students.find(function(item) {

                return item.id === id;

            });


        if (!student) {
            return;
        }


        student.name =
            document
                .getElementById("editStudentName")
                .value
                .trim();


        student.email =
            document
                .getElementById("editStudentEmail")
                .value
                .trim();


        student.phone =
            document
                .getElementById("editStudentPhone")
                .value
                .trim();


        const password =
            document
                .getElementById("editStudentPassword")
                .value;


        if (password !== "") {

            student.password = password;

        }


        saveData();


        alert("Student updated successfully!");


        showPage("viewStudent");

    });



/* =========================================
   DELETE STUDENT
========================================= */

function deleteStudent(id) {

    const student =
        students.find(function(item) {

            return item.id === id;

        });


    if (!student) {
        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "?"
        );


    if (!confirmDelete) {
        return;
    }


    students =
        students.filter(function(item) {

            return item.id !== id;

        });


    saveData();


    displayStudents();

}



/* =========================================
   TEACHER - ADD
========================================= */

document
    .getElementById("teacherForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const teacher = {

            id: Date.now(),

            name:
                document
                    .getElementById("teacherName")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("teacherEmail")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("teacherPhone")
                    .value
                    .trim(),

            password:
                document
                    .getElementById("teacherPassword")
                    .value

        };


        teachers.push(teacher);

        saveData();


        alert("Teacher added successfully!");


        this.reset();


        showPage("viewTeacher");

    });



/* =========================================
   DISPLAY TEACHERS
========================================= */

function displayTeachers() {

    const tbody =
        document.getElementById("teacherTableBody");


    tbody.innerHTML = "";


    if (teachers.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No teachers found
                </td>
            </tr>
        `;

        return;
    }


    teachers.forEach(function(teacher) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${teacher.id}
            </td>

            <td>
                ${escapeHTML(teacher.name)}
            </td>

            <td>
                ${escapeHTML(teacher.email)}
            </td>

            <td>
                ${escapeHTML(teacher.phone)}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editTeacher(${teacher.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTeacher(${teacher.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tbody.appendChild(row);

    });

}



/* =========================================
   EDIT TEACHER
========================================= */

function editTeacher(id) {

    const teacher =
        teachers.find(function(item) {

            return item.id === id;

        });


    if (!teacher) {
        return;
    }


    document.getElementById("editTeacherId").value =
        teacher.id;


    document.getElementById("editTeacherName").value =
        teacher.name;


    document.getElementById("editTeacherEmail").value =
        teacher.email;


    document.getElementById("editTeacherPhone").value =
        teacher.phone;


    document.getElementById("editTeacherPassword").value =
        "";


    showPage("editTeacher");

}



/* =========================================
   UPDATE TEACHER
========================================= */

document
    .getElementById("editTeacherForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            Number(
                document.getElementById("editTeacherId").value
            );


        const teacher =
            teachers.find(function(item) {

                return item.id === id;

            });


        if (!teacher) {
            return;
        }


        teacher.name =
            document
                .getElementById("editTeacherName")
                .value
                .trim();


        teacher.email =
            document
                .getElementById("editTeacherEmail")
                .value
                .trim();


        teacher.phone =
            document
                .getElementById("editTeacherPhone")
                .value
                .trim();


        const password =
            document
                .getElementById("editTeacherPassword")
                .value;


        if (password !== "") {

            teacher.password = password;

        }


        saveData();


        alert("Teacher updated successfully!");


        showPage("viewTeacher");

    });



/* =========================================
   DELETE TEACHER
========================================= */

function deleteTeacher(id) {

    const teacher =
        teachers.find(function(item) {

            return item.id === id;

        });


    if (!teacher) {
        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            teacher.name +
            "?"
        );


    if (!confirmDelete) {
        return;
    }


    teachers =
        teachers.filter(function(item) {

            return item.id !== id;

        });


    saveData();


    displayTeachers();

}



/* =========================================
   COURSE - ADD
========================================= */

document
    .getElementById("courseForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const course = {

            id: Date.now(),

            name:
                document
                    .getElementById("courseName")
                    .value
                    .trim(),

            code:
                document
                    .getElementById("courseCode")
                    .value
                    .trim(),

            teacher:
                document
                    .getElementById("courseTeacher")
                    .value
                    .trim()

        };


        courses.push(course);

        saveData();


        alert("Course added successfully!");


        this.reset();


        showPage("viewCourse");

    });



/* =========================================
   DISPLAY COURSES
========================================= */

function displayCourses() {

    const tbody =
        document.getElementById("courseTableBody");


    tbody.innerHTML = "";


    if (courses.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No courses found
                </td>
            </tr>
        `;

        return;
    }


    courses.forEach(function(course) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${course.id}
            </td>

            <td>
                ${escapeHTML(course.name)}
            </td>

            <td>
                ${escapeHTML(course.code)}
            </td>

            <td>
                ${escapeHTML(course.teacher)}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editCourse(${course.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteCourse(${course.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tbody.appendChild(row);

    });

}



/* =========================================
   EDIT COURSE
========================================= */

function editCourse(id) {

    const course =
        courses.find(function(item) {

            return item.id === id;

        });


    if (!course) {
        return;
    }


    document.getElementById("editCourseId").value =
        course.id;


    document.getElementById("editCourseName").value =
        course.name;


    document.getElementById("editCourseCode").value =
        course.code;


    document.getElementById("editCourseTeacher").value =
        course.teacher;


    showPage("editCourse");

}



/* =========================================
   UPDATE COURSE
========================================= */

document
    .getElementById("editCourseForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            Number(
                document.getElementById("editCourseId").value
            );


        const course =
            courses.find(function(item) {

                return item.id === id;

            });


        if (!course) {
            return;
        }


        course.name =
            document
                .getElementById("editCourseName")
                .value
                .trim();


        course.code =
            document
                .getElementById("editCourseCode")
                .value
                .trim();


        course.teacher =
            document
                .getElementById("editCourseTeacher")
                .value
                .trim();


        saveData();


        alert("Course updated successfully!");


        showPage("viewCourse");

    });



/* =========================================
   DELETE COURSE
========================================= */

function deleteCourse(id) {

    const course =
        courses.find(function(item) {

            return item.id === id;

        });


    if (!course) {
        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            course.name +
            "?"
        );


    if (!confirmDelete) {
        return;
    }


    courses =
        courses.filter(function(item) {

            return item.id !== id;

        });


    saveData();


    displayCourses();

}



/* =========================================
   LOGOUT
========================================= */

function logout() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (confirmLogout) {

        alert("Logout functionality can be connected to PHP later.");

    }

}



/* =========================================
   SECURITY HELPER
========================================= */

function escapeHTML(value) {

    if (value === undefined || value === null) {
        return "";
    }


    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");
}