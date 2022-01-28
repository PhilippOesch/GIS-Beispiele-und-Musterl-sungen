"use strict";
async function sendJSONStringWithPOST(url, jsonString) {
    await fetch(url, { method: "post", body: jsonString });
}
sendJSONStringWithPOST("http://localhost:3000/student", JSON.stringify({
    studentNr: 111111,
    firstName: "Adam",
    lastName: "Anfang",
    semester: 1,
    faculty: "DM",
    course: "MKB",
}));
sendJSONStringWithPOST("http://localhost:3000/student", JSON.stringify({
    studentNr: 123456,
    firstName: "Klaus",
    lastName: "Meng",
    semester: 2,
    faculty: "DM",
    course: "OMB",
}));
sendJSONStringWithPOST("http://localhost:3000/student", JSON.stringify({
    studentNr: 234567,
    firstName: "Verena",
    lastName: "Rist",
    semester: 6,
    faculty: "DM",
    course: "MIB",
}));
sendJSONStringWithPOST("http://localhost:3000/student", JSON.stringify({
    studentNr: 345678,
    firstName: "Samantha",
    lastName: "Holz",
    semester: 1,
    faculty: "DM",
    course: "OMB",
}));
sendJSONStringWithPOST("http://localhost:3000/faculty", JSON.stringify({
    name: "DM",
    course: ["MIB", "OMB", "MKB"],
}));
sendJSONStringWithPOST("http://localhost:3000/faculty", JSON.stringify({
    name: "IN",
    course: ["AIB"],
}));
//# sourceMappingURL=dbtable.js.map