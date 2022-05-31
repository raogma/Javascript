import { getAllById, getById, html } from '../lib.js';

function template(quiz, questions, sessionData, onReveal) {
    return html`
    <section id="summary">
        <div class="hero layout">
            <article class="details glass">
                <h1>Quiz Results</h1>
                <h2>${quiz.title}</h2>
    
                <div class="summary summary-top">
                    ${(Object.keys(sessionData).filter(x=> sessionData[x].isCorrect === true).length * 100 / questions.length).toFixed(2)}%
                </div>
    
                <div class="summary">
                    ${Object.keys(sessionData).filter(x=> sessionData[x].isCorrect === true).length}/${questions.length} correct answers
                </div>
    
                <a class="action cta" href="/start/${quiz.objectId}"><i class="fas fa-sync-alt"></i> Retake Quiz</a>
                <a class="action cta" href="/details/${quiz.objectId}"><i class="fas fa-clipboard-list"></i> See Details</a>
    
            </article>
        </div>
    
        <div class="pad-large alt-page">
            ${questions.map((x,i) =>html`
                <article class="preview">
                    <span class=${sessionData[i].isCorrect ? "s-correct" : "s-incorrect"}>
                        Question ${i+1}
                        <i class="fas fa-check"></i>
                    </span>
                    <div class="right-col">
                        <button @click=${onReveal} id="revealBtn-${i}" class="action">${sessionData[i].isCorrect ? "See question" : "Reveal answer"}</button>
                    </div>

                    <div id="answersContainer-${i}" style=display:none>
                        <p>
                            ${x.question}
                        </p>
                        ${x.answers.map((y,j) => html`
                            <div class="s-answer">
                                <span class=${y === x.correctAnswer ? "s-correct" : y === sessionData[i].choice ? "s-incorrect" : ""}>
                                    ${y}
                                    <i class="fas fa-times"></i>
                                    <strong>${y === x.correctAnswer ? "Correct Answer" : y === sessionData[i].choice ? "Your Choice" : ""}</strong>
                                </span>
                            </div>
                        `)}
                        </div>
                    </div>
                </article>`)}
        </div>
    </section>`
}

export async function renderResults(ctx){
    ctx.renderView(buildTemplate);
    
    async function buildTemplate(){
        let sessionData = (await getById('quizSession', ctx.params.quizSessionId)).data;
        let quiz = await getById('quizes', ctx.params.quizId);
        let questions = (await getAllById('questions', 'quiz', ctx.params.quizId)).results;
        return template(quiz, questions, sessionData, onReveal);
    }

    function onReveal(ev){
        let answersContainer = document.querySelector(`div[id="answersContainer-${Number(ev.target.id.split('-')[1])}"]`); 
        if(ev.target.textContent === 'See question' || ev.target.textContent === 'Reveal answer'){ 
            ev.target.textContent = 'Hide';
            answersContainer.style.display = 'block';
        }
        else if(ev.target.textContent === 'Hide'){
            ev.target.textContent = ev.target.parentElement.parentElement.querySelector('span').className === 's-correct'
                                    ? 'See question' : 'Reveal answer';
            answersContainer.style.display = 'none';
        }
    }
}