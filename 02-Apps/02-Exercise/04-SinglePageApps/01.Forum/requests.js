export async function sendPostRequest(inputData, today) {
    try {
        let topicName = inputData.get('topicName')
        let username = inputData.get('username')
        let postText = inputData.get('postText')
        if (topicName === '' || username === '' || postText === '') throw new Error('Field cannot be empty!')
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topicName, username, postText, today })
        });
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.json();

    } catch (err) {
        alert(err.message);
    }
}

export async function sendAnswerPostRequest() {
    let answerContainer = document.querySelector('[class="answer-comment"]');
    let answerUsername = answerContainer.querySelector('#username').value;
    let answerContent = answerContainer.querySelector('textarea').value;
    let d = new Date();
    let today = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

    try {
        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                topicName: document.querySelector('h2').textContent,
                topicInfo:{ answerUsername, answerContent, today}
            })
        })
        if (response.status !== 200) throw new Error;
    } catch (e) {
        alert(e.message);
    }
}

export async function sendGetRequest(url, _id) {
    try {
        if (_id !== undefined){
            url = `${url}/${_id}`;
        }
        let response = await fetch(url);
        if (response.status !== 200) throw new Error(response.message);
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}

export async function getAllTopics() {
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`);
        if (response.status !== 200) throw new Error(response.message);
        return await response.json();
    } catch (err) {
        alert(err.message);
    }
}
