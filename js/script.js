{
    const deleteTasks = (tab) => {
        const deleteButtons = document.querySelectorAll(".js-deleteTask");

        deleteButtons.forEach((deleteTask, index) => {
            deleteTask.addEventListener("click", () => {
                tab.splice(index, 1);
                render(tab);
            });
        });
    }

    const toggleDoneTaksButton = (tab) => {
        const doneButtons = document.querySelectorAll(".js-doneTask");

        doneButtons.forEach((doneTask, index) => {
            doneTask.addEventListener("click", () => {
                tab[index].done = !tab[index].done;
                render(tab);
            });
        });
    }

    const render = (tab) => {
        let htmlString = "";

        for (const task of tab) {

            htmlString += `
            <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
                 ${task.content}
                 <button class="js-deleteTask">Usuń</button>
                 <button class="js-doneTask">Wykonane?</button>
            </li>
            `;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;

        deleteTasks(tab);
        toggleDoneTaksButton(tab);
    }

    const placeNewTaskOnList = (tab) => {
        const newTaskContent = document.querySelector(".js-newTask");
        if (newTaskContent.value.trim() === "") return;
        tab.push({ content: newTaskContent.value.trim(), });
        newTaskContent.value = "";
        render(tab);
    };

    const addNewTask = (table) => {
        const onSubmitClick = (event) => {
            event.preventDefault();
            placeNewTaskOnList(table);
        };
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onSubmitClick);
    }

    const init = () => {

        const tasksList = [
            { content: "Przeczytaj!", done: true, },
            { content: "Ustaw bloczki", done: false, },
        ];

        render(tasksList);
        addNewTask(tasksList);

    };

    init();
}