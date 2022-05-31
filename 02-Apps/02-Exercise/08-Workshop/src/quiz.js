import { create, getAllById, getById, getCorrectButton, html } from '../lib.js';

function template(quiz, questions, currentIdx, remainingQuestions, cache, events) {
    return html`
        <section id="quiz">
            <header class="pad-large">
                <h1>${quiz.title}: Question ${currentIdx + 1} / ${questions.length}</h1>
                <nav class="layout q-control">
                    <span class="block">Question index</span>
                    ${questions.map((x,i) => html`
                            <a class=${i === currentIdx ? "q-index q-current" : cache[i].choice !== '' ? "q-index q-answered" : "q-index"}
                            id=${i} @click=${events.onSwitchQuestion}></a>`) 
                    }
                </nav>
            </header>
            <div id="quizQuestionContainer" class="pad-large alt-page">
                ${questions.map((x,i) => html`
                    <article class="question" style=${currentIdx === i ? 'display:block' : 'display:none'}>
                        <p class="q-text">
                            ${x.question}
                        </p>
                        <div id="quizAnswersContainer">
                            ${x.answers.map(y => html`
                                <label class="q-answer radio">                                                                  
                                    <input @click=${events.onAnswer} class="input" type="radio"
                                    name="question-${i}" value=${y}/>
                                    <i class="fas fa-check-circle"></i>
                                    ${y}
                                </label>`)}    
                        </div>
                    </article>`
                )}
                <nav class="q-control">
                    <span class="block">${remainingQuestions} questions remaining</span>
                    ${currentIdx > 0 
                        ? html`<a @click=${events.onSwitchQuestion} id=${currentIdx - 1} class="action"><i class="fas fa-arrow-left"></i> Previous</a>`
                        : null
                    }
                    <a @click=${events.onStartOver} id=${0} class="action"><i class="fas fa-sync-alt"></i> Start over</a>
                    <div class="right-col">
                    ${currentIdx < questions.length - 1 
                        ? html`<a @click=${events.onSwitchQuestion} class="action" id=${currentIdx + 1}>Next <i class="fas fa-arrow-right"></i></a>`
                        : null
                    }
                        <a @click=${events.onSubmit} class="action">Submit answers</a>
                    </div>
                </nav>
            </div>
        </section>`
}

export async function renderStart(ctx){
    let totalQuestions;
    let quiz, questions;
    let answeredQuestions = 0;
    let quizId = ctx.params.id;
    let currentIdx = 0;
    let events = {
        onSwitchQuestion: onSwitchQuestion,
        onAnswer: onAnswer,
        onStartOver: onStartOver,
        onSubmit: onSubmit
    }
    let cache = {
        //questionIdx: {choice: str, isCorrect:boolean}
    }

    ctx.renderView(buildTemplate);
    
    async function buildTemplate(){
        quiz = await getById('quizes', quizId);
        questions = (await getAllById('questions', 'quiz', quizId)).results;
        questions.map((x, i) => cache[i] = {choice: '', isCorrect: undefined});
        totalQuestions = questions.length;
        return template(quiz, questions, currentIdx, totalQuestions - answeredQuestions, cache, events);
    }

    function update(){
        return template(quiz, questions, currentIdx, totalQuestions - answeredQuestions, cache, events);
    }

    function onSwitchQuestion(ev){
        ev.preventDefault();
        currentIdx = Number(getCorrectButton(ev.target).id);
        ctx.renderView(update);
    }

    function onAnswer(ev){
        let questionIdx = Number(ev.target.name.split('-')[1]);
        let choice = ev.target.value;
        let isCorrect = choice===questions[questionIdx].correctAnswer;
        cache[questionIdx] = {choice, isCorrect};
        answeredQuestions += 1;
    }

    function onStartOver(ev){
        ev.preventDefault();
        Object.keys(cache).map(x => {
            cache[x].choice='';
            cache[x].isCorrect=undefined;
        })
        answeredQuestions = 0;
        Array.from(document.querySelectorAll('input[type=radio]')).map(x => x.checked=false);
        currentIdx = Number(getCorrectButton(ev.target).id);
        ctx.renderView(update);
    }

    async function onSubmit(ev){
        ev.preventDefault();
        let msg = confirm('Are you sure you want to submit your quiz?');
        if(msg){
            let response = await create('quizSession', {data: cache});
            ctx.page.redirect(`/results/${quizId}/${response.objectId}`);
        }
    }
}