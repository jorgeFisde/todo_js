// IMPORTACION  de todo para crear desde aqui una tarea 
import { Todo } from '../classes';
import { todoList } from '../index';

// erferencias en html

const divTodoList = document.querySelector('.todo-list');
const inputTxtNuevoTodo = document.querySelector('.new-todo');
const limpiarCompletados = document.querySelector('.clear-completed');
const ulFiltro = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}


// Eventos

inputTxtNuevoTodo.addEventListener('keyup', (evento) => {

    if (evento.keyCode === 13 && inputTxtNuevoTodo.value.length > 0) {

        const nuevoTodo = new Todo(inputTxtNuevoTodo.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        inputTxtNuevoTodo.value = '';
    }


})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;// extrae el nombre del elemento tocado
    const todoElemento = event.target.parentElement.parentElement; // regresa a su elemento padre
    const todoid = todoElemento.getAttribute('data-id'); // regresa sus atributos, en este caso su id

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoid);

        todoElemento.classList.toggle('completed'); // toggle revisa sus clases y si la encuentra la quita y si no, la pone

    } else if (nombreElemento.includes('button')) {
        console.log(todoid);
        todoList.eliminarTodo(todoid);
        divTodoList.removeChild(todoElemento);

    }

    limpiarCompletados.addEventListener('click', () => {

        todoList.eliminarCompletado();

        for (let i = divTodoList.children.length - 1; i >= 0; i--) {
            const elemento = divTodoList.children[i];

            if (elemento.classList.contains('completed')) {
                divTodoList.removeChild(elemento);
            }

        }



    })


})

ulFiltro.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return };

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');


        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    }

})