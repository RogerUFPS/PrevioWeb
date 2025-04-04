
let asignatures;

document.addEventListener('DOMContentLoaded', async () => {
    // Sample student data


    const asignList = document.getElementById('asignCards');
    const template = document.getElementById('templateAsignCards');

    // Render students
    async function renderAsignatures() {
        asignatures = await api.getAsignatures();
        asignList.innerHTML = '';
        let i = 0;
        asignatures.forEach(asign => {
            //console.log(asign);

            const clone = template.content.cloneNode(true);

            clone.querySelector('.name').textContent = asign.nombre;
            clone.querySelector('.id').textContent = `ID: ${asign.codigo}`;
            clone.querySelector('.creditos').textContent = asign.creditos;
            clone.querySelector('.description').textContent = asign.descripcion;

            clone.firstElementChild.classList.add(`${i}`);

            asignList.appendChild(clone);
            i++;
        });
    }

    renderAsignatures();
});


async function loadTechnologies(code) {
    const techList = document.getElementById("techList");
    const template = document.getElementById("techTemplate");

    techList.innerHTML='';
    const n = await api.getTechnology(code);

    let x = ["Java", "Python",  "PhP", "React", "Angular"];
    let z = ["./img/technology/java.png", 
        "./img/technology/python.png", 
        "./img/technology/php.png", 
        "./img/technology/react.png", 
        "./img/technology/angular.png"];

    n.forEach(tech => {

        const clone = template.content.cloneNode(true);

        clone.querySelector('.tech-icon').src = z[tech.technology_code-1];
        clone.querySelector('.tech-name').textContent = x[tech.technology_code-1]; 

        for(let i = 0;i<tech.level;i++){
            let f = document.createElement("img");
            f.src = "./img/star.png"
            f.classList.add("tech-icon");
            clone.querySelector(".tech-rate").appendChild(f);
        }
        
        techList.appendChild(clone);
    });
}

//Add student

function addAsign() {
    let e = document.getElementsByName("nAsign");
    api.addAsignature(e[0].value, e[1].value, e[2].value);
    
    // setTimeout(() => {
    //     location.reload();
    // }, 500);
}

let actIndex;

function getAsign(e) {
    actIndex = e.parentNode.parentNode.parentNode.classList[1];

    let inputs = document.getElementsByName("eAsign");

    inputs[0].value = asignatures[actIndex].codigo;
    inputs[1].value = asignatures[actIndex].creditos;
    inputs[2].value = asignatures[actIndex].nombre;    
    inputs[3].value = asignatures[actIndex].descripcion;
}

function update() {
    let inputs = document.getElementsByName("eAsign");
    api.updateAsign(asignatures[actIndex].codigo, inputs[2].value, inputs[3].value);
    
  

}


let totStd = 0;

async function putStudents(e) {

    const studentList = document.getElementById('studentList');
    const template = document.getElementById('templateStudentCards');

    actIndex = e.parentNode.parentNode.parentNode.classList[1];

    let asStudents = await api.getAsignStudents(asignatures[actIndex].codigo);

    for (const code of asStudents) { 
        let act = await api.getStudents(code.codigo_alumno); 

        console.log(act);

        for(const a of act){
            const clone = template.content.cloneNode(true);
            clone.querySelector('.nameE').textContent = a.nombre;
            clone.querySelector('.idE').textContent = `ID: ${a.codigo}`;
            studentList.appendChild(clone);
            totStd++;
        }
    }

    document.getElementById('vAsign').textContent = asignatures[actIndex].nombre;
    document.getElementById('vCredits').textContent = asignatures[actIndex].creditos;
    document.getElementById('vDescr').textContent = asignatures[actIndex].descripcion;
    document.getElementById('totalEst').textContent = totStd + "/" + 3;
}

async function listStudents() {
    let list = document.getElementById("listStudents");

    let students = await api.getAllStudents();

    students.forEach(st => {
        let option = document.createElement('option');
        option.value = st.codigo;
        option.textContent = st.nombre + " " + st.codigo;
        list.appendChild(option);
    });
}

async function addStudent() {
    let list = document.getElementById("listStudents");
    let act = await api.getStudents(asignatures[actIndex]); 

    if(totStd < 3) {

        api.addStudentToAsign(asignatures[actIndex].codigo, act.codigo, act.nombre);
    } else alert("Va a exceder el tamaño max del curso");
}