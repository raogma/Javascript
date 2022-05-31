import {html} from '../node_modules/lit-html/lit-html.js';
import {onSubmit, onClick} from './app.js'

export function tableTemplate(booksData){
    return html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>        
    <tbody @click=${onClick}>
    ${Object.entries(booksData).map(b => html`
        <tr id=${b[0]}>
            <td>${b[1].author}</td>
            <td>${b[1].title}</td>
            <td @click=${onClick}>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    `)}
    </tbody>
</table>
`
}

export function formTemplate(shouldEdit){
    return html `
<form @submit=${onSubmit} id="${shouldEdit ? 'create' : 'edit'}-form">
    <h3>${shouldEdit ? 'Create' : 'Edit'} book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="${shouldEdit ? 'Save' : 'Submit'}">
</form>
    `
}



