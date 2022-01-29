"use strict"

let addTextField = document.querySelector("#addTextField")
let addButton = document.querySelector("#addButton")
let taskArea = document.querySelector("#taskArea")
let index = 0
let task = {}

addButton.addEventListener("click", () => {
    let newTask = { 
            task: addTextField.value,
            status: "Active",
        }
    task[index++] = newTask
    createItem(newTask)
    
})

function createItem(newTask){
    let divItem = document.createElement("div")
    divItem.classList.add("item")

    let divItemName = document.createElement("div")
    divItemName.classList.add("itemName")

    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", (index - 1).toString());

    let label = document.createElement("label")
    label.setAttribute("for", (index - 1).toString());
    label.innerHTML = newTask.task

    let divItemActions = document.createElement("div")
    divItemActions.classList.add("itemActions")

    let divStatus = document.createElement("div")
    divStatus.classList.add("statusActive")

    let spanStatusItem = document.createElement("span")
    spanStatusItem.innerHTML = newTask.status

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete"

    divItemName.appendChild(checkbox)
    divItemName.appendChild(label)

    divStatus.appendChild(spanStatusItem)

    divItemActions.appendChild(divStatus)
    divItemActions.appendChild(deleteButton)

    divItem.appendChild(divItemName)
    divItem.appendChild(divItemActions)

    taskArea.appendChild(divItem)
}
