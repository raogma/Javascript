import { getAll, getAllByColumn, getAllById, html, until } from '../lib.js';
import { cubeTemplate } from './cube.js';

async function template(data, onFilter) {
    return html`
    <section id="browse">
        <header class="pad-large">
            <form @submit=${onFilter} class="browse-filter">
                <input class="input" type="text" name="query">
                <select class="input" name="topic">
                    <option value="All Categories">All Categories</option>
                    <option value="Languages">Languages</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Tools and Software">Tools and Software</option>
                </select>
                <input class="input submit action" type="submit" value="Filter Quizes">
            </form>
            <h1>All quizes</h1>
        </header>
        <div class="pad-large alt-page">
            ${data.length > 0 
                ? data.map(x => html`
                <article class="preview layout">
                    <div class="right-col">
                        <a class="action cta" href="/details/${x.objectId}">View Quiz</a>
                    </div>
                    <div class="left-col">
                        <h3><a class="quiz-title-link" href="/details/${x.objectId}">${x.title}</a></h3>
                        <span class="quiz-topic">Topic: ${x.topic}</span>
                        <div class="quiz-meta">
                            <span>${x.questionsCount} questions</span>
                            <span>|</span>
                            <span>${x.takenTimes} times</span>
                        </div>
                    </div>
                </article>`)
                : html`<h3>No Quizes Yet!</h3>`
            }
    
        </div>
    </section>`
}

export async function renderBrowse(ctx){
    let data;
    ctx.renderView(buildTemplate);

    async function onFilter(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let titleQuery = formData.get('query');
        let topicQuery = formData.get('topic');

        let criteria = {}
        if(titleQuery !== ''){criteria['title'] = titleQuery}
        if(topicQuery !== 'All Categories'){criteria['topic'] = topicQuery}
        data = (await getAllByColumn('quizes', JSON.stringify(criteria))).results;
        ctx.renderView(buildTemplate);
    }

    async function buildTemplate(){
        data = (await getAll('quizes')).results;
        let questionsCount = await Promise.all(data.map(async function(x){
            return (await getAllById('questions', 'quiz', x.objectId)).results.length
        }));
        return template(data, questionsCount, onFilter);
    }
}