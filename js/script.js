(() => {
    const addNewTaskButton = () => {
        const createHideAndAllDoneTasksButtons = () => {
            if (!document.querySelector(".js-hideDoneTasksButton")) {
                const hide = document.createElement("button");
                hide.setAttribute("class", "sectionFlex__itemButton js-hideDoneTasksButton");
                hide.textContent = "Ukryj ukończone";
                document.querySelector(".js-section__header").appendChild(hide);
                hideDoneTasksButton();
            };

            if (!document.querySelector(".js-allDoneTasksButton")) {
                const allDoneTasksButton = document.createElement("button");
                allDoneTasksButton.setAttribute("class", "sectionFlex__itemButton js-allDoneTasksButton");
                allDoneTasksButton.textContent = "Ukończ wszystkie";
                document.querySelector(".js-section__header").appendChild(allDoneTasksButton);
                markAllDoneTasksButton();
            } else document.querySelector(".js-allDoneTasksButton").removeAttribute("disabled");
        };
        const createTasksList = (newTaskContent) => {
            const createListItem = (ulElement, itemContent) => {
                const listItem = document.createElement("li");
                listItem.setAttribute("class", "sectionFlex sectionFlex--tasksList js-li");
                ulElement.appendChild(listItem);

                const buttonDoneItem = document.createElement("button");
                buttonDoneItem.setAttribute("class", "sectionFlex__itemButton sectionFlex__itemButton--done js-doneTask");
                listItem.append(buttonDoneItem);

                const textItem = document.createElement("span");
                textItem.setAttribute("class", "sectionFlex__itemContent js-itemContent");
                textItem.textContent = itemContent;
                listItem.append(textItem);

                const buttonDeleteItem = document.createElement("button");
                buttonDeleteItem.setAttribute("class", "sectionFlex__itemButton sectionFlex__itemButton--delete js-deleteTask");
                buttonDeleteItem.textContent = "🗑";
                listItem.appendChild(buttonDeleteItem);
            };
            const tasksList = document.querySelector(".js-tasksList");
            createListItem(tasksList, newTaskContent);
            toggleDoneTaskButton();
            deleteTaskButton();
        };
        document.querySelector(".js-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskValue = document.querySelector(".js-newTask");
            if (newTaskValue.value.trim() !== "") {
                createTasksList(newTaskValue.value.trim());
                createHideAndAllDoneTasksButtons();
            };
            document.querySelector(".js-newTask").value = "";
            document.querySelector(".js-newTask").focus();
        });
        const toggleAllDoneTasksButton = (listDoneTaskButtons) => {
            let i = 0;
            listDoneTaskButtons.forEach((element) => {
                i += element.textContent === "✔" ? 1 : 0;
            });
            if (i === listDoneTaskButtons.length) document.querySelector(".js-allDoneTasksButton").setAttribute("disabled", "");
            else document.querySelector(".js-allDoneTasksButton").removeAttribute("disabled");
        };
        const toggleDoneTaskButton = () => {
            const resetEventList = () => {
                document.querySelectorAll(".js-doneTask").forEach((task) => {
                    const newButt = document.createElement("button");
                    newButt.setAttribute("class", task.getAttribute("class"));
                    newButt.textContent = task.textContent;
                    task.replaceWith(newButt);
                });
            };
            resetEventList();

            const tasksListContent = document.querySelectorAll(".js-itemContent");
            document.querySelectorAll(".js-doneTask").forEach((task, index) => {
                task.addEventListener("click", () => {
                    if (task.textContent === "✔") {
                        task.textContent = "";
                        tasksListContent[index].classList.remove("itemContentDone");
                    } else {
                        task.textContent = "✔";
                        tasksListContent[index].classList.add("itemContentDone");
                    };
                    toggleAllDoneTasksButton(document.querySelectorAll(".js-doneTask"));
                    document.querySelector(".js-newTask").focus();
                });
            });
        };
        const deleteTaskButton = () => {
            const tasksList = document.querySelectorAll(".js-li");
            document.querySelectorAll(".js-deleteTask").forEach((task, index) => {
                task.addEventListener("click", () => {
                    tasksList[index].remove();
                    if (document.querySelectorAll(".js-li").length === 0) {
                        if (document.querySelector(".js-hideDoneTasksButton")) {
                            document.querySelector(".js-hideDoneTasksButton").remove();
                        };
                        if (document.querySelector(".js-allDoneTasksButton")) {
                            document.querySelector(".js-allDoneTasksButton").remove();
                        };
                    };
                    toggleAllDoneTasksButton(document.querySelectorAll(".js-doneTask"));
                    document.querySelector(".js-newTask").focus();
                });
            });
        };
        const hideDoneTasksButton = () => {
            document.querySelector(".js-hideDoneTasksButton").addEventListener("click", () => {
                document.querySelector(".js-hideDoneTasksButton").textContent =
                    (document.querySelector(".js-hideDoneTasksButton").textContent === "Ukryj ukończone")
                        ? "Pokaż ukończone" : "Ukryj ukończone";

                if (document.querySelector(".js-hideDoneTasksButton").textContent === "Pokaż ukończone") {
                    document.querySelectorAll(".js-doneTask").forEach((task, index) => {
                        if (task.textContent === "✔") {
                            document.querySelectorAll(".js-li")[index].setAttribute("class", "tasksListItemHidden js-li");
                        };
                    });
                } else {
                    document.querySelectorAll(".js-li").forEach((task) => {
                        task.setAttribute("class", "sectionFlex sectionFlex--tasksList js-li");
                    });
                };
                document.querySelector(".js-newTask").focus();
            });
        };
        const markAllDoneTasksButton = () => {
            document.querySelector(".js-allDoneTasksButton").addEventListener("click", () => {
                const listItemContent = document.querySelectorAll(".js-itemContent");
                document.querySelectorAll(".js-doneTask").forEach((task, index) => {
                    task.textContent = "✔";
                    listItemContent[index].classList.add("itemContentDone");
                    document.querySelector(".js-newTask").focus();
                });
                document.querySelector(".js-allDoneTasksButton").setAttribute("disabled", "");
            });
        };
    };
    addNewTaskButton();
})();