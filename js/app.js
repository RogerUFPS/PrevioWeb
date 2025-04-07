let asignatures;
let actIndex; // Índice de la asignatura actual
let totStd = 0; // Contador de estudiantes

document.addEventListener('DOMContentLoaded', async () => {
    const asignList = document.getElementById('asignCards');
    const template = document.getElementById('templateAsignCards');

    // Renderizar asignaturas
    async function renderAsignatures() {
        try {
            asignatures = await api.getAsignatures();
            asignList.innerHTML = '';
            
            asignatures.forEach((asign, index) => {
                const clone = template.content.cloneNode(true);

                // Actualizar los datos de la tarjeta
                clone.querySelector('.name').textContent = asign.nombre;
                clone.querySelector('.id').textContent = `ID: ${asign.codigo}`;
                clone.querySelector('.creditos').textContent = `Créditos: ${asign.creditos}`;
                clone.querySelector('.description').textContent = asign.descripcion;

                // Añadir índice como clase para referencia
                clone.firstElementChild.classList.add(`asign-${index}`);

                asignList.appendChild(clone);
            });
        } catch (error) {
            console.error('Error al renderizar asignaturas:', error);
            alert('Error al cargar las asignaturas');
        }
    }

    // Cargar asignaturas al iniciar
    await renderAsignatures();
});

// Añadir nueva asignatura
async function addAsign() {
    try {
        const inputs = document.getElementsByName("nAsign");
        
        // Validar que todos los campos tengan valores
        if (!inputs[0].value || !inputs[1].value || !inputs[2].value) {
            alert('Por favor complete todos los campos');
            return;
        }

        await api.addAsignature(
            inputs[0].value, // código
            inputs[2].value, // nombre
            inputs[3].value, // descripción
            inputs[1].value  // créditos
        );
        
        // Recargar la página después de añadir
        setTimeout(() => {
            location.reload();
        }, 500);
    } catch (error) {
        console.error('Error al añadir asignatura:', error);
        alert('Error al añadir asignatura');
    }
}

// Obtener datos de asignatura para editar
function getAsign(e) {
    try {
        // Obtener el índice de la clase (ejemplo: "asign-0" -> 0)
        const classList = e.closest('.asignature-card').classList;
        actIndex = Array.from(classList)
            .find(cls => cls.startsWith('asign-'))
            .split('-')[1];

        const inputs = document.getElementsByName("eAsign");

        // Rellenar el formulario de edición
        inputs[0].value = asignatures[actIndex].codigo;
        inputs[1].value = asignatures[actIndex].creditos;
        inputs[2].value = asignatures[actIndex].nombre;    
        inputs[3].value = asignatures[actIndex].descripcion;
    } catch (error) {
        console.error('Error al obtener asignatura:', error);
    }
}

// Actualizar asignatura
async function update() {
    try {
        const inputs = document.getElementsByName("eAsign");
        
        await api.updateAsign(
            asignatures[actIndex].codigo, // código original (para buscar)
            inputs[2].value,             // nuevo nombre
            inputs[3].value,             // nueva descripción
            inputs[1].value              // nuevos créditos
        );
        
        // Recargar después de actualizar
        setTimeout(() => {
            location.reload();
        }, 500);
    } catch (error) {
        console.error('Error al actualizar asignatura:', error);
        alert('Error al actualizar asignatura');
    }
}

let act;

// Mostrar estudiantes de una asignatura
async function putStudents(e) {
    try {
        act = e;
        const studentList = document.getElementById('studentList');
        const template = document.getElementById('templateStudentCards');
        
        studentList.innerHTML = '';
        totStd = 0;

        // Obtener el índice como en getAsign
        const classList = e.closest('.asignature-card').classList;
        actIndex = Array.from(classList)
            .find(cls => cls.startsWith('asign-'))
            .split('-')[1];

        // Obtener estudiantes matriculados
        const asStudents = await api.getAsignStudents(asignatures[actIndex].codigo);

        // Para cada estudiante matriculado
        for (const enrollment of asStudents) { 
            const student = await api.getStudent(enrollment.codigo_alumno);
            
            if (student && student.length > 0) {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.nameE').textContent = student[0].nombre;
                clone.querySelector('.idE').textContent = `ID: ${student[0].codigo}`;
                studentList.appendChild(clone);
                totStd++;
            }
        }

        // Actualizar información de la asignatura
        document.getElementById('vAsign').textContent = asignatures[actIndex].nombre;
        document.getElementById('vCredits').textContent = `Créditos: ${asignatures[actIndex].creditos}`;
        document.getElementById('vDescr').textContent = asignatures[actIndex].descripcion;
        document.getElementById('totalEst').textContent = `Estudiantes: ${totStd}/3`;
    } catch (error) {
        console.error('Error al mostrar estudiantes:', error);
        alert('Error al cargar los estudiantes');
    }
}

// Listar todos los estudiantes para el overlay
async function listStudents() {
    try {
        const list = document.getElementById("listStudents");
        list.innerHTML = ''; // Limpiar lista primero
        let o = document.createElement('option');
        o.textContent="";
        o.value="-1";
        list.appendChild(o);

        const students = await api.getAllStudents();

        students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.codigo;
            option.textContent = `${student.nombre} (${student.codigo})`;
            list.appendChild(option);
        });
    } catch (error) {
        console.error('Error al listar estudiantes:', error);
    }
}

// Añadir estudiante a una asignatura
async function addStudent(e) {
    try {
        const list = document.getElementById("listStudents");
        const selectedStudentCode = list.value;

        if (selectedStudentCode == -1) {
            alert('Por favor seleccione un estudiante');
            return;
        }

        if (totStd >= 3) {
            alert("No se pueden añadir más de 3 estudiantes a esta asignatura");
            return;
        }

        // Obtener datos del estudiante seleccionado
        const student = await api.getStudent(selectedStudentCode);
        
        if (student && student.length > 0) {
            await api.addStudentToAsign(
                asignatures[actIndex].codigo,
                student[0].codigo
            );
            
            // Actualizar la lista de estudiantes
            await putStudents(act);
            hideOverlay();
        } else {
            alert('Estudiante no encontrado');
        }
    } catch (error) {
        console.error('Error al añadir estudiante:', error);
        alert('Error al añadir estudiante');
    }
}