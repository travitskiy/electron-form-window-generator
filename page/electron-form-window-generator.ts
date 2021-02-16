import {ipcRenderer} from "electron";
const id = document.location.hash.replace('#', '');
let formHTML = ipcRenderer.sendSync(`electron-form-window-generator:get-formHTML:${id}`)
let form = document.forms[0];
let buttonEnter = document.getElementById('#enter');

document.getElementById("form-container").innerHTML = formHTML;

form.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        returnFormValues();
    }
});
form.addEventListener('submit', returnFormValues);

function returnFormValues(){
    if (!form.reportValidity())
        return false

    let data = {}
    for(let input of Array.from(form.querySelectorAll("input"))){
        // @ts-ignore
        data[input.name] = input.value
    }

    ipcRenderer.sendSync(`electron-form-window-generator:submit:${id}`, data)
}
