import { html } from '../../lib.js';

export function tempEditAnswer(answer, onDeleteAnswer, correctAnswer) {
    return html`
<div class="editor-input">

    <label class="radio">
        <input class="input" type="radio" name="question-1" value="0" ?checked=${correctAnswer === answer}/>
        <i class="fas fa-check-circle"></i>
    </label>

    <input class="input" type="text" name="answers" value=${answer} />
    <a @click=${onDeleteAnswer} class="input submit action"><i class="fas fa-trash-alt"></i></a>
</div>`
}

export function tempReadyAnswer(y, correctAnswer) {
    return html`
<div class="editor-input">
    <label class="radio">
        <input class="input" type="radio" name="question-2" value="0" disabled ?checked=${correctAnswer === y}/>
        <i class="fas fa-check-circle"></i>
    </label>
    <span>${y}</span>
</div>`
}