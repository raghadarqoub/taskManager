const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];
let taskId = 1;

function showMenu() {
    const menu = `
Task Manager Menu:
1. Add Task
2. View Tasks
3. Toggle Task Completion
4. Edit Task
5. Delete Task
6. Exit
    `;
    rl.question(menu + '\nChoose an option: ', (option) => {
    switch (option) {
        case '1':
        addTask();
        break;
        case '2':
        viewTasks();
        break;
        case '3':
        toggleTaskCompletion();
        break;
        case '4':
        editTask();
        break;
      case '5':
        deleteTask();
        break;
        case '6':
        exitTaskManager();
        break;
        default:
        console.log('Invalid option. Please try again.');
        showMenu();
        break;
    }
    });
}

function addTask() {
    rl.question('Enter task description: ', (desc) => {
    if (desc) {
        tasks.push({ id: taskId++, description: desc, completed: false });
        console.log('Task added.');
    }
    showMenu();
    });
}

function viewTasks() {
    if (tasks.length === 0) {
    console.log('No tasks available.');
    } else {
    let taskList = tasks.map(task => {
        return `${task.id}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`;
    }).join('\n');
    console.log(taskList);
    }
    showMenu();
}

function toggleTaskCompletion() {
    rl.question('Enter task ID to toggle completion: ', (id) => {
    const task = tasks.find(task => task.id == id);
    if (task) {
        task.completed = !task.completed;
        console.log('Task completion status toggled.');
    } else {
        console.log('Task not found.');
    }
    showMenu();
    });
}

function editTask() {
    rl.question('Enter task ID to edit: ', (id) => {
    const task = tasks.find(task => task.id == id);
    if (task) {
        rl.question('Enter new description: ', (newDesc) => {
        if (newDesc) {
            task.description = newDesc;
            console.log('Task updated.');
        }
        showMenu();
        });
    } else {
        console.log('Task not found.');
        showMenu();
    }
    });
}

function deleteTask() {
    rl.question('Enter task ID to delete: ', (id) => {
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        console.log('Task deleted.');
    } else {
        console.log('Task not found.');
    }
    showMenu();
    });
}

function exitTaskManager() {
    console.log('Exiting Task Manager...');
    rl.close();
}

showMenu();
