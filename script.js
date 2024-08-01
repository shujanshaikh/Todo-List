const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("todo-list");

function addTask() {
    if (inputBox.value === '') {
        alert("Input Needed");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let spam = document.createElement("spam");
        spam.innerHTML = "\u00d7";
        li.appendChild(spam);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAM") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data" , listContainer.innerHTML)
} 

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
