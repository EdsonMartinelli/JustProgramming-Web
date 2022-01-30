"use strict"

const addTextField = document.querySelector("#addTextField")
const addButton = document.querySelector("#addButton")
const taskArea = document.querySelector("#taskArea")
const allTasks = document.querySelector("#allTasks")
const remainTasks = document.querySelector("#remainTasks")

let index = 0
let contTask = 0
let contRemain = 0
let task = {}

addButton.addEventListener("click", () => {
    let newTask = { 
            task: addTextField.value,
            status: "Active",
        }
    task[index] = newTask
    allTasks.innerHTML= `${++contTask} Task`
    remainTasks.innerHTML= `${++contRemain} Remain`
    createItem(newTask) 
    index++   
})

function updateItem(indexOfItem){
    task[indexOfItem].status = "Finished"
    const item = document.querySelector(`#item-${indexOfItem}`)
    const statusItem = item.lastElementChild.firstElementChild
    statusItem.firstElementChild.remove()
    statusItem.classList.remove("statusActive")
    statusItem.classList.add("statusFinished")

    const spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = task[indexOfItem].status
    statusItem.appendChild(spanStatusItem)

    contRemain--
    remainTasks.innerHTML= `${contRemain} Remain`
}

function deleteItem(indexOfItem){
    const item = document.querySelector(`#item-${indexOfItem}`)
    contTask--
    allTasks.innerHTML= `${contTask} Tasks`
    if(task[indexOfItem].status == "Active") {
        contRemain--
        remainTasks.innerHTML= `${contRemain} Remain`
    }
    delete task[indexOfItem]
    item.remove()
}

function createItem(newTask){
    const divItem = document.createElement("div")
    divItem.setAttribute("id",`item-${index}`)
    divItem.classList.add("item")

    const divItemName = document.createElement("div")
    divItemName.classList.add("itemName")

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `checkbox-${index}`);

    const label = document.createElement("label")
    label.setAttribute("for", `checkbox-${index}`);
    label.innerHTML = newTask.task

    const divItemActions = document.createElement("div")
    divItemActions.classList.add("itemActions")

    const divStatus = document.createElement("div")
    divStatus.classList.add("statusActive")

    const spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = newTask.status

    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", `delete-${index}`);
    deleteButton.innerHTML = "Delete"

    checkbox.addEventListener("click", e => {
        const id =  e.target.id.split("-")
        e.target.disabled = true
        updateItem(id[1])
    })

    deleteButton.addEventListener("click", e => {
        const id =  e.target.id.split("-")
        deleteItem(id[1])
    })


    divItemName.appendChild(checkbox)
    divItemName.appendChild(label)

    divItemActions.appendChild(divStatus).appendChild(spanStatusItem)
    divItemActions.appendChild(deleteButton)

    divItem.appendChild(divItemName)
    divItem.appendChild(divItemActions)

    taskArea.appendChild(divItem)
}