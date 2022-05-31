import { changeCount, getById, html } from '../lib.js';

function template(data, onBegin) {
    return html`
    <section id="details">
        <div class="pad-large alt-page">
            <article class="details">
                <h1>${data.title}</h1>
                <span class="quiz-topic">A quiz by <a href="/profile">${sessionStorage.getItem('username')}</a> Topic: ${data.topic}</span>
                <div class="quiz-meta">
                    <span>${data.questionsCount} Questions</span>
                    <span>|</span>
                    <span>Taken ${data.takenTimes} times</span>
                </div>
                <p class="quiz-desc">${data.description}</p>
                <div>
                    <a @click=${onBegin} class="cta action">Begin Quiz</a>
                </div>
            </article>
        </div>
    </section>`
}

export async function renderDetails(ctx){
    let data;
    ctx.renderView(buildTemplate);

    async function onBegin(ev){
        ev.preventDefault();
        await changeCount(data.objectId, 'increase', 'takenTimes');
        ctx.page.redirect(`/start/${data.objectId}`);
        //done without href becouse of the takenTimes column gets increase everytime the page is reloaded
    }

    async function buildTemplate(){
        data = await getById('quizes', ctx.params.id);
        return template(data, onBegin);
    }
}
