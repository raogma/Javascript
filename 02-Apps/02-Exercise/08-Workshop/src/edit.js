import { getAllById, getById, html, render } from '../lib.js';
import { tempReadyAnswer } from './editor/answers.js';

function templateEdit(quiz, questions, onEdit, onDelete, onQuizEdit){
    return html`
    <section id="editor">
        <article id="quizInfoContainer" class="preview layout">
            <div class="right-col">
                <a class="action cta" href="/details/${quiz.quizId}">View Quiz</a>
                <a @click=${onQuizEdit} class="action cta">Edit Quiz Info</a>
            </div>
            <div class="left-col">
                <h3><a class="quiz-title-link" href="/details/${quiz.quizId}">${quiz.title}</a></h3>
                <span class="quiz-topic">Topic: ${quiz.topic}</span>
                <div class="quiz-meta">
                    <span>${quiz.questionsCount} questions</span>
                    <span>|</span>
                    <span>Taken ${quiz.takenCount} times</span>
                </div>
            </div>
        </article>

        <header class="pad-large">
            <h2>Questions</h2>
        </header>
        
        <div id="questionsContainer" class="pad-large alt-page">
            ${questions.length > 0 
            ? questions.map((x, i) => html`
            <article class="editor-question">
                <div class="layout">
                    <div class="question-control">
                        <button @click=${onEdit} id=${x.objectId} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                        <button @click=${onDelete} id=${x.objectId} class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                    <h3>Question ${i + 1}</h3>
                </div>
                <form>
                    <p class="editor-input">${x.question}</p>
                    ${x.answers.map(y => html`${tempReadyAnswer(y, x.correctAnswer)}`)}
                </form>
            </article>`)
            : html`<h3>This quiz has no questions yet.</h3>`}
        </div>
    </section>`
}

function tempEditQuiz(title, topic, description){
    return html`
        <header class="pad-large">
            <h1>New quiz</h1>
        </header>
    
        <div class="pad-large alt-page">
            <form @submit=${onQuizCreate}>
                <label class="editor-label layout">
                    <span class="label-col">Title:</span>
                    <input class="input i-med" type="text" name="title" value=${title}></label>
                <label class="editor-label layout">
                    <span class="label-col">Topic:</span>
                    <select class="input i-med" name="topic" value=${topic}>
                        <option value="All Categories">All Categories</option>
                        <option value="Languages">Languages</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Tools and Software">Tools and Software</option>
                    </select>
                </label>
                <span class="label-col">Description:</span>
                <textarea rows="5" cols="20" class="input i-med" type="textarea" name="description" value=${description}></textarea> 

                <input class="input submit action" type="submit" value="Save">
            </form>
        </div>`
}


export async function renderEdit(ctx){
    ctx.renderView(buildTemplate);

    async function buildTemplate(){
        let quizId = ctx.params.id;
        let quiz = await getById('quizes', quizId);
        let questions = (await getAllById('questions', 'quiz', quizId)).results;
        return templateEdit(quiz, questions, onEdit, onDelete, onSaveQuiz);
    }

    async function onEdit(ev){

    }

    async function onSaveQuiz(ev){
        
    }

    async function onDelete(ev){
        
    }
}