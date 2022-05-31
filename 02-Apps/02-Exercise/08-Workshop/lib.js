import { render, html } from './node_modules/lit-html/lit-html.js';
import {until} from './node_modules/lit-html/directives/until.js';
import {cubeTemplate} from './src/cube.js';
import page from './node_modules/page/page.mjs';
import { navTemplate } from './src/nav.js';

export {
    render, html, page, until, cubeTemplate,
    isLogged, loadCTXData, validateInputs, getCorrectButton, getCorrectAnswer, createElement, getCorrectIndex,
    register, login, onLogout,
    create, getAll, getAllById, getAllByColumn, getById, getRecent, del, update, changeCount
}

let host = 'https://parseapi.back4app.com';
let endpoints = {
    quizes: '/classes/Quizes',
    questions: '/classes/Questions',
    users: '/users',
    quizSession: '/classes/QuizSession'
};

function createElement(template, args, elementType, className) {
    let element = document.createElement(elementType);
    element.className = className;
    render(template(args), element);
    return element;
}

function isLogged() {
    if (sessionStorage.getItem('token') !== null) {
        return true;
    }
    return false;
}

function getCorrectIndex(answersList, correctAnswer) {
    let res = answersList.map((x, i) => {
        if (x === correctAnswer) { return i }
    })
    return res.filter(x => x !== undefined)[0];
}

function getCorrectAnswer(form) {
    let correctAnswer = form.querySelector('input[type="radio"]:checked');
    if (correctAnswer === null) { throw new Error('Pick a correct answer!') }
    let el = correctAnswer.parentElement.parentElement;

    //there's difference with the edit question and the ready question
    if(el.querySelector('input[type="text"]') === null){
        return el.querySelector('span').textContent; 
    } else { return el.querySelector('input[type="text"]').value}
}

function getCorrectButton(target) {
    if (target.tagName === 'I') { target = target.parentElement };
    return target;
}

function loadCTXData(ctx, next) {
    render(navTemplate(isLogged), document.querySelector('header'));
    ctx.renderView = (templatePromise) => render(until(templatePromise(), cubeTemplate()), document.querySelector('main'));
    ctx.renderQuestions = (template) => render(template, document.querySelector('#questionsContainer'));
    ctx.renderAnswers = (template, questionId) => render(template, document.querySelector(`#answersContainer${questionId}`));
    next();
}

function validateInputs(data) {
    data.map(x => {
        if (x === '') { throw new Error('All fields are required!') };
    })
}

async function sendRequest(url, method, bodyData, auth) {
    let options = {
        method,
        headers: {
            'content-type': 'application/json',
            'X-Parse-Application-Id': 'tv6vQh1tl4WzCpfBtZF1v42wOsPQtc40ReiYKJEK',
            'X-Parse-REST-API-Key': 'Lr4fryhsjXT8gIJ49o22mrBFQhq4veplEDZ6hzb2'
        }
    }
    if (bodyData) { options['body'] = JSON.stringify(bodyData) }
    if (auth) { options.headers['X-Parse-Session-Token'] = auth }
    try {
        let response = await fetch(url, options);
        if (!response.ok) { throw new Error(response.message) }
        return response.json();
    } catch (e) {
        alert(e.message);
    }
}

async function register(username, email, password) {
    return await sendRequest(`${host}/users`, 'post', { username, email, password })
}

async function login(username, password) {
    return await sendRequest(`${host}/login`, 'post', { username, password })
}

async function onLogout() {
    await sendRequest(`${host}/logout`, 'post', {}, sessionStorage.getItem('token')); //!NB
    sessionStorage.clear();
    page.redirect('/');
}

async function getAll(endpoint) {
    return await sendRequest(`${host}${endpoints[endpoint]}`, 'get');
}

async function getAllById(endpoint, relation, _id) {
    let className = relation[0].toUpperCase() + relation.slice(1);
    className === 'Quiz' ? className += 'es' : className += 's';
    if (relation === 'owner') { className = '_User' }
    return await sendRequest(
        `${host}${endpoints[endpoint]}?where={"${relation}Id":{"__type":"Pointer","className":"${className}","objectId":"${_id}"}}`, 'get'
    );
}

async function getAllByColumn(endpoint, criteria) {
    return await sendRequest(
        `${host}${endpoints[endpoint]}?where=${criteria}`, 'get'
    );
}

async function getById(endpoint, _id) {
    return await sendRequest(`${host}${endpoints[endpoint]}/${_id}`, 'get');
}

async function getRecent(endpoint) {
    return await sendRequest(`${host}${endpoints[endpoint]}?order=createdAt`, 'get');
}

async function create(endpoint, body) {
    return await sendRequest(
        `${host}${endpoints[endpoint]}`,
        'post',
        body,
        sessionStorage.getItem('token')
    )
}

async function del(endpoint, _id) {
    await sendRequest(`${host}${endpoints[endpoint]}/${_id}`, 'delete', {}, sessionStorage.getItem('token'));
}

async function update(endpoint, _id, body) {
    await sendRequest(`${host}${endpoints[endpoint]}/${_id}`, 'put', body, sessionStorage.getItem('token'));
}

async function changeCount(_id, command, field) {
    let quiz = await getById('quizes', _id);
    let newValue;
    if (command === 'increase') { newValue = quiz[field] + 1 }
    else if (command === 'decrease') { newValue = quiz[field] - 1 }
    if(field === 'questionsCount'){await update('quizes', _id, { questionsCount: newValue })}
    else if(field === 'takenTimes'){await update('quizes', _id, { takenTimes: newValue });}
}