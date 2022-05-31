import { sendPostRequest, getAllTopics} from './requests.js';
import { createTopic, attachTopicsForum } from './DOMOperations.js';

(async function app() {
    attachTopicsForum(await getAllTopics());

    let form = document.querySelector('form');
    document.querySelector('[class="new-topic-buttons"]').addEventListener('click', submitForm);
    document.querySelector('[class="topic-container"]').addEventListener('click', selectTopic);

    async function selectTopic(ev) {
        if (ev.target.tagName === 'H2') {
            localStorage.setItem('selectedTopicID', ev.target.id);        
            window.location = './theme-content.html';
        }
    }

    async function submitForm(ev) {
        ev.preventDefault();

        let d = new Date();
        let today = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

        if (ev.target.textContent === 'Post') {
            let inputData = new FormData(form);
            let responseData = await sendPostRequest(inputData, today);
            if (responseData !== undefined) {
                createTopic(responseData.topicName, responseData.username, responseData._id);
            }
        }
        form.reset();
    }
})()