function app() {
   let loginBtn = document.querySelector('a[id="login"]');
   let registerBtn = document.querySelector('a[id="register"]');
   let logoutBtn = document.querySelector('a[id="logout"]');

   let userEmail = document.querySelector('.email span');
   let userData = JSON.parse(localStorage.getItem('userData'));

   let main = document.querySelector('#main');
   let addForm = document.querySelector('#addForm');
   let addBtn = addForm.querySelector('button');

   document.querySelector('aside .load').addEventListener('click', load);

   if (userData !== null) {
      preparePage('logged in');
      logoutBtn.addEventListener('click', onLogout);
      addForm.addEventListener('submit', addCatch);
      main.querySelector('#catches').addEventListener('click', onClick);

   } else {
      preparePage('not logged in');
   }

   async function addCatch(ev) {
      ev.preventDefault();

      let formData = new FormData(ev.target)

      let data = await sendPostRequest(formData);
      createDOMCAtch(data)
   }

   async function load() {
      main.querySelector('#catches').replaceChildren();

      let response = await fetch('http://localhost:3030/data/catches');
      if (response.status !== 200) throw new Error(response.statusText);
      let data = await response.json();
      for (let element of data) {
         createDOMCAtch(element);
      }

      Array.from(main.querySelectorAll('button')).map(x => {
         if(userData === null){ 
            x.disabled = true;
            return
         }
         if (x.parentElement.id !== userData.ownerId) x.disabled = true;
      })
   }

   async function onClick(ev) {
      let divContainer = ev.target.parentElement;
      let _id = ev.target.id;
      
      if (ev.target.textContent === 'Update') {
         sendPutRequest(_id, Array.from(divContainer.querySelectorAll('input')));

      } else if (ev.target.textContent === 'Delete') {
         sendDeleteRequest(_id);
         divContainer.remove();
      }
   }

   async function onLogout() {
      try {
         let response = await fetch('http://localhost:3030/users/logout', {
            headers: { 'X-Authorization': userData.token }
         });
         localStorage.clear();
         window.location = './index.html';
         if (response.status !== 200) throw new Error
      } catch (e) {
         alert(e.message);
      }
   }

   function createDOMCAtch(data) {
      let divCatch = document.createElement('div');
      divCatch.classList.add('catch');
      divCatch.id = data._ownerId;
      divCatch.innerHTML =
         `<label>Angler</label>
<input type="text" class="angler" value="${data.angler}">
<label>Weight</label>
<input type="text" class="weight" value="${data.weight}">
<label>Species</label>
<input type="text" class="species" value="${data.species}">
<label>Location</label>
<input type="text" class="location" value="${data.location}">
<label>Bait</label>
<input type="text" class="bait" value="${data.bait}">
<label>Capture Time</label>
<input type="number" class="captureTime" value="${data.captureTime}">
<button class="update" id="${data._id}">Update</button>
<button class="delete" id="${data._id}">Delete</button>
`;
      main.querySelector('#catches').appendChild(divCatch);
   }

   function preparePage(state) {
      Array.from(main.querySelectorAll('#catches .catch'))
         .map(x => x.remove());

      if (state === 'logged in') {
         addBtn.disabled = false;
         loginBtn.style.display = 'none';
         registerBtn.style.display = 'none';
         userEmail.textContent = userData.email;
         main.style.display = 'inline-block';
         logoutBtn.style.display = 'inline-block';
      } else if (state === 'not logged in') {
         logoutBtn.style.display = 'none';
         loginBtn.style.display = 'inline-block';
         registerBtn.style.display = 'inline-block';
      }
   }

   async function sendPutRequest(_id, inputDataList){
      let [angler, weight, species, location, bait, captureTime] = inputDataList;

      try {
         let response = await fetch(`http://localhost:3030/data/catches/${_id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'X-Authorization': userData.token
            },
            body: JSON.stringify({
               angler: angler.value,
               weight: Number(weight.value),
               species: species.value,
               location: location.value,
               bait: bait.value,
               captureTime: Number(captureTime.value)
            })
          })
         if (response.status !== 200) throw new Error(response.statusText);
      } catch (e) {
         alert(e.message);
      }
   }

   async function sendDeleteRequest(_id) {
      try {
         let response = await fetch(`http://localhost:3030/data/catches/${_id}`, {
            method: 'DELETE',
            headers: {
               'content-type': 'application/json',
               'X-Authorization': userData.token
            }
         })
         if (response.status !== 200) throw new Error(response.statusText);
      } catch (e) {
         alert(e.message);
      }
   };


   async function sendPostRequest(formData) {
      try {
         let response = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'X-Authorization': userData.token
            },
            body: JSON.stringify({
               angler: formData.get('angler'),
               weight: Number(formData.get('weight')),
               species: formData.get('species'),
               location: formData.get('location'),
               bait: formData.get('bait'),
               captureTime: Number(formData.get('captureTime'))
            })
         })

         if (response.status !== 200) throw new Error(response.status);
         return await response.json();
      } catch (e) {
         alert(e.message);
      }
   }
}

app();