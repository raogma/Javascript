class Contact{
    constructor(firstName, lastName, phone, email){
        Object.assign(this, {firstName, lastName, phone, email})
        this._online = false;
    }

    get online(){
        return this._online;
    }

    set online(value){
        if(this.divTitle){
            if(value === false){
                this.divTitle.classList.remove('online');
            } else {
                this.divTitle.classList.add('online');
            }
        }
        this._online = value;
    }

    render(id){
        //mainDiv
        if (document.querySelector(`#${id}`) === undefined){
            this.mainDiv = document.createElement('div');
            this.mainDiv.setAttribute('id', `${id}`);
            document.querySelector('body').appendChild(this.mainDiv);
        } else {
            this.mainDiv = document.querySelector(`#${id}`);
        }

        this.article = document.createElement('article');

        //divTITLE
        this.divTitle = document.createElement('div');
        this.divTitle.classList.add('title')
        if(this.online){
            this.divTitle.classList.add('online');
        }
        this.divTitle.innerHTML = `${this.firstName} ${this.lastName}`

        //button
        this.button = document.createElement('button');
        this.button.innerHTML = `&#8505;`;
        this.divTitle.appendChild(this.button);
        
        //divINFO
        this.divInfo = document.createElement('div');
        this.divInfo.classList.add('info');
        this.divInfo.style.display = 'none';
        this.divInfo.innerHTML = `
<span>&phone; ${this.phone}</span>
<span>&#9993; ${this.email}</span>
        `
        //append
        this.article.appendChild(this.divTitle);
        this.article.appendChild(this.divInfo);
        this.mainDiv.appendChild(this.article);

        //infoButton
        this.button.addEventListener('click', (ev) => {
            if(this.divInfo.style.display === 'none'){
                this.divInfo.style.display = 'block';
            } else {
                this.divInfo.style.display = 'none';
            }
        })
    }
}

// let data = {
//     firstName: 'Ivan',
//     lastName: 'Ivanov',
//     phone: '0888 123 456',
//     email: 'i.ivanov@gmail.com'
// };
// let contact = new Contact(data.firstName, data.lastName, data.phone, data.email)
// contact.online = true;
// contact.render('holder');
let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
  ];
  contacts.forEach(c => c.render('main'));
  
  // After 1 second, change the online status to true
  setTimeout(() => contacts[1].online = true, 2000);