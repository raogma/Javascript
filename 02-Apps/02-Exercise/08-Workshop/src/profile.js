import { del, getAllById, html, getCorrectButton } from '../lib.js';

function template(quizes, onDeleteQuiz){
    return html`
        <section id="profile">
                <header class="pad-large">
                    <h1>Profile Page</h1>
                </header>

                <div class="hero pad-large">
                    <article class="glass pad-large profile">
                        <h2>Profile Details</h2>
                        <p>
                            <span class="profile-info">Username:</span>
                            ${sessionStorage.getItem('username')}
                        </p>
                        <p>
                            <span class="profile-info">Email:</span>
                            ${sessionStorage.getItem('email')}
                        </p>
                        <h2>Your Quiz Results</h2>
                        <table class="quiz-results">
                            <tbody>
                                <tr class="results-row">
                                    <td class="cell-1">23. March 2021</td>
                                    <td class="cell-2"><a href="#">RISC Architecture</a></td>
                                    <td class="cell-3 s-correct">85%</td>
                                    <td class="cell-4 s-correct">12/15 correct answers</td>
                                </tr>
                            </tbody>
                        </table>
                    </article>
                </div>

                <header class="pad-large">
                    <h2>Quizes created by you</h2>
                </header>

                <div class="pad-large alt-page">
                    ${quizes.length > 0 
                    ?quizes.map(x => html`
                        <article class="preview layout">
                            <div class="right-col" id=${x.objectId}>
                                <a class="action cta" href="/details/${x.objectId}">View Quiz</a>
                                <a class="action cta" href="/edit/${x.objectId}"><i class="fas fa-edit"></i></a>
                                <a @click=${onDeleteQuiz} class="action cta" href="/profile"><i class="fas fa-trash-alt"></i></a>
                            </div>
                            <div class="left-col">
                                <h3><a class="quiz-title-link" href="#">${x.title}</a></h3>
                                <span class="quiz-topic">Topic: ${x.topic}</span>
                                <div class="quiz-meta">
                                    <span>${x.questionsCount} questions</span>
                                    <span>|</span>
                                    <span>Taken ${x.takenTimes} times</span>
                                </div>
                            </div>
                        </article>`)
                    : html`<h4>No quizes have been created yet.</h4>`
                    }
                </div>
            </section>`
}

export async function renderProfile(ctx){
    ctx.renderView(buildTemplate);

    async function onDeleteQuiz(ev){
        ev.preventDefault();
        let quizId = getCorrectButton(ev.target).parentElement.id;
        let res = confirm('Are you sure you want to delete this quiz?');
        if(res){
            await del('quizes', quizId);
            let questions = (await getAllById('questions', 'quiz', quizId)).results;
            await Promise.all(questions.map(async function(x){
                await del('questions', x.objectId);
            }))
        }
        ctx.renderView(buildTemplate);
    }

    async function buildTemplate(){
        let data = (await getAllById('quizes', 'owner', sessionStorage.getItem('ownerId'))).results;
        return template(data, onDeleteQuiz);
    }
}