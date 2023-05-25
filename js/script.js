const render = (tab) => {
    let htmlString = "";

    for (const task of tab) {

        htmlString += `
    <li>
    ${task.content}
    </li>
    `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;
}

const init = () => {
    const taskList = [
        {
            content: "Przeczytaj!",
            done: true
        },
    ];

    render(taskList);
};

init();