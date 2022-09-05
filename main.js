const form = document.querySelector('#formulario');
const pintarTodo = document.querySelector('#pintarTodo');
const templateTodo = document.querySelector('#templateTodo').content;
const alert = document.querySelector('.alert');

let tareas = [];

const agregarTarea = tarea => {
	const objetoTodo = {
		nombre: tarea,
		id: `${Date.now()}`,
	};

	tareas.push(objetoTodo);
};

const pintarTodos = () => {
	localStorage.setItem('tareas', JSON.stringify(tareas)); //pusheo el array con los obj al localstorage
    
	pintarTodo.textContent = '';
	const fragment = document.createDocumentFragment();
	tareas.forEach(item => {
		const clone = templateTodo.cloneNode(true);
		clone.querySelector('.lead').textContent = item.nombre;
		clone.querySelector('.btn').dataset.id = item.id;
		fragment.appendChild(clone);
	});

	pintarTodo.appendChild(fragment);
};


form.addEventListener('submit', e => {
    e.preventDefault();
    alert.classList.add('d-none');

    const data = new FormData(form);
    const [tarea] = [...data.values()];

    if (!tarea.trim()) {
        //validacion espacios en blanco
        alert.classList.remove('d-none');
        return; //sale del programa
    }

    agregarTarea(tarea);
    pintarTodos();
});

document.addEventListener('click', e => {
	if (e.target.matches('.btn-success')) {
		//selecciona el boton borrar
		tareas = tareas.filter(item => item.id !== e.target.dataset.id); // devuelve todos los elementos distintos al de borrar
		pintarTodos();
	}
});

document.addEventListener('DOMContentLoaded', (e) => {
    if (localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
        pintarTodos()
    }
    
})