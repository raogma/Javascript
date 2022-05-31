function attachEvents() {

    let postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    let commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    let title = document.querySelector('#post-title');
    let postsSelect = document.querySelector('#posts');
    let commentsUl = document.querySelector('#post-comments');
    let bodyUl = document.querySelector('#post-body');

    let loadBtn = document.querySelector('#btnLoadPosts');
    let viewBtn = document.querySelector('#btnViewPost');

    async function getPosts() {
        try {
            let response = await fetch(postsUrl);
            if (response.status !== 200) throw new Error;
            return await response.json();
        } catch (e) {
            alert(e.message);
        }
    }
    async function getComments() {
        try {
            let response = await fetch(commentsUrl);
            if (response.status !== 200) throw new Error;
            return await response.json();
        } catch (e) {
            alert(e.message);
        }
    }

    loadBtn.addEventListener('click', async function (ev) {
        let data = await getPosts();
        for (let key in data) {
            let option = document.createElement('option');
            option.value = data[key]['id'];
            option.textContent = data[key]['title'];
            postsSelect.appendChild(option);
        }
        loadBtn.disabled = true;
    })

    viewBtn.addEventListener('click', async function (ev) {
        let currentId = postsSelect.value;

        let [contentData, commentsData] = await Promise.all([getPosts(), getComments()]);
    //body Section
        for (let key in contentData){ 
            if(contentData[key]['id'] === currentId) {
                bodyUl.textContent = contentData[key]['body'];
                title.textContent = contentData[key]['title'];
                break;
            }
        }
    //comment Section
        commentsUl.replaceChildren();

        for(let key in commentsData){
            if (commentsData[key]['postId'] === currentId) {
                let li = document.createElement('li');
                li.textContent = commentsData[key]['text'];
                li.id = currentId;
                commentsUl.appendChild(li);
            }
        }
    })
}

attachEvents();


// -MSbypx-13fHPDyzNRtf:
// body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis maiores eligendi quos quidem ex numquam hic. Eos quos similique voluptates accusamus quae voluptas magni ad a ipsum, quia enim debitis cumque quibusdam exercitationem architecto sint nostrum dolorum dolor repudiandae nulla deserunt, dolorem itaque!"
// id: "-MSbypx-13fHPDyzNRtf"
// title: "Unit Testing And Modules"

//comments
// -MSgyQMjBNfYjW2m6r97:
// id: "-MSgyQMjBNfYjW2m6r97"
// postId: "-MSbypx-13fHPDyzNRtf"
// text: "A very interesting post!"