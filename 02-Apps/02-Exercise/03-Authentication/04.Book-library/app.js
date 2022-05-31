function booksGrinder() {
    let url = 'http://localhost:3030/jsonstore/collections/books';
    let tableBody = document.querySelector('tbody');
    let form = document.querySelector('form');
    let formHeader = form.querySelector('h3');
    let titleInput = form.querySelector('[name="title"]');
    let authorInput = form.querySelector('[name="author"]');
    let submitButton = form.querySelector('button');
    let hidden = document.createElement('input');
    hidden.type = 'hidden';
    form.appendChild(hidden);

    attachElements(fetch(url), 'get');

    // L O A D
    document.querySelector('#loadBooks').addEventListener('click', () => {
        attachElements(fetch(url), 'get');
    })

    //C R E A T E && S A V E
    form.addEventListener('submit', ev => {
        if(submitButton.textContent === 'Submit'){
            onCreate(ev);
        } else if(submitButton.textContent === 'Save'){
            onSave(ev);
        }
    });

    // D E L E T E && E D I T
    tableBody.addEventListener('click', (ev) => {
        let id = ev.target.parentElement.parentElement.id;
        if (ev.target.textContent === 'Delete') {
            attachElements(fetch(`${url}/${id}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            }), 'delete', id)
        } else if (ev.target.textContent === 'Edit') {
            formHeader.textContent = 'Edit FORM';
            titleInput.value = ev.target.parentElement.parentElement.querySelector('td:nth-child(1)').textContent;
            authorInput.value = ev.target.parentElement.parentElement.querySelector('td:nth-child(2)').textContent;
            submitButton.textContent = 'Save';

            hidden.id = id;
        }
    })

    function onSave(ev) {
        ev.preventDefault();
        newInputs = new FormData(form);

        let id = ev.target.querySelector('input[type=hidden]').id;
        let t = newInputs.get('title')
        let a = newInputs.get('author')
        formHeader.textContent = 'FORM';
        titleInput.value = ''; authorInput.value = '';
        submitButton.textContent = 'Submit';

        attachElements(fetch(`${url}/${form.querySelector('input[type="hidden"]').id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: t,
                author: a
            })
        }), 'put', id)
    }

    function onCreate(ev) {
        ev.preventDefault();
        let inputs = new FormData(form);

        attachElements(fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: inputs.get('title'),
                author: inputs.get('author')
            })
        }), 'post')

        ev.target.reset();
    }
    ////////////DOM operations

    async function attachElements(query, method, id) {
        try {
            let response = await query;
            if (response.status !== 200) throw new Error;
            let data = await response.json();
            methods()[method](data, id);
        } catch (e) {
            alert(e.message);
        }
    }

    function methods() {
        return {
            get: function (data) {
                tableBody.replaceChildren();
                for (key in data) {
                    let tr = document.createElement('tr');
                    tr.id = key;
                    tr.innerHTML =
                        `<td>${data[key].title}</td>
<td>${data[key].author}</td>
<td>
    <button>Edit</button>
    <button>Delete</button>
</td>
`;
                    tableBody.appendChild(tr);
                }
            },
            post: function (data) {
                let tr = document.createElement('tr');
                tr.id = data._id;
                tr.innerHTML =
                    `<td>${data.title}</td>
<td>${data.author}</td>
<td>
    <button>Edit</button>
    <button>Delete</button>
</td>
`;
                tableBody.appendChild(tr);
            },
            delete: function (data, id) {
                tableBody.querySelector(`tr[id="${id}"]`).remove(); // NB! cannot use selector with special symbols
            },

            put: function (data, id) {
                tableBody.querySelector(`tr[id="${id}"]`).querySelector('td:nth-child(1)').textContent = data.title;
                tableBody.querySelector(`tr[id="${id}"]`).querySelector('td:nth-child(2)').textContent = data.author;
            }
        }
    }
}

booksGrinder();