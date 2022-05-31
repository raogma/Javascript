import { create, del, getAll, getAllById, getCorrectAnswer, getCorrectButton, html, validateInputs, render, update, changeCount, getById } from '../../lib.js';
import { tempEditAnswer } from './answers.js';
import { addQuestionBtn, tempEditQuestion, tempReadyQuestion } from './questions.js';


function tempMain(onSaveQuiz, addQuestionBtn, quizInfo) {
    return html`
    <section id="editor">
        <form>
            <header class="pad-large">
                <div class="right-col">
                    <button id="saveBtn" @click=${onSaveQuiz} class="action cta">Save Quiz</button>
                </div>
                <h1>${quizInfo ? 'Edit' : 'New'} quiz</h1>
            </header>
            <article class="preview layout">
    
                <div class="pad-large alt-page">
                    <label class="editor-label layout">
                        <span class="label-col">Title:</span>
                        <input class="input i-med" type="text" name="title" value=${quizInfo ? quizInfo.quiz.title : ''}></label>
                    <div id="aligntop">
                        <label class="editor-label layout">
                            <span class="label-col">Topic:</span>
                            <select class="input i-med" name="topic">
                                ${["Languages", "Hardware", "Tools and Software", "All Categories"].map(x => html`
                                    <option value="${x}" ${quizInfo? html`?selected=${x === quizInfo.quiz.topic}`: null}>${x}</option>
                                `)}
                            </select>
                        </label>
                        <label class="editor-label layout">
                            <span class="label-col">Description:</span>
                            <textarea rows="5" cols="20" class="input i-med" type="textarea"
                                name="description">${quizInfo ? quizInfo.quiz.description : ''}</textarea>
                        </label>
                    </div>
                </div>
            </article>
        </form>
    
        <header class="pad-large">
            <h2>Questions</h2>
        </header>
        <div id="questionsContainer" class="pad-large alt-page">
            ${quizInfo ? quizInfo.questions : null}
            ${quizInfo ? addQuestionBtn : null}
        </div>
    </section>`
}

export async function renderEditor(ctx) {
    let quizId, title, topic, description;
    let quiz, questions;

    let editQuestionArgs = {
        onSaveQuestion: (ev) => onSaveQuestion(ev),
        onCancelQuestion: (ev) => onCancelQuestion(ev),
        onAddAnswer: (ev) => onAddAnswer(ev),
    }
    let readyQuestionArgs = {
        onEdit: (ev) => onEditQuestion(ev),
        onDelete: (ev) => onDeleteQuestion(ev)
    }
    let cache = {
        questions: [],
        questionsData: {
            //idx: {question:question, answers: [answers]
        }
    };

    if(ctx.params.id !== undefined) {
        quizId = ctx.params.id;
        ctx.renderView(buildTemplate);
    } else {
        ctx.renderView(()=>tempMain(onSaveQuiz, onAddQuestion));
        cache.questions.push(addQuestionBtn(onAddQuestion));
        ctx.renderQuestions(cache.questions);
    }

    async function buildTemplate(){
        quiz = await getById('quizes', quizId);
        questions = (await getAllById('questions', 'quiz', quizId)).results;
        questions.map((x, i) => cache.questionsData[i + 1] = {question: x.question, answers: x.answers, correctAnswer: x.correctAnswer, questionId: x.objectId});
        questions.map((x, i) => cache.questions.push(tempReadyQuestion(readyQuestionArgs, i + 1, x.question, x.correctAnswer, x.answers))); 
        cache.questions.push(addQuestionBtn(onAddQuestion));
        return tempMain(onSaveQuiz, addQuestionBtn(onAddQuestion), {quiz, questions: questions.map((x, i) => tempReadyQuestion(readyQuestionArgs, i + 1, x.question, x.correctAnswer, x.answers))});
    }

    async function onSaveQuiz(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target.parentElement.parentElement.parentElement);
        title = formData.get('title');
        topic = formData.get('topic');
        description = formData.get('description');

        try {
            validateInputs([title, description]);
            if (topic === 'All Categories') { throw new Error('Please choose a topic!') }
            if (Object.keys(cache.questionsData).length === 0) { throw new Error('Please add at least 1 question!') }

            let msg = confirm('Are you sure you want to Save this quiz?');
            if (msg) {
                Array.from(document.querySelectorAll('article[class="editor-question"]')).map(x => loadingQuestion(x));
                ctx.params.id ? await updateQuiz() : await createQuiz();
            }
            ctx.page.redirect('/profile');
        } catch (e) { alert(e.message) }
    }

    async function onAddQuestion(ev) {
        //for edit quiz page
        Array.from(ev.target.parentElement.parentElement.parentElement.querySelectorAll('article')).map(x => x.remove());
        let question = '';
        let answersList = [];
        cache.questions.pop();
        editQuestionArgs.onAddAnswer = (ev) => onAddAnswer(ev, answersList);
        editQuestionArgs.onSaveQuestion = (ev) => onSaveQuestion(ev, answersList);
        cache.questions.push(tempEditQuestion(editQuestionArgs, question, answersList, cache.questions.length + 1));
        disableBtns(true);
        ctx.renderQuestions(cache.questions);
    }

    async function onSaveQuestion(ev, answersList) {
        let target = getCorrectButton(ev.target);
        let idx = Number(target.id.split('-')[1]);
        let form = target.parentElement.parentElement.parentElement.querySelector(`form`);
        let formData = new FormData(form);
        let question = formData.get('text');
        let answers = formData.getAll('answers');
        try {
            let correctAnswer = getCorrectAnswer(form);
            validateInputs([question, ...answers]);
            validateAnswers();

            cache.questions.splice(idx - 1, 1, tempReadyQuestion(
                readyQuestionArgs,
                cache.questions.length,
                question,
                correctAnswer,
                answers
            ));
            cache.questions.push(addQuestionBtn(onAddQuestion));
            cache.questionsData[idx] = { question, answers, correctAnswer };

            ctx.renderQuestions(cache.questions);
            answersList = [];
            disableBtns(false);
        } catch (err) {
            alert(err.message);
        }

        function validateAnswers() {
            if (answers.length < 3) { throw new Error('At least 3 answers are required!') }

            let uniqueAnswers = new Set();
            answers.map(x => uniqueAnswers.add(x));
            if (answers.length !== uniqueAnswers.size) { throw new Error('Answers must be unique!') }
        }
    }

    async function onEditQuestion(ev) {
        //for edit quiz page
        Array.from(ev.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('article')).map(x => x.remove());

        let answersList = [];
        let target = getCorrectButton(ev.target);
        let form = target.parentElement.parentElement.parentElement.querySelector('form');
        let idx = Number(target.id.split('-')[1])

        let question = form.querySelector('p').textContent;
        let correctAnswer = getCorrectAnswer(form);
        let answers = Array.from(form.querySelectorAll('span')).map(x => x.textContent);
        let tempAnswers = answers.map(x => tempEditAnswer(x, (ev) => onDeleteAnswer, correctAnswer));

        //replace the readyQuestion with the editQuestion
        editQuestionArgs.onCancelQuestion = (ev) => onCancelQuestion(ev, { question, answers, correctAnswer });

        editQuestionArgs.onAddAnswer = (ev) => onAddAnswer(ev, answersList);
        cache.questions.splice(idx - 1, 1, tempEditQuestion(editQuestionArgs, question, tempAnswers, idx));
        //remove the addQuestionsBtn
        cache.questions.pop();

        disableBtns(true);
        ctx.renderQuestions(cache.questions);
    }

    async function onDeleteQuestion(ev) {
        let target = getCorrectButton(ev.target);
        let idx = Number(target.id.split('-')[1]);
        let msg = confirm('Are you sure you want to delete this question');
        if (msg) {
            //for edit quiz page
            Array.from(ev.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('article')).map(x => x.remove());
            cache.questions.splice(idx - 1, 1);
            ctx.renderQuestions(cache.questions);
            delete cache.questionsData[idx];
            //update indices cos of scrambling when deleting
            Array.from(document.querySelectorAll('article[class="editor-question"] h3')).map((x, i) => { x.textContent = `Question ${i + 1}` })
        }
    }

    async function onCancelQuestion(ev, params) {
        let msg = confirm('Are you sure? Any unsaved changes will be lost.');
        if (msg) {
            if (params) {
                let target = getCorrectButton(ev.target);
                let idx = Number(target.id.split('-')[1]);

                cache.questions.splice(idx - 1, 1, tempReadyQuestion(readyQuestionArgs, idx, params.question, params.correctAnswer, params.answers));
                cache.questions.push(addQuestionBtn(onAddQuestion));
            } else {
                cache.questions.pop()
                cache.questions.push(addQuestionBtn(onAddQuestion));
            }

            ctx.renderQuestions(cache.questions);
            disableBtns(false);
        }
    }

    async function onAddAnswer(ev, answersList) {
        ev.preventDefault();
        answersList.push(tempEditAnswer('', onDeleteAnswer));
        let questionIdx = Number(ev.target.parentElement.parentElement.parentElement.querySelector('h3').textContent.split(' ')[1]);
        ctx.renderAnswers(answersList, questionIdx);
    }

    async function onDeleteAnswer(ev) {
        ev.preventDefault();
        getCorrectButton(ev.target).parentElement.remove();
    }

    function loadingQuestion(target) {
        let el = document.createElement('div');
        el.className = "loading-overlay working"
        target.appendChild(el);
    }

    function disableBtns(state) {
        Array.from(document.querySelectorAll('button'))
            .filter(x => ['Edit', 'Delete', 'Add question'].includes(x.textContent.trim()))
            .map(x => x.disabled = state);
        document.querySelector('#saveBtn').disabled = state;
    }

    async function createQuiz(){
        let response = await create(
            'quizes',
            {
                title,
                topic,
                description,
                questionsCount: Object.keys(cache.questionsData).length,
                ownerId: { '__type': "Pointer", className: "_User", objectId: sessionStorage.getItem('ownerId') },
            }
        );
        quizId = response.objectId;

        for (let idx in cache.questionsData) {
            await create(
                'questions',
                {
                    question: cache.questionsData[idx].question,
                    answers: cache.questionsData[idx].answers,
                    correctAnswer: cache.questionsData[idx].correctAnswer,
                    quizId: { '__type': "Pointer", className: "Quizes", objectId: quizId }
                }
            )
        }
    }

    async function updateQuiz(){
        await update(
            'quizes',
            quizId,
            {
                title,
                topic,
                description,
                questionsCount: Object.keys(cache.questionsData).length,
                takenCount: quiz.takenTimes,
                ownerId: { '__type': "Pointer", className: "_User", objectId: sessionStorage.getItem('ownerId') },
            }
        );

        for (let idx in cache.questionsData) {
            await update(
                'questions',
                cache.questionsData[idx].questionId,
                {
                    question: cache.questionsData[idx].question,
                    answers: cache.questionsData[idx].answers,
                    correctAnswer: cache.questionsData[idx].correctAnswer,
                    quizId: { '__type': "Pointer", className: "Quizes", objectId: quizId }
                }
            )
        }
    }
}
