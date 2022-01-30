"use strict"

let addTextField = document.querySelector("#addTextField")
let addButton = document.querySelector("#addButton")
let taskArea = document.querySelector("#taskArea")

let allTasks = document.querySelector("#allTasks")
let remainTasks = document.querySelector("#remainTasks")

let index = 0
let indexRemain = 0
let task = {}

addButton.addEventListener("click", () => {
    let newTask = { 
            task: addTextField.value,
            status: "Active",
        }
    task[index++] = newTask
    allTasks.innerHTML= (index).toString() + " Tasks"

    indexRemain++

    /*Object.keys(task).forEach(key => {
        if(task[key].status == "Active"){
            indexRemain++;
        }
    })*/

    remainTasks.innerHTML= (indexRemain).toString() + " Remain"
    createItem(newTask)
    console.log(task)
    
})

function createItem(newTask){
    let divItem = document.createElement("div")
    divItem.setAttribute("id", (index - 1).toString())
    divItem.classList.add("item")

    let divItemName = document.createElement("div")
    divItemName.classList.add("itemName")

    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", "c" + (index - 1).toString());

    let label = document.createElement("label")
    label.setAttribute("for", "c" + (index - 1).toString());
    label.innerHTML = newTask.task

    let divItemActions = document.createElement("div")
    divItemActions.classList.add("itemActions")

    let divStatus = document.createElement("div")
    divStatus.classList.add("statusActive")

    let spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = newTask.status

    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("id", "d" + (index - 1).toString());
    deleteButton.innerHTML = "Delete"

    checkbox.addEventListener("click", e => {
        let rawId =  e.target.id.split("c")
        task[rawId[1]].status = "Inactive"
        e.target.disabled = true
    })

    deleteButton.addEventListener("click", e => {
        let rawId =  e.target.id.split("d")
        delete task[rawId[1]]
    })


    divItemName.appendChild(checkbox)
    divItemName.appendChild(label)

    divItemActions.appendChild(divStatus).appendChild(spanStatusItem)
    divItemActions.appendChild(deleteButton)

    divItem.appendChild(divItemName)
    divItem.appendChild(divItemActions)

    taskArea.appendChild(divItem)
}
