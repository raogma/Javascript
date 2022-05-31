import { nav } from "./nav.js";

export async function sendRequest(url, method, bodyData, auth) {
    try {
        for (let key in bodyData) {
            if (bodyData[key] === '') {
                throw new Error('Field not filled!');
            }
        }
        if (url === 'http://localhost:3030/users/register' || url === 'http://localhost:3030/users/login') {
            if (bodyData.password.length < 6) throw new Error('Password is too short!')
            if (bodyData.repeatPassword !== undefined) {
                if (bodyData.password != bodyData.repeatPassword) throw new Error('Passwords do not match!');
            }
        }

        let options = {};
        let headers = {
            'Content-Type': 'application/json'
        };
        if(auth != undefined) {
            headers['X-Authorization'] = auth;
        }

        if (method !== 'get') {
            options = {
                method,
                headers,
                body: JSON.stringify(bodyData)
            }
        }

        let response = await fetch(url, options);
        if (response.status === 409) throw new Error('User already exists!')
        if (response.status !== 200) throw new Error(response.message);
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}

export function changeView(referrence){
    nav.getView();
    let main = document.querySelector('#main');
    main.replaceChildren();
    main.appendChild(referrence)
}