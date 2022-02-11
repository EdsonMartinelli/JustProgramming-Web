"use strict"

const email = document.querySelector("#email")
const password = document.querySelector("#password")

email.addEventListener("change", (e) => { emailConsistency(e) })
password.addEventListener("change", (e) => { passwordConsistency(e) })

email.addEventListener("keyup", (e) => { emailConsistency(e) })
password.addEventListener("keyup", (e) => { passwordConsistency(e) })

function emailConsistency(e){
    const elementValue = e.target.value
    const error = e.target.nextElementSibling;
    errorHandle(error, !verifyEmail(elementValue))
}

function passwordConsistency(e){
    const elementValue = e.target.value
    const error = e.target.nextElementSibling;
    errorHandle(error, elementValue.includes(" ") || elementValue.length < 8)
}

function errorHandle(element, conditions){
    const classes = element.classList
    conditions ? classes.add("showError") : classes.remove("showError")
}

function verifyEmail(email){
    const parts = email.split("@")
    if(parts.length != 2){
        return false
    }

    if(parts[0].length < 1 || parts[1].length < 3){
        return false
    }

    const secondPart = parts[1].split(".")
    if(secondPart.length != 2){
        return false
    }

    if(secondPart[0].length < 1 || secondPart[1].length < 1 ){
        return false
    }
    return true
}