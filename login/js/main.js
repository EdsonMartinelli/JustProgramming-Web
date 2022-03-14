"use strict"

const email = document.querySelector("#email")
const password = document.querySelector("#password")
const button = document.querySelector("#loginButton")

email.addEventListener("change", (e) => { emailConsistency(e) })
password.addEventListener("change", (e) => { passwordConsistency(e) })

email.addEventListener("keyup", (e) => { emailConsistency(e) })
password.addEventListener("keyup", (e) => { passwordConsistency(e) })

button.addEventListener("click", (e) => {
    if (verifyPassword(password) && verifyEmail(email)){
        window.alert("Login realizado com sucesso!")
    } else {
        window.alert("Dados incorretos!")
    }
})

function emailConsistency(e){
    const error = e.target.nextElementSibling
    errorHandle(error, !verifyEmail(e.target))
}

function passwordConsistency(e){
    const error = e.target.nextElementSibling;
    errorHandle(error, !verifyPassword(e.target))
}

function errorHandle(element, conditions){
    const classes = element.classList
    conditions ? classes.add("showError") : classes.remove("showError")
}

function verifyPassword(passwordField){
    const password = passwordField.value
    if (password.includes(" ") || password.length < 8) return false
    return true
}

function verifyEmail(emailField){
    const email = emailField.value

    const parts = email.split("@")
    if (parts.length != 2) return false
    if (parts[0].length < 1 || parts[1].length < 3) return false

    const secondPart = parts[1].split(".")
    if (secondPart.length != 2) return false
    if (secondPart[0].length < 1 || secondPart[1].length < 1 ) return false

    return true
}