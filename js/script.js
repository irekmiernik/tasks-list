(() => {
    const renderTasksList = (table) => {
        let htmlString = "";
        for (const tabElement of table) {

            htmlString += `
            <li ${tabElement.done ? "style=\"text-decoration: line-through\"" : ""}>
                <button class="js-doneTask">Wykonane?</button>
                ${tabElement.content}
                <button class="js-deleteTask">Usuń</button>
            </li>`;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
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
            renderTasksList(table);
        });
    };

    const toggleDoneTask = (table) => {
        const doneButtons = document.querySelectorAll(".js-doneTask");
        doneButtons.forEach((doneTask, index) => {
            doneTask.addEventListener("click", () => {
                table[index].done = table[index].done ? false : true;
                renderTasksList(table);
            });
        });
    };

    const deleteTasks = (table) => {
        const deleteButtons = document.querySelectorAll(".js-deleteTask");
        deleteButtons.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                table.splice(index, 1);
                renderTasksList(table);
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