(() => {
    const updateDOM = (table) => {
        const tasksListSection = document.querySelector(".js-tasksListSection");
        document.querySelector(".js-tasksListDiv").remove();
        const tasksListDiv = document.createElement("div");
        tasksListDiv.setAttribute("class", "tasksListDiv js-tasksListDiv");
        tasksListSection.appendChild(tasksListDiv);

        for (const tabElement of table) {
            const listItem = document.createElement("div");
            listItem.setAttribute("class", "flex flex--tasksList js-listItem");
            tasksListDiv.appendChild(listItem);

            const doneItem = document.createElement("button");
            doneItem.setAttribute("class", "flex__item flex__item--button js-doneTask");
            if (tabElement.done) doneItem.innerText = "✅"; else doneItem.innerText = "🟩";
            listItem.append(doneItem);

            const textItem = document.createElement("span");
            textItem.setAttribute("class", "flex__item js-textItem");
            if (tabElement.done) textItem.setAttribute("class", "flex__item js-textItem js-textDecoration");
            textItem.innerText = `${tabElement.content}`;
            listItem.append(textItem);

            const deleteItem = document.createElement("button");
            deleteItem.setAttribute("class", "flex__item flex__item--button js-deleteTask");
            deleteItem.textContent = "❌";
            listItem.appendChild(deleteItem);
            tasksListDiv.appendChild(document.createElement("hr"));
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
            newTaskContent.focus();
            updateDOM(table);
        });
    };

    const toggleDoneTask = (table) => {
        const doneButtons = document.querySelectorAll(".js-doneTask");
        doneButtons.forEach((doneTask, index) => {
            doneTask.addEventListener("click", () => {
                table[index].done = table[index].done ? false : true;
                document.querySelector(".js-newTask").focus();
                updateDOM(table);
            });
        });
    };

    const deleteTasks = (table) => {
        const deleteButtons = document.querySelectorAll(".js-deleteTask");
        deleteButtons.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                table.splice(index, 1);
                document.querySelector(".js-newTask").focus();
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
})();