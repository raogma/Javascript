window.addEventListener('load', solve);

function solve() {
    let form = document.querySelector('#append-song .first-container .container-text form');

    //3buttons
    let likeField = document.querySelector('.likes p')
    let totalLikes = 0;

    let savedField = document.querySelector('.saved-container')

    //
    form.querySelector('#add-btn').addEventListener('click', (ev) => {
        let inputs = Array.from(form.querySelectorAll('input'));
        let startingLength = inputs.length;
        // check for empty fields
        inputs = inputs.filter(x => x.value !== '')

        //else do nothing
        if (inputs.length === startingLength) {

            //getting info
            ev.preventDefault();
            let [genre, singer, author, date] = inputs;

            //info
            let allHitsContainer = document.querySelector('#all-hits .all-hits-container');
            let divInfo = document.createElement('div');
            divInfo.classList.add('hits-info');

            divInfo.innerHTML = `
<img src="./static/img/img.png">
<h2>Genre: ${genre.value}</h2>
<h2>Name: ${singer.value}</h2>
<h2>Author: ${author.value}</h2>
<h3>Date: ${date.value}</h2>
<button class="save-btn">Save song</button>
<button class="like-btn">Like song</button>
<button class="delete-btn">Delete</button>
`
            allHitsContainer.appendChild(divInfo);

            inputs = inputs.map(x => x.value = '')


            //manipulating song
            divInfo.addEventListener('click', (ev) => {
                if (ev.target.className.startsWith('save')){
                    let currentDiv = ev.target.parentElement;
                    let [genre, singer, author] = Array.from(currentDiv.querySelectorAll('h2'));
                    let date = currentDiv.querySelector('h3');
                    let savedDiv = document.createElement('div');
                    savedDiv.classList.add('hits-info');

                    savedDiv.innerHTML =`
<img src="./static/img/img.png">
<h2>${genre.textContent}</h2>
<h2>${singer.textContent}</h2>
<h2>${author.textContent}</h2>
<h3>${date.textContent}</h2> 
<button class="delete-btn">Delete</button>
                    `
                    savedField.appendChild(savedDiv);
                    currentDiv.remove();

                    //last delete
                    savedDiv.querySelector('button').addEventListener('click', (ev) => {
                        ev.target.parentElement.remove();
                    })

                } else if(ev.target.className.startsWith('like')) {
                    totalLikes ++;
                    likeField.textContent = `Total Likes: ${totalLikes}`;
                    ev.target.disabled = true;

                } else if(ev.target.className.startsWith('delete')) {
                    ev.target.parentElement.remove();
                }
            })
        }
    })
}