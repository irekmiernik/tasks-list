(() => {
    const bindAddNewTaskButton = () => {

        let tasksTable = [];

        const createTasksList = () => {
            const createListItem = (ulElement, itemContent) => {
                const liElement = document.createElement("li");
                liElement.setAttribute("class", "section__flex section__flex--tasksList js-tasksListItem");
                ulElement.appendChild(liElement);

                const buttonDoneNewItem = document.createElement("button");
                buttonDoneNewItem.setAttribute("class", "section__flexItem section__flexItem--button js-doneTask");
                buttonDoneNewItem.textContent = itemContent.done ? "✔" : "";
                liElement.append(buttonDoneNewItem);

                const textNewItem = document.createElement("span");
                textNewItem.setAttribute("class", "section__flexItem js-textTasksListItem");
                if (itemContent.done) textNewItem.setAttribute("class", "section__flexItem section__taskDoneItem js-textTasksListItem");
                textNewItem.innerText = `${itemContent.content}`;
                liElement.append(textNewItem);

                const buttonDeleteNewItem = document.createElement("button");
                buttonDeleteNewItem.setAttribute("class", "section__flexItem section__flexItem--button js-deleteTask");
                buttonDeleteNewItem.textContent = "🗑";
                liElement.appendChild(buttonDeleteNewItem);
            };

            const tasksListSection = document.querySelector(".js-tasksListSection");
            document.querySelector(".js-tasksList").remove();
            const tasksList = document.createElement("ul");
            tasksList.setAttribute("class", "section__tasksList js-tasksList");
            tasksListSection.appendChild(tasksList);

            for (const tabElement of tasksTable) createListItem(tasksList, tabElement);
            console.log("tasksTable = ", tasksTable);

            bindToggleDoneTaskButton();
            bindDeleteTaskButton();
        };

        const bindToggleDoneTaskButton = () => {
            document.querySelectorAll(".js-doneTask").forEach((tasksList, tasksListIndex) => {
                tasksList.addEventListener("click", () => {

                    tasksTable = tasksTable.map((tableElement, tableElementIndex) => {
                        if (tableElementIndex === tasksListIndex)
                            tableElement = tableElement.done ? { ...tableElement, done: false, } : { ...tableElement, done: true, };
                        return tableElement;
                    });
                    createTasksList();
                    document.querySelector(".js-newTask").focus();
                });
            });
        };

        const bindDeleteTaskButton = () => {
            const deleteButtons = document.querySelectorAll(".js-deleteTask");
            deleteButtons.forEach((tasksList, tasksListIndex) => {
                tasksList.addEventListener("click", () => {
                    tasksTable = tasksTable.flatMap((tableElement, tableElementIndex) => {
                        if (tableElementIndex === tasksListIndex) return [];
                        return tableElement;
                    })
                    createTasksList();
                    document.querySelector(".js-newTask").focus();
                });
            });
        }

        document.querySelector(".js-form").addEventListener("submit", (event) => {
            event.preventDefault();
            if (document.querySelector(".js-newTask").value.trim() !== "") {
                tasksTable = [
                    ...tasksTable,
                    { content: document.querySelector(".js-newTask").value.trim(), done: false, }
                ];
                createTasksList();
            };
            document.querySelector(".js-newTask").value = "";
            document.querySelector(".js-newTask").focus();
        });
    };

    bindAddNewTaskButton();
})();