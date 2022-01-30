"use strict"

let addTextField = document.querySelector("#addTextField")
let addButton = document.querySelector("#addButton")
let taskArea = document.querySelector("#taskArea")

let allTasks = document.querySelector("#allTasks")
let remainTasks = document.querySelector("#remainTasks")

let index = 0
let contTask = 0
let contRemain = 0
let task = {}

addButton.addEventListener("click", () => {
    let newTask = { 
            task: addTextField.value,
            status: "Active",
        }
    task[index++] = newTask
    allTasks.innerHTML= (++contTask).toString() + " Tasks"

    remainTasks.innerHTML= (++contRemain).toString() + " Remain"
    createItem(newTask)
    console.log(task)
    
})

function createItem(newTask){
    let divItem = document.createElement("div")
    divItem.setAttribute("id",`item-${index - 1}`)
    divItem.classList.add("item")

    let divItemName = document.createElement("div")
    divItemName.classList.add("itemName")

    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `checkbox-${index - 1}`);

    let label = document.createElement("label")
    label.setAttribute("for", `checkbox-${index - 1}`);
    label.innerHTML = newTask.task

    let divItemActions = document.createElement("div")
    divItemActions.classList.add("itemActions")

    let divStatus = document.createElement("div")
    divStatus.classList.add("statusActive")

    let spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = newTask.status

    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", `delete-${index - 1}`);
    deleteButton.innerHTML = "Delete"

    checkbox.addEventListener("click", e => {
        let id =  e.target.id.split("-")
        task[id[1]].status = "Finished"
        e.target.disabled = true
        updateItem(id[1])
    })

    deleteButton.addEventListener("click", e => {
        let id =  e.target.id.split("-")
        delete task[id[1]]
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

function updateItem(indexOfItem){
    let item = document.querySelector(`#item-${indexOfItem}`)
    let statusItem = item.lastElementChild.firstElementChild
    statusItem.firstElementChild.remove()
    statusItem.classList.remove("statusActive")
    statusItem.classList.add("statusFinished")

    let spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = task[indexOfItem].status
    statusItem.appendChild(spanStatusItem)

    contRemain--
    remainTasks.innerHTML= `${contRemain} Remain`
}

function deleteItem(indexOfItem){
    let item = document.querySelector(`#item-${indexOfItem}`)
    contTask--
    allTasks.innerHTML= `${contTask} Tasks`
    if(task[indexOfItem] == "Active") {
        contRemain--
        remainTasks.innerHTML= `${contRemain} Remain`
    }
    item.remove()
}