import { html } from '../../lib.js';
import { tempReadyAnswer } from './answers.js';

export function tempEditQuestion(events, question, answers, i) {
    return html`
    <article class="editor-question">
        <div class="layout">
            <div class="question-control">
                <button @click=${events.onSaveQuestion} id=${`questionEvent-${i}`} class="input submit action"><i
                        class="fas fa-check-double"></i>
                    Save</button>
                <button @click=${events.onCancelQuestion} class="input submit action" id=${`questionEvent-${i}`}><i class="fas fa-times"></i> Cancel</button>
            </div>
            <h3>Question ${i}</h3>
        </div>
    
        <form id="form-${i}">
            <textarea class="input editor-input editor-text" name="text" placeholder="Enter question">${question}</textarea>
            <div id="answersContainer${i}">
                ${answers}
    
            </div>
            <div class="editor-input">
                <button @click=${events.onAddAnswer} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>
        </form>
    </article>`
}

export function tempReadyQuestion(events, i, question, correctAnswer, answers) {
    return html`
        <article class="editor-question">
            <div class="layout">
                <div class="question-control">
                    <button id=${`questionEvent-${i}`} @click=${events.onEdit} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                    <button id=${`questionEvent-${i}`} @click=${events.onDelete} class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
                <h3>Question ${i}</h3>
            </div>
            <form id="form-${i}">
                <p class="editor-input">${question}</p>
               ${answers.map(x => html`${tempReadyAnswer(x, correctAnswer)}`)}
            </form>
            <br>
        </article>`
}

export function addQuestionBtn(onAddQuestion){
    return html`
    <article class="editor-question">
        <div id="addQuestionBtn" class="editor-input">
            <button @click=${onAddQuestion} class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article>`
}