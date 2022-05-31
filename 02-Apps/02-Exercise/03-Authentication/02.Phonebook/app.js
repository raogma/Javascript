function attachEvents() {
    let phonebookUl = document.querySelector('#phonebook');
    let person = document.querySelector('#person');
    let phone = document.querySelector('#phone');
    let url = 'http://localhost:3030/jsonstore/phonebook';

    attachElements(fetch(url), 'get');

    document.querySelector('#btnLoad').addEventListener('click', async function (ev) {
        attachElements(fetch(url), 'get');
    })

    phonebookUl.addEventListener('click', (ev) => {
        if (ev.target.textContent === 'Delete') {
            attachElements(fetch(`${url}/${ev.target.parentElement.id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            }), 'delete');     
        }
    })

    document.querySelector('#btnCreate').addEventListener('click', function () {
        attachElements(fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                person: person.value,
                phone: phone.value
            })
        }), 'post')
    })

    async function attachElements(query, method) {
        methodsDict = {
            get: function (data) {
                phonebookUl.replaceChildren();
                for (key in data) {
                    let li = document.createElement('li');
                    li.innerHTML = `${data[key].person}: ${data[key].phone}<button>Delete</button>`;
                    li.id = data[key]._id;
                    phonebookUl.appendChild(li);
                }
            },
            post: function (data) {
                let li = document.createElement('li');
                li.innerHTML = `${data.person}: ${data.phone}<button>Delete</button>`;
                li.id = data._id;
                phonebookUl.appendChild(li);
                person.value = '', phone.value = '';
            },
            delete: function (data) {
                console.log(data._id);
                document.querySelector(`[id="${data._id}"]`).remove(); // NB! cannot use selector with special symbols
            }
        }

        try {
            let response = await query;
            if (response.status !== 200) throw new Error;
            let data = await response.json();
            
            methodsDict[method](data);
        } catch (e) {
            alert(e.message);
        }
    }
}

attachEvents();


// 2d5ae478-87c7-45fa-acf9-f04aa4724421:
// person: "Maya"
// phone: "+1-555-7653"
// _id: "2d5ae478-87c7-45fa-acf9-f04aa4724421"