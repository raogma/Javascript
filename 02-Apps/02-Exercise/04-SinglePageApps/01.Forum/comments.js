import { loadCurrentComment } from './DOMOperations.js';
import {sendGetRequest, sendAnswerPostRequest} from './requests.js';

(async function comments(){
    document.querySelector('.container').innerHTML = 'Loading...';
    let _id = localStorage.getItem('selectedTopicID');
    let responseDataTopic = await sendGetRequest('http://localhost:3030/jsonstore/collections/myboard/posts', _id);
    let responseDataComment = await sendGetRequest('http://localhost:3030/jsonstore/collections/myboard/comments');

    loadCurrentComment(responseDataTopic, responseDataComment);

    //Home button
    document.querySelector('nav a').addEventListener('click', ev => {
        window.location = './index.html';
    })
    document.querySelector('button').addEventListener('click', ev =>{
        sendAnswerPostRequest();
    });
})()