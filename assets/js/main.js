const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const task = document.querySelector('.task');

inputTask.addEventListener('keypress',function(e){
    if(e.keyCode === 13){
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
})

btnTask.addEventListener('click',function(){
    if(!inputTask.value) return;
    createTask(inputTask.value);
});

const createLi = () => {
    const li = document.createElement('li');
    return li;
};

const createTask = (textInput) => {
    const li = createLi();
    li.innerHTML = textInput;
    task.appendChild(li);
    clearInput();
    createDeleteButton(li);
    saveTasks();
};

const clearInput = () => {
    inputTask.value = '';
    inputTask.focus();
};

const createDeleteButton = (li) => {
    li.innerHTML += ' ';
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'Apagar';
    buttonDelete.setAttribute('class','delete');
    buttonDelete.setAttribute('title','Apagar esta tarefa');
    li.appendChild(buttonDelete);
};

document.addEventListener('click',function(e){
    const el = e.target;

    if(el.classList.contains('delete')){
        el.parentElement.remove();
        saveTasks();
    }
});

const saveTasks = () => {
    const liTasks = task.querySelectorAll('li');
    const toDoList = [];

    for(let tasks of liTasks){
        let taskText = tasks.innerText;
        taskText = taskText.replace('Apagar','').trim();
        toDoList.push(taskText);
    }

    const taskJson = JSON.stringify(toDoList);
    localStorage.setItem('tarefas',taskJson);
};

const addSavedTask = () => {
    const tasks = localStorage.getItem('tarefas');
    const toDoList = JSON.parse(tasks);

    for(let task of toDoList){
        createTask(task);
    }
    console.log(toDoList);
};

addSavedTask();