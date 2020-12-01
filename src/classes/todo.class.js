
export class Todo {

    static fromJson({ id, tarea, completado, creado}){
            const todoTermporal = new Todo(tarea);

            todoTermporal.id         = id;
            todoTermporal.completado = completado;
            todoTermporal.creado     = creado;

            return todoTermporal;
    }

    constructor(tarea) {

        this.tarea       = tarea;

        this.id          = new Date().getTime(); 
        this.completado  = false;
        this.creado      = new Date();


    }


}
