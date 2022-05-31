function lockedProfile() {
    let main = document.querySelector('#main')

    async function getResponse(){
        let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let data = await response.json();

        let i = 1;
        for (id in data){
            i ++;
            let profile = document.createElement('div');
            profile.className = 'profile';
            profile.innerHTML = 
`<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user${i}Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user${i}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${i}Username" value="${data[id]['username']}" disabled readonly />
<div class="hiddenInfo">
    <hr>
    <label>Email:</label>
    <input type="email" name="user${i}Email" value="${data[id]['email']}" disabled readonly />
    <label>Age:</label>
    <input type="email" name="user${i}Age" value="${data[id]['age']}" disabled readonly />
</div>
            
<button>Show more</button>
`
            main.appendChild(profile);
        }
    }
    getResponse();

    main.addEventListener('click', ev => {
        function checkRadioState(profileElement) {
            let options = Array.from(profileElement.querySelectorAll('input[type="radio"]'));
            for (radio of options) {
                if(radio.checked){
                    return radio.value;
                }
            }
        }
        let profileElement = ev.target.parentElement;
        let hiddenInfo = [
            Array.from(profileElement.querySelectorAll('.hiddenInfo input')),
            Array.from(profileElement.querySelectorAll('.hiddenInfo label'))
        ];
        let state = '';

        if (ev.target.textContent === 'Show more') {
            state = checkRadioState(profileElement);
            if (state === 'unlock'){
                hiddenInfo.map(x => {
                    x.map(subX => subX.style.display = 'block')
                });
                ev.target.textContent = 'Hide it';
            }
        } else if (ev.target.textContent === 'Hide it'){
            state = checkRadioState(profileElement);
            if (state === 'unlock'){
                ev.target.textContent = 'Show more';
                hiddenInfo.map(x => {
                    x.map(subX => subX.style.display = 'none')
                });
            }
        }
    })
}


// 4fccdb3a-59c9-4e45-a28f-870fe5d1d8be:
    // age: 23
    // email: "peter@users.bg"
    // username: "Peter"
    // _id: "4fccdb3a-59c9-4e45-a28f-870fe5d1d8be"