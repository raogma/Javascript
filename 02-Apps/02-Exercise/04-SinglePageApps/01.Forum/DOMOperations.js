import { sendGetRequest } from "./requests.js";

export function createTopic(topicName, username, _id){
    let d = new Date();
    let today = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

    document.querySelector('[class="topic-container"]').innerHTML += 
`<div class="topic-name-wrapper">
    <div class="topic-name">
        <a href="#" class="normal">
            <h2 id="${_id}">${topicName}</h2>
        </a>
        <div class="columns">
            <div>
                <p>Date: <time>${today}</time></p>
                <div class="nick-name">
                    <p>Username: <span>${username}</span></p>
                </div>
            </div>
        </div>
    </div>
</div>
`
}

export function attachTopicsForum(data){
    for(let key in data){
        let divContainer = document.createElement('div');
        divContainer.className = 'topic-name-wrapper';
        divContainer.innerHTML =
`<div class="topic-name">
<a href="#" class="normal">
    <h2 id="${data[key]._id}">${data[key].topicName}</h2>
</a>
<div class="columns">
    <div>
        <p>Date: <time>${data[key].today}</time></p>
        <div class="nick-name">
            <p>Username: <span>${data[key].username}</span></p>
        </div>
    </div>
</div>
</div>
`
        document.querySelector('[class="topic-container"]').appendChild(divContainer);
    }
}   

export function loadCurrentComment(responseDataTopic, responseDataComment){
    let divContainer = document.querySelector('.container')
    divContainer.innerHTML =
`<!-- theme content  -->
<div class="theme-content">
    <!-- theme-title  -->
    <div class="theme-title">
        <div class="theme-name-wrapper">
            <div class="theme-name">
                <h2>${responseDataTopic.topicName}</h2>
            </div>
        </div>
    </div>
    <!-- comment  -->

    <div class="comment">
        <div class="header">
            <img src="./static/profile.png" alt="avatar">
            <p><span>${responseDataTopic.username}</span> posted on <time>${responseDataTopic.today}</time></p>
            <p class="post-content">${responseDataTopic.postText}</p>
        </div>
    </div>
</div>
`
    let commentContainer = document.querySelector('.comment');

    for(let key in responseDataComment){
        if(responseDataComment[key]['topicName'] === document.querySelector('h2').textContent){
            let div = document.createElement('div');
            div.id = 'user-comment';
            div.innerHTML = 
`<div class="topic-name-wrapper">
    <div class="topic-name">
        <p><strong>${responseDataComment[key]['topicInfo']['answerUsername']}</strong> commented on <time>${responseDataComment[key]['topicInfo']['today']}</time></p>
        <div class="post-content">
            <p>${responseDataComment[key]['topicInfo']['answerContent']}</p>
        </div>
    </div>
</div>
`
            commentContainer.appendChild(div);
        }
    }

    document.querySelector('[class="theme-content"]').innerHTML += 
`<div class="answer-comment">
<p><span>currentUser</span> comment:</p>
<div class="answer">
    <form>
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <button>Post</button>
    </form>
</div>
</div>
`
}