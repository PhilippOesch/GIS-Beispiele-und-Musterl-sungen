"use strict";
var Client;
(function (Client) {
    //fetch Methoden
    async function sendJSONStringWithPOST(url, jsonString) {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }
    async function requestStudent(id) {
        let response = await fetch(`http://localhost:3000/student?_id=${id}`);
        let text = await response.text();
        return JSON.parse(text);
    }
    async function requestStudents() {
        let response = await fetch("http://localhost:3000/students");
        let text = await response.text();
        return JSON.parse(text);
    }
    async function requestFaculties() {
        let response = await fetch("http://localhost:3000/faculties");
        let text = await response.text();
        return JSON.parse(text);
    }
    //UI
    async function displayStudents(table) {
        let students = await requestStudents();
        let tbody = table.querySelector("tbody");
        removeChildren(tbody);
        for (let student of students) {
            let tr = document.createElement("tr");
            tr.dataset.id = student._id;
            for (let info of [
                student.studentNr,
                student.firstName,
                student.lastName,
                student.semester,
                student.faculty,
                student.course,
            ]) {
                let td = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
            }
            tr.addEventListener("click", editStudent);
            tbody.appendChild(tr);
        }
    }
    async function editStudent(event) {
        let target = event.currentTarget;
        let student = (await requestStudent(target.dataset?.id || ""))[0];
        openStudentForm(student);
    }
    function newStudent() {
        openStudentForm();
    }
    async function openStudentForm(student) {
        let faculties = await requestFaculties();
        sessionStorage.setItem("faculties", JSON.stringify(faculties));
        removeChildren(selectFaculty);
        for (let facultyInfo of faculties) {
            let option = (document.createElement("option"));
            option.value = facultyInfo.name;
            option.textContent = facultyInfo.name;
            selectFaculty.appendChild(option);
        }
        student = student || {
            _id: "",
            studentNr: NaN,
            firstName: "",
            lastName: "",
            semester: 1,
            faculty: faculties[0]?.name,
            course: "",
        };
        for (let info of [
            ["_id", student._id],
            ["studentNr", student.studentNr],
            ["firstName", student.firstName],
            ["lastName", student.lastName],
            ["semester", student.semester],
            ["faculty", student.faculty],
            ["course", student.course],
        ]) {
            let input = document.querySelector(`#${info[0]}`);
            if (info[0] === "semester" && info[1]) {
                (input.querySelector(`[value="${info[1]}"]`)).checked = true;
            }
            else {
                input.value = `${info[1]}`;
            }
            if (info[0] === "faculty" && info[1]) {
                loadCourses(`${info[1]}`);
            }
        }
        studentForm.setAttribute("class", "");
    }
    function closeForm() {
        studentForm.setAttribute("class", "hide");
    }
    //Helper
    function removeChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    function loadCourses(facultyName) {
        let faculties = JSON.parse(sessionStorage.getItem("faculties") || "");
        let facultyInfo = faculties.find(f => f.name === facultyName);
        let selectCourse = (document.querySelector("#course"));
        removeChildren(selectCourse);
        for (let courseInfo of facultyInfo?.course || []) {
            let option = document.createElement("option");
            option.value = courseInfo;
            option.textContent = courseInfo;
            selectCourse.appendChild(option);
        }
    }
    function selectFacultyChange(event) {
        let target = event.currentTarget;
        loadCourses(target.value);
    }
    //Submit Form
    function onSubmitStudentForm(event) {
        let formData = new FormData(event.currentTarget);
        sendJSONStringWithPOST("http://localhost:3000/student", JSON.stringify({
            _id: formData.get("_id"),
            studentNr: formData.get("studentNr"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            semester: formData.get("semester"),
            faculty: formData.get("faculty"),
            course: formData.get("course"),
        }));
        event.preventDefault();
        closeForm();
        displayStudents(studentTable);
    }
    //DOM Elemente
    let studentTable = (document.getElementById("studentTable"));
    let studentForm = (document.getElementById("studentForm"));
    studentForm.addEventListener("submit", onSubmitStudentForm);
    let selectFaculty = (document.querySelector("#faculty"));
    selectFaculty.addEventListener("change", selectFacultyChange);
    let cancelButton = (document.querySelector("#cancel"));
    cancelButton.addEventListener("click", closeForm);
    let addButton = (document.querySelector("#add"));
    addButton.addEventListener("click", newStudent);
    //Daten laden und anzeigen
    displayStudents(studentTable);
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map