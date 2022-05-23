"use strict"

let Btn = document.querySelector(".add-task");
let Input = document.querySelector("input.task-title");
let Wrapper = document.querySelector(".tasks .list-group");


Btn.addEventListener("click",function () {
    if (Input.value.trim()!=0) {
        let localitems=JSON.parse(localStorage.getItem('localitem'))
        if (localitems===null) {
            var tasklist=[];
        }
        else{
            tasklist=localitems;
        }
        tasklist.push(Input.value);
        localStorage.setItem('localitem',JSON.stringify(tasklist))
    }
    if (Input.value.trim() !== "") {
        let newElement = "<li class='list-group-item active'>" + Input.value +"</li>"
        Wrapper.innerHTML = newElement + Wrapper.innerHTML ;
        Input.value = "";
    }
    else {
        alert("Empty task!");
    }
})
