const render = (tab) => {
    let htmlString = "";

    for (const task of tab) {

        htmlString += `
    <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
        ${task.content}
    </li>
    `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;
}

const init = () => {
    const tasksList = [
        {
            content: "Przeczytaj!",
            done: true,
        },
        {
            content: "Ustaw bloczki",
            done: false,
        },
    ];

    render(tasksList);

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") return;
        tasksList.push({ content: newTaskContent, });

        render(tasksList);
    })

};

init();