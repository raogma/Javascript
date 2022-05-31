import { sendRequest } from "../app.js";
import { homePage } from "./home.js";
import { navigation } from "./nav.js";

let ref

function setter(DOMRef){
    ref = DOMRef;
}

async function getView(){
    navigation.switchButtons()

    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);

    ref.querySelector('form').addEventListener('submit', async function(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let isValid = validateData(email, password, repeatPassword);
        if (isValid !== false) {
            let response = await sendRequest(
                'http://localhost:3030/users/register',
                'post',
                {
                    email,
                    password 
                }
            )
            
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
    
            ev.target.reset();
            homePage.getView()
        }
    })
}

export let registerPage ={
    setter,
    getView
}

function validateData(email, password, repeatPassword){
    try{
        if(email.split('@')[0].length < 3) throw new Error('Invalid Email!');
        if(!/\w+/.test(email)) throw new Error('Invalid Email!');
        if(password.length < 3) throw new Error('Password is too short!');
        if(password !== repeatPassword) throw new Error('Passwords don\'t match!');

    } catch (e){
        alert(e.message);
        return false;
    }
}