(() => {
    const addNewTaskButton = () => {
        let tasksTable = [];
        let hideDoneTasks = false;

        document.querySelector(".js-form").addEventListener("submit", (event) => {
            event.preventDefault();
            if (document.querySelector(".js-newTask").value.trim() !== "") {
                tasksTable = [
                    ...tasksTable,
                    { content: document.querySelector(".js-newTask").value.trim(), done: false, }
                ];
                render();
            };
            document.querySelector(".js-newTask").value = "";
            document.querySelector(".js-newTask").focus();
        });
        const render = () => {
            const createHideAndAllDoneTasksButtons = () => {
                if (document.querySelector(".js-hideDoneTasksButton")) document.querySelector(".js-hideDoneTasksButton").remove();
                if (document.querySelector(".js-allDoneTasksButton")) document.querySelector(".js-allDoneTasksButton").remove();

                if (tasksTable.length > 0) {
                    const hide = document.createElement("button");
                    hide.setAttribute("class", "sectionFlex__itemButton js-hideDoneTasksButton");
                    hide.textContent = hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone";
                    document.querySelector(".js-section__header").appendChild(hide);
                    hideDoneTasksButton();

                    const allDoneTasksButton = document.createElement("button");
                    allDoneTasksButton.setAttribute("class", "sectionFlex__itemButton js-allDoneTasksButton");
                    if (tasksTable.filter((tableElement,) => {
                        if (!tableElement.done) return tableElement;
                    }).length === 0) allDoneTasksButton.setAttribute("disabled", "");
                    allDoneTasksButton.textContent = "Ukończ wszystkie";
                    document.querySelector(".js-section__header").appendChild(allDoneTasksButton);
                    markAllDoneTasksButton();
                };
            };
            const createTasksList = () => {
                const createListItem = (ulElement, itemContent) => {
                    const listItem = document.createElement("li");
                    let listItemAttribute = "sectionFlex sectionFlex--tasksList";
                    if (hideDoneTasks && itemContent.done) listItemAttribute = "tasksListItemHidden";
                    listItem.setAttribute("class", listItemAttribute);
                    ulElement.appendChild(listItem);

                    const buttonDoneItem = document.createElement("button");
                    const buttonDoneItemAttribute = "sectionFlex__itemButton sectionFlex__itemButton--done js-doneTask";
                    buttonDoneItem.setAttribute("class", buttonDoneItemAttribute);
                    if (itemContent.done) buttonDoneItem.textContent = "✔";
                    listItem.append(buttonDoneItem);

                    const textItem = document.createElement("span");
                    let textItemAttribute = "sectionFlex__itemContent";
                    if (itemContent.done) textItemAttribute += " tasksListItemDone";
                    textItem.setAttribute("class", textItemAttribute);
                    textItem.innerText = `${itemContent.content}`;
                    listItem.append(textItem);

                    const buttonDeleteItem = document.createElement("button");
                    const buttonDeleteItemAttribute = "sectionFlex__itemButton sectionFlex__itemButton--delete js-deleteTask";
                    buttonDeleteItem.setAttribute("class", buttonDeleteItemAttribute);
                    buttonDeleteItem.textContent = "🗑";
                    listItem.appendChild(buttonDeleteItem);
                };

                const tasksListSection = document.querySelector(".js-tasksListSection");
                document.querySelector(".js-tasksList").remove();
                const tasksList = document.createElement("ul");
                tasksList.setAttribute("class", "sectionTasksList js-tasksList");
                tasksListSection.appendChild(tasksList);

                for (const tabElement of tasksTable) { createListItem(tasksList, tabElement); }

                toggleDoneTaskButton();
                deleteTaskButton();
            };
            createHideAndAllDoneTasksButtons();
            createTasksList();
        };
        const toggleDoneTaskButton = () => {
            document.querySelectorAll(".js-doneTask").forEach((tasksList, tasksIndex) => {
                tasksList.addEventListener("click", () => {
                    tasksTable = [...tasksTable.slice(0, tasksIndex),
                    { ...tasksTable[tasksIndex], done: !tasksTable[tasksIndex].done, },
                    ...tasksTable.slice(tasksIndex + 1),];
                    render();
                    document.querySelector(".js-newTask").focus();
                });
            });
        };
        const deleteTaskButton = () => {
            document.querySelectorAll(".js-deleteTask").forEach((removeButton, taskIndex) => {
                removeButton.addEventListener("click", () => {
                    tasksTable = [...tasksTable.slice(0, taskIndex), ...tasksTable.slice(taskIndex + 1)];
                    render();
                    document.querySelector(".js-newTask").focus();
                });
            });
        };
        const hideDoneTasksButton = () => {
            document.querySelector(".js-hideDoneTasksButton").addEventListener("click", () => {
                hideDoneTasks = hideDoneTasks ? false : true;
                render();
                document.querySelector(".js-newTask").focus();
            });
        };
        const markAllDoneTasksButton = () => {
            document.querySelector(".js-allDoneTasksButton").addEventListener("click", () => {
                tasksTable = tasksTable.map((tableElement,) => tableElement = { ...tableElement, done: true, });
                render();
                document.querySelector(".js-newTask").focus();
            });
        };
    };
    addNewTaskButton();
})();