function attachEvents() {
    let textarea = document.querySelector('#messages');
    let author = document.querySelector('input[name="author"]');
    let content = document.querySelector('input[name="content"]');
    
    async function attachElements(query, method) {
        try {
            let response = await query;
            if (response.status !== 200) {
                throw new Error;
            }
            let data = await response.json();
            if (method === 'get') {
                let result = Object.keys(data).map(key => `${data[key].author}: ${data[key].content}`).join('\n');
                textarea.value = result;
            } else if (method === 'post') {
                textarea.value += `\n${data.author}: ${data.content}`;
                author.value = ''; content.value = '';
            }
        } catch (e) {
            alert(e.message);
        }
    }

    attachElements(fetch('http://localhost:3030/jsonstore/messenger'), 'get');

    document.querySelector('#controls').addEventListener('click', async function (ev) {
        if (ev.target.value === 'Send') {
            attachElements(fetch('http://localhost:3030/jsonstore/messenger', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    author: author.value,
                    content: content.value
                })
            }), 'post')

        } else if (ev.target.value === 'Refresh') {
            attachElements(fetch('http://localhost:3030/jsonstore/messenger'), 'get');
        }
    })
}

attachEvents();