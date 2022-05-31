function solution() {
    let main = document.querySelector('#main');

//on load
    function attachElements(data) {
         for(element of data){
            let itemDiv = document.createElement('div');
            itemDiv.className = 'accordion';
            itemDiv.innerHTML = 
`<div class="head">
<span>${element.title}</span>
<button class="button" id="${element._id}">More</button>
</div>
`
            main.appendChild(itemDiv);
         }
    }

    async function getResponseTitles(){
        try {
            let response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
            if(response.status !== 200) throw new Error;
            
            let data = await response.json();
            attachElements(data);
        } catch(error) {
            alert('Error');
        }
    }
    getResponseTitles();

// on click
    function attachElements2(data, elementToAppend){
        let contentDiv = document.createElement('div');
        contentDiv.className = 'extra';
        contentDiv.innerHTML = `<p>${data.content}</p>`;
        elementToAppend.appendChild(contentDiv);
        contentDiv.style.display = 'block';
    }

    async function getResponseHidden(id, elementToAppend){
        try {
            let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            if (response.status !== 200) {
                throw new Error;
            }

            let data = await response.json();
            attachElements2(data, elementToAppend);


        } catch (error) {
            alert('Error');
        }
    }

    main.addEventListener('click', ev => {
        let accordion = ev.target.parentElement.parentElement;
        if (ev.target.textContent === 'More'){
            ev.target.textContent = 'Less';
            if(accordion.querySelector('.extra') === null){
                getResponseHidden(ev.target.id, accordion);
            } else {
                accordion.querySelector('.extra').style.display = 'block';
            }
            
        } else if(ev.target.textContent === 'Less'){
            accordion.querySelector('.extra').style.display = 'none';
            ev.target.textContent = 'More';
        }
    })
}

solution();


// {_id: 'ee9823ab-c3e8-4a14-b998-8c22ec246bd3', title: 'Scalable Vector Graphics'}
// 1: {_id: 'fdf00227-084f-48bc-a450-9242a0963f1f', title: 'Open standard'}
// 2: {_id: '8cd30492-3c55-4864-a1a2-7870e1694116', title: 'Unix'}
// 3: {_id: '9d776e93-bc6f-408c-9ab8-8aad7a5cffc4', title: 'ALGOL'}