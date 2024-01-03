const formDate = document.getElementById('form-date');
const studentForm = document.getElementById('students');
const form = document.getElementById('form');
const studentAttendance = document.getElementById('attendanceData');
const fetchAttendance = document.getElementById('fetch');

let dateMarked;
let Attendance = [];
let list = [];
let totalStudent = 0;

formDate.addEventListener('submit', async (e) => {
    e.preventDefault();

    form.textContent = "";
    studentAttendance.textContent = "";

    dateMarked = e.target.date.value;
    let attendDate = { dateMarked }

    const marked = await axios.post('http://localhost:8000/date', attendDate)


    list = marked.data;


    if (list.length == 0) {


        const res = await axios.get('http://localhost:8000/student')

        const data2 = res.data;

        totalStudent = data2.length;

        data2.forEach(ele => {
            showStudent(ele);
        });

        var br = document.createElement('br');
        form.appendChild(br);

        var submit = document.createElement('button');
        submit.className = "submitData";
        submit.textContent = "Submit";
        submit.type = "submit";
        form.appendChild(submit);


        form.addEventListener('submit', studentData);




    } else {

        const res = await axios.get('http://localhost:8000/student')
        console.log(res.data);

        const data = res.data;

        totalStudent = data.length;

        let i = 0;
        data.forEach(ele => {
            let m = list[i].status
            showAttendance(ele, m);
            i++;
        })
    }

});




function showStudent(res) {


    var div = document.createElement('div');
    div.className = 'form'
    form.appendChild(div);

    var div2 = document.createElement('div');
    div.appendChild(div2);


    var p = document.createElement('p');
    p.textContent = res['name'];
    div2.appendChild(p);

    var div3 = document.createElement('div');
    div3.className = 'field'
    div.appendChild(div3);

    var input = document.createElement('input');
    input.type = "radio";
    input.id = res['id'];
    input.className = "present";
    input.name = res['id'];
    input.value = "present";
    div3.appendChild(input);

    var label = document.createElement('label');
    label.for = "present";
    label.textContent = "Present";
    div3.appendChild(label);


    var input2 = document.createElement('input');
    input2.type = "radio";
    input2.id = res['id'];
    input2.className = "absent";
    input2.name = res['id'];
    input2.value = "absent";
    div3.appendChild(input2);

    var label2 = document.createElement('label');
    label2.for = "absent";
    label2.textContent = "Absent";
    div3.appendChild(label2);




}


async function studentData(e) {
    e.preventDefault();




    const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
    radioGroups.forEach(radio => {

        const studentId = radio.name;
        const status = radio.value;
        const date = dateMarked;

        let obj = {
            studentId,
            status,
            date
        }

        Attendance = [...Attendance, obj];


    });

    const resPost = await axios.post('http://localhost:8000/student-attendance', Attendance)
    const resGet = await axios.get('http://localhost:8000/student')

    let data = resGet.data;


    let dataAttendance = resPost.data;

    const mergedData = data.map(student => {
        const attend = dataAttendance.find(attend => attend['studentId'] == student['id']);
        const statusMarked = attend['status'];
        return { ...student, ...{ statusMarked } }; // Combine using spread operator
    });

    form.textContent = "";

    mergedData.forEach(ele => {
        console.log(ele);
        showMarkedAttendance(ele);
    })



}



function showAttendance(res, status) {

    var div = document.createElement('div');
    div.className = 'new'
    studentAttendance.appendChild(div);

    var p = document.createElement('p');
    p.textContent = res['name'];
    div.appendChild(p);

    if (status == "present") {
        var p2 = document.createElement('button');
        p2.className = "stats";
        p2.textContent = "Present";
        div.appendChild(p2);
    } else {
        var p2 = document.createElement('button');
        p2.className = "stats2";
        p2.textContent = "Absent";
        div.appendChild(p2);
    }


}

function showMarkedAttendance(res) {

    var div = document.createElement('div');
    div.className = 'new'
    studentAttendance.appendChild(div);

    var p = document.createElement('p');
    p.textContent = res['name'];
    div.appendChild(p);

    if (res['statusMarked'] == "present") {
        var p2 = document.createElement('button');
        p2.className = "stats";
        p2.textContent = "Present";
        div.appendChild(p2);
    } else {
        var p2 = document.createElement('button');
        p2.className = "stats2";
        p2.textContent = "Absent";
        div.appendChild(p2);
    }
}


fetchAttendance.addEventListener('click', async () => {

    form.textContent = "";
    studentAttendance.textContent = "";

    const res = await axios.get('http://localhost:8000/attendance')
    const resGet = await axios.get('http://localhost:8000/student')


    const data = res.data;
    const dataGet = resGet.data;

    const merged = data.map(attend => {
        const student = dataGet.find(student => student['id'] == attend['studentId']);
        const studentName = student['name'];
        return { ...attend, ...{ studentName } }; 
    });

    console.log(merged);


    const presenceCounts = {};


    for (const student of merged) {
        const studentName = student.studentName;
        const Present = student.status;

        if (Present === "present") {
            presenceCounts[studentName] = (presenceCounts[studentName] || 0) + 1;
        }
    }



    const name = Object.keys(presenceCounts);
    const value = Object.values(presenceCounts);

    const totalDays = data.length / name.length;

    console.log(name + value);
    let i = 0;

    while (i < name.length) {
        var div = document.createElement('div');
        div.className = 'new'
        studentAttendance.appendChild(div);

        var p = document.createElement('p');
        p.textContent = name[i];
        div.appendChild(p);

        var p2 = document.createElement('p');
        p2.textContent = value[i] + "/" + totalDays;
        div.appendChild(p2);

        var p2 = document.createElement('p');
        const per = (value[i] / totalDays) * 100;
        let n = per.toFixed(2)
        p2.textContent = n + " %";
        div.appendChild(p2);

        i++;

    }

})
