"use strict";

class Dado{
    constructor(){
        this.face = this.play();
        this.img = `../assets/die${this.face}.png`
    }

    play(){
        let value = Math.floor(1 + Math.random() * 6);
        return value;
    }
}

window.addEventListener("load", function(){
    let frequency = [0,0,0,0,0,0];
    let percent = [0,0,0,0,0,0];

    let button = document.querySelector("#rollButton");
    button.addEventListener("click", function(){
        let textField = document.querySelector("#numText").value;
        let tdsf = document.querySelectorAll(".frequency");
        let tdsp = document.querySelectorAll(".percent");
        let ordList = document.querySelector("ol");

        let sumFrequency = 0;
        let numberOfDices = textField == "" ?  0 :  parseInt(textField);
        let dices = new Array(numberOfDices);
        clear(ordList)
        start(numberOfDices,ordList, dices);


        for(let i = 0; i < numberOfDices; i++){
            frequency[dices[i].face - 1]++;
            sumFrequency = frequency.reduce((a, b) => a + b, 0);
            percent[dices[i].face - 1] = (frequency[dices[i].face - 1] / sumFrequency) * 100;
        }

        if (sumFrequency != 0){
            for(let i = 0; i < percent.length; i++){
                percent[i] = ((frequency[i] / sumFrequency) * 100).toFixed(1);
            }
    
            for(let i = 0; i < tdsf.length; i++){
                tdsf[i].innerHTML = frequency[i];
                tdsp[i].innerHTML = percent[i];
            }
        }
    });

    function clear(ordList){
        while(ordList.hasChildNodes()){
            ordList.removeChild(ordList.lastChild);
        }
    }

    function start(numberOfDices,ordList, dices){
        for(let i = 0; i < numberOfDices; i++){
            dices[i] = new Dado();
            let listItem = document.createElement("li");
            let image = document.createElement("img");
            image.src = dices[i].img;
            ordList.appendChild(listItem).appendChild(image);
        }
    }
});