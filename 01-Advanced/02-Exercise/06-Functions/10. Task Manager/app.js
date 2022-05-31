function solve() {
    function addTaskListener(ev) {
        ev.preventDefault();
        let form = ev.target.parentElement;
        let [task, date] = Array.from(form.querySelectorAll('input'));
        let description = form.querySelector('textarea');
        task = task.value;
        date = date.value;
        description = description.value;

        if (task !== '' && date !== '' && description !== '') {
            openSection.innerHTML += `
                <article>
                    <h3>${task}</h3>
                    <p>Description: ${description}</p>
                    <p>Due Date: ${date}</p>
                    <div class="flex">
                        <button class="green">Start</button>
                        <button class="red">Delete</button>
                    </div>
                </article>
            `
            Array.from(openSection.querySelectorAll('button')).map(x => x.addEventListener('click', startTaskListener));
        }
    }

    function startTaskListener(ev) {
        let [task2, description2, date2] = Array.from(ev.target.parentElement.parentElement.children);

        if (ev.target.textContent === 'Start') {
            inProgressSection.innerHTML += `
                <article>
                    <h3>${task2.textContent}</h3>
                    <p>${description2.textContent}</p>
                    <p>${date2.textContent}</p>
                    <div class="flex">
                        <button class="red">Delete</button>
                        <button class="orange">Finish</button>
                    </div>
                </article>
            `
            Array.from(inProgressSection.querySelectorAll('button')).map(x => x.addEventListener('click', progressTaskListener));
        }
        ev.target.parentElement.parentElement.remove();
    }

    function progressTaskListener(ev) {
        let [task3, description3, date3] = Array.from(ev.target.parentElement.parentElement.children);
        if (ev.target.textContent === 'Finish') {
            completeSection.innerHTML += `
                <article>
                    <h3>${task3.textContent}</h3>
                    <p>${description3.textContent}</p>
                    <p>${date3.textContent}</p>
                </article>
            `
        }
        ev.target.parentElement.parentElement.remove();
    }

    let addTaskSection = document.querySelector('section:nth-child(1) div:nth-child(2) form');


    let openSection = document.querySelector('section:nth-child(2) div:nth-child(2)');
    let inProgressSection = document.querySelector('section:nth-child(3) div:nth-child(2)');
    let completeSection = document.querySelector('section:nth-child(4) div:nth-child(2)');

    addTaskSection.querySelector('button').addEventListener('click', addTaskListener);
}