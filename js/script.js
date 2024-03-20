(() => {
    const updateDOM = (table) => {
        const div = document.querySelector(".js-div");
        document.querySelector(".js-tasksList").remove();
        const tasksList = document.createElement("ul");
        tasksList.setAttribute("class", "js-tasksList");
        div.appendChild(tasksList);

        for (const tabElement of table) {
            const listItem = document.createElement("li");
            if (tabElement.done) listItem.setAttribute("style", "text-decoration:line-through");
            tasksList.appendChild(listItem);
            const doneItem = document.createElement("button");
            doneItem.setAttribute("class", "js-doneTask");
            doneItem.innerText = "Wykonane?";
            listItem.append(doneItem);
            listItem.append(`${tabElement.content}`);
            const deleteItem = document.createElement("button");
            deleteItem.setAttribute("class", "js-deleteTask");
            deleteItem.textContent = "Usuń?";
            listItem.appendChild(deleteItem);
        };
        deleteTasks(table);
        toggleDoneTask(table);
    };

    const addNewTask = (table) => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskContent = document.querySelector(".js-newTask");
            if (newTaskContent.value.trim() === "") return;
            table.push({ content: newTaskContent.value.trim(), });
            newTaskContent.value = "";
            updateDOM(table);
        });
    };

    const toggleDoneTask = (table) => {
        const doneButtons = document.querySelectorAll(".js-doneTask");
        doneButtons.forEach((doneTask, index) => {
            doneTask.addEventListener("click", () => {
                table[index].done = table[index].done ? false : true;
                updateDOM(table);
            });
        });
    };

    const deleteTasks = (table) => {
        const deleteButtons = document.querySelectorAll(".js-deleteTask");
        deleteButtons.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                table.splice(index, 1);
                updateDOM(table);
            });
        });
    }

    const init = () => {
        const tasksTable = [];
        addNewTask(tasksTable);
        toggleDoneTask(tasksTable);
        deleteTasks(tasksTable);
    };

    init();
}

)();