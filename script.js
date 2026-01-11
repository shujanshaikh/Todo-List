const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("todo-list");

function addTask() {
    const taskText = inputBox.value.trim();
    
    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }
    
    if (taskText.length > 100) {
        alert("Task is too long! Please keep it under 100 characters.");
        return;
    }
    
    let li = document.createElement("li");
    li.className = "todo-item";
    
    let taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;
    
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "×";
    deleteBtn.className = "delete-btn";
    
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
    
    inputBox.value = '';
    inputBox.focus();
    saveData();
    updateEmptyState();
}

function updateEmptyState() {
    const existingEmpty = document.querySelector('.empty-state');
    if (listContainer.children.length === 0) {
        if (!existingEmpty) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'Your to-do list is empty! Add a task to get started.';
            listContainer.parentElement.appendChild(emptyState);
        }
    } else {
        if (existingEmpty) {
            existingEmpty.remove();
        }
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("task-text")) {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
        updateEmptyState();
    }
}, false);

function saveData() {
    localStorage.setItem("todoData", listContainer.innerHTML);
    updateEmptyState();
}

function showTask() {
    const savedData = localStorage.getItem("todoData");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
    updateEmptyState();
}

// Clear input on Enter key
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Focus input on page load
window.addEventListener("load", function() {
    inputBox.focus();
    showTask();
});