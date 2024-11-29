async function addTask(){
    let Taskinput = document.getElementByid('taskInput').value;
    if(Taskinput){
        await ell.add_task(Taskinput);
        document.getElementById('taskInput').value='';
        loadTask();

    }
}
async function loadTask(){
    let task = await ell.load_Task()();
    let tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = '';
    tasklist.array.forEach(element => {
        let ListItem = document.createElement('11')
        ListItem.innerHTML = `
            <span style = "text-decoration: ${task.completed ? 'line-through' : 'none'}">
            ${task.task}
            </span>
            <button onclick = "toggleCompletion('&(task task)')">Concluir</button>
            <button onclick = "editTask('&(task task)')">Editar</button>
            <button onclick = "deleteTask('&(task task)')">Excluir</button>
        `;

        tasklist.appendChild(ListItem);
    });
    
}

async function toggleCompletion(task) {
    await eel.toggle_task_Completion(task)();
    loadTask();
}

async function editTask(task) {
    let newtask = prompt("Editar tarefa", task);
    if(newtask && newtask !== task) {
        await eel.edit_Task(task, newTask)();
        loadTask();

    }
}

async function deleteTask(task) {
    await eel.delete_Task(task)();
    loadTask();
}

async function toggleTheme() {
    document.body.classList.toggle('dark-Theme');
    const newTheme = document.body.classList.contains('dark-Theme') ? 'dark' : 'light';
    await eel.set_theme(newTheme)();
}

async function LoadTheme() {
    const theme = await eel.get.theme()();
    if(theme === 'dark'){
        document.body.classList
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    loadTask();
    loadTheme();
})