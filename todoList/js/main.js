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
    createItemByExample(newTask) 
    index++   
})

function updateItem(indexOfItem){
    const statusItem = document.querySelector(`#item-${indexOfItem} .itemActions .statusActive`)
    statusItem.classList.remove("statusActive")
    statusItem.classList.add("statusFinished")
    task[indexOfItem].status = "Finished"
    statusItem.innerHTML = task[indexOfItem].status
    contRemain--
    remainTasks.innerHTML= `${contRemain} Remain`
}

function deleteItem(indexOfItem){
    const item = document.querySelector(`#item-${indexOfItem}`)
    item.classList.remove("enterAnimation")
    item.classList.add("exitAnimation")
    item.addEventListener("animationend", e => {
        contTask--
        allTasks.innerHTML= `${contTask} Tasks`
        if(task[indexOfItem].status == "Active") {
            contRemain--
            remainTasks.innerHTML = `${contRemain} Remain`
        }
        delete task[indexOfItem]
        e.target.remove()
    })
}

// Cloning HTML standard item and using this as an example for new items.

function createItemByExample(newTask){
    const example = document.querySelector("#item-example")
    const newItem = example.cloneNode(true)
    newItem.setAttribute("id",`item-${index}`)
    newItem.classList.remove("example")
    newItem.classList.add("enterAnimation")

    const checkbox = newItem.querySelector(".itemName input")
    checkbox.setAttribute("id", `checkbox-${index}`);

    const label = newItem.querySelector(".itemName label")
    label.setAttribute("for", `checkbox-${index}`);
    label.innerHTML = newTask.task

    const divStatus = newItem.querySelector(".itemActions .statusActive")
    divStatus.innerHTML = newTask.status

    const deleteButton = newItem.querySelector(".itemActions button")
    deleteButton.setAttribute("id", `delete-${index}`);

    checkbox.addEventListener("click", e => {
        const id =  e.target.id.split("-")
        e.target.disabled = true
        updateItem(id[1])
    })

    deleteButton.addEventListener("click", e => {
        const id =  e.target.id.split("-")
        deleteItem(id[1])
    })

    taskArea.appendChild(newItem)
}

// Creating item with pure Javascript
/*
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
    divStatus.innerHTML = newTask.status

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

    divItemActions.appendChild(divStatus)
    divItemActions.appendChild(deleteButton)

    divItem.appendChild(divItemName)
    divItem.appendChild(divItemActions)

    taskArea.appendChild(divItem)
}
*/