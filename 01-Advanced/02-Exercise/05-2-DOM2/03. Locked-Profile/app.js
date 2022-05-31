function lockedProfile() {
    Array
        .from(document.querySelectorAll('button'))
        .map(x => x.addEventListener('click', ev =>{
            let profile = ev.target.parentElement;
            let isUnlocked = profile.querySelector('input[type="radio"][value="unlock"]').checked;

            if (isUnlocked){
                if (ev.target.textContent === 'Show more'){
                    ev.target.textContent = 'Hide it';
                    profile.querySelector('div').style.display = 'block';            
                } else {
                    ev.target.textContent = 'Show more';
                    profile.querySelector('div').style.display = 'none';
                }
            }
        }));
}