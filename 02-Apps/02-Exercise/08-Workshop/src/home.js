import { html, getAll, getRecent, cubeTemplate, until } from '../lib.js';

function template(quizesCount, rQuiz) {
    return html`
    <section id="welcome">
    
        <div class="hero layout">
            <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
            <div class="glass welcome">
                <h1>Welcome to Quiz Fever!</h1>
                <p>Home to ${quizesCount} quizes in 4 topics. <a href="/browse">Browse all quizes</a>.</p>
                ${sessionStorage.getItem('token') !== null
                ? null
                : html`<a class="action cta" href="/login">Sign in to create a quiz</a>`}
            </div>
        </div>
    
        <div class="pad-large alt-page">
            ${quizesCount !== 0 
            ? html`
                <h2>Our most recent quiz:</h2>
        
                <article class="preview layout">
                    <div class="right-col">
                        <a class="action cta" href="/details/${rQuiz.objectId}">View Quiz</a>
                    </div>
                    <div class="left-col">
                        <h3>${rQuiz.title}</h3>
                        <span class="quiz-topic">Topic: ${rQuiz.topic}</span>
                        <div class="quiz-meta">
                            <span>${rQuiz.questionsCount} questions</span>
                            <span>|</span>
                            <span>Taken ${rQuiz.takenTimes} times</span>
                        </div>
                    </div>
                </article>`
            : null}
            <div>
                <a class="action cta" href="/browse">Browse all quizes</a>
            </div>
        </div>
    </section>`
}

export async function renderHome(ctx) {
    ctx.renderView(buildTemplate);

    async function buildTemplate(){
        let quizesCount = (await getAll('quizes')).results.length;
        let rQuiz = (await getRecent('quizes')).results;
        return template(quizesCount, rQuiz[rQuiz.length - 1]);
    }
}