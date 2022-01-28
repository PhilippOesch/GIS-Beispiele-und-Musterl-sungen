namespace Client {

    //Interfaces
    interface Student {
        _id?: string;
        studentNr: number;
        firstName: string;
        lastName: string;
        semester?: number;
        faculty?: string;
        course?: string;
    }

    interface Faculty {
        _id?: string;
        name: string;
        course?: string[];
    }

    //fetch Methoden
    async function sendJSONStringWithPOST(
        url: RequestInfo,
        jsonString: string
    ): Promise<void> {
        await fetch(url, {
            method: "post",
            body: jsonString,
        });
    }

    async function requestStudent(id: string): Promise<Student[]> {
        let response: Response = await fetch(
            `http://localhost:3000/student?_id=${id}`
        );
        let text: string = await response.text();
        return JSON.parse(text) as Student[];
    }

    async function requestStudents(): Promise<Student[]> {
        let response: Response = await fetch("http://localhost:3000/students");
        let text: string = await response.text();
        return JSON.parse(text) as Student[];
    }

    async function requestFaculties(): Promise<Faculty[]> {
        let response: Response = await fetch("http://localhost:3000/faculties");
        let text: string = await response.text();
        return JSON.parse(text) as Faculty[];
    }

    //UI
    async function displayStudents(table: HTMLTableElement) {
        let students: Student[] = await requestStudents();
        let tbody: HTMLElement = <HTMLElement>table.querySelector("tbody");
        removeChildren(tbody);
        for (let student of students) {
            let tr: HTMLTableRowElement = document.createElement("tr");
            tr.dataset.id = student._id;
            for (let info of [
                student.studentNr,
                student.firstName,
                student.lastName,
                student.semester,
                student.faculty,
                student.course,
            ]) {
                let td: HTMLElement = document.createElement("td");
                td.textContent = `${info}`;
                tr.appendChild(td);
            }
            tr.addEventListener("click", editStudent);
            tbody.appendChild(tr);
        }
    }

    async function editStudent(event: Event) {
        let target: HTMLElement = <HTMLElement>event.currentTarget;
        let student: Student = (await requestStudent(target.dataset?.id || ""))[0];
        openStudentForm(student);
    }

    function newStudent() {
        openStudentForm();
    }

    async function openStudentForm(student?: Student) {
        let faculties: Faculty[] = await requestFaculties();
        sessionStorage.setItem("faculties", JSON.stringify(faculties));
        removeChildren(selectFaculty);
        for (let facultyInfo of faculties) {
            let option: HTMLOptionElement = <HTMLOptionElement>(
                document.createElement("option")
            );
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
            let input: HTMLElement = <HTMLElement>document.querySelector(`#${info[0]}`);
            if (info[0] === "semester" && info[1]) {
                (<HTMLInputElement>(
                    input.querySelector(`[value="${info[1]}"]`)
                )).checked = true;
            } else {
                (<HTMLInputElement>input).value = `${info[1]}`;
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
    function removeChildren(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function loadCourses(facultyName: string) {
        let faculties: Faculty[] = JSON.parse(
            sessionStorage.getItem("faculties") || ""
        );
        let facultyInfo: Faculty | undefined = faculties.find(
            f => f.name === facultyName
        );
        let selectCourse: HTMLSelectElement = <HTMLSelectElement>(
            document.querySelector("#course")
        );
        removeChildren(selectCourse);
        for (let courseInfo of facultyInfo?.course || []) {
            let option: HTMLOptionElement = document.createElement("option");
            option.value = courseInfo;
            option.textContent = courseInfo;
            selectCourse.appendChild(option);
        }
    }

    function selectFacultyChange(event: Event) {
        let target: HTMLOptionElement = <HTMLOptionElement>event.currentTarget;
        loadCourses(target.value);
    }

    //Submit Form
    function onSubmitStudentForm(event: Event) {
        let formData: FormData = new FormData(<HTMLFormElement>event.currentTarget);
        sendJSONStringWithPOST(
            "http://localhost:3000/student",
            JSON.stringify({
                _id: formData.get("_id"),
                studentNr: formData.get("studentNr"),
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                semester: formData.get("semester"),
                faculty: formData.get("faculty"),
                course: formData.get("course"),
            })
        );
        event.preventDefault();
        closeForm();
        displayStudents(studentTable);
    }

    //DOM Elemente
    let studentTable: HTMLTableElement = <HTMLTableElement>(
        document.getElementById("studentTable")
    );
    let studentForm: HTMLFormElement = <HTMLFormElement>(
        document.getElementById("studentForm")
    );
    studentForm.addEventListener("submit", onSubmitStudentForm);
    let selectFaculty: HTMLSelectElement = <HTMLSelectElement>(
        document.querySelector("#faculty")
    );
    selectFaculty.addEventListener("change", selectFacultyChange);
    let cancelButton: HTMLButtonElement = <HTMLButtonElement>(
        document.querySelector("#cancel")
    );
    cancelButton.addEventListener("click", closeForm);
    let addButton: HTMLButtonElement = <HTMLButtonElement>(
        document.querySelector("#add")
    );
    addButton.addEventListener("click", newStudent);

    //Daten laden und anzeigen
    displayStudents(studentTable);
}