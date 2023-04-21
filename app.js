const taskInput = document.getElementById('new-task')
const incompleteTaskHolder = document.querySelector('.incomplete-tasks')
const completedTasksHolder = document.querySelector('.completed-tasks')

document.querySelector('.add-task-button').addEventListener('click', addTask)
taskInput.addEventListener('keyup', e => { if (e.code == 'Enter') addTask() })

for (let i = 0; i < incompleteTaskHolder.children.length; i++) 
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)

for (let i = 0; i < completedTasksHolder.children.length; i++) 
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)


function createNewTaskElement (taskString) {
    const listItem = document.createElement('li')
    listItem.className = 'task-item'

    const checkBox = document.createElement('input')
    const label = document.createElement('label')
    const editInput = document.createElement('input')
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const deleteButtonImg = document.createElement('img')

    label.innerText = taskString
    label.className = 'task'

    checkBox.type = 'checkbox'
    editInput.type = 'text'
    editInput.className = 'task'

    editButton.innerText = 'Edit'
    editButton.className = 'button edit'

    deleteButton.className = 'button delete'
    deleteButtonImg.src = './remove.svg'
    deleteButtonImg.alt  =  'remove button'
    deleteButton.append(deleteButtonImg)

    listItem.append(checkBox, label, editInput, editButton, deleteButton)

    return listItem
}

function addTask() {
    console.log('Add Task...')
    taskInput.focus()
    if (!taskInput.value.trim()) return
    const listItem = createNewTaskElement(taskInput.value)
    incompleteTaskHolder.append(listItem)
    bindTaskEvents(listItem, taskCompleted)
    taskInput.value = ''
    ajaxRequest()
}

function ajaxRequest() {
    console.log('AJAX Request')
}

function editTask() {
    console.log('Edit Task...')
    console.log('Change "edit" to "save"')

    const listItem = this.parentNode
    const editInput = listItem.querySelector('input[type=text]')
    const label = listItem.querySelector('label')
    const editBtn = listItem.querySelector('.edit')

    if (listItem.classList.contains('incomplete-tasks_edit-mode')) {
        if (!editInput.value.trim()) return
        label.innerText = editInput.value
        editBtn.innerText = 'Edit'
    }
    else {
        editInput.value = label.innerText
        editBtn.innerText = 'Save'
    }

    listItem.classList.toggle('incomplete-tasks_edit-mode')
}

function deleteTask() {
    console.log('Delete Task...')
    const listItem = this.parentNode
    const ul = listItem.parentNode
    ul.removeChild(listItem)
}

function taskCompleted() {
    console.log('Complete Task...')
    const listItem = this.parentNode
    completedTasksHolder.append(listItem)
    bindTaskEvents(listItem, taskIncomplete)
}

function taskIncomplete() {
    console.log('Incomplete Task...')
    const listItem = this.parentNode
    incompleteTaskHolder.append(listItem)
    bindTaskEvents(listItem, taskCompleted)
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    console.log('bind list item events')
    taskListItem.querySelector('input[type=checkbox]').onchange = checkBoxEventHandler
    taskListItem.querySelector('.button.edit').onclick = editTask
    taskListItem.querySelector('.button.delete').onclick = deleteTask
}