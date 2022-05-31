async function loadCommits() {
    let username = document.querySelector('#username');
    let repoInput = document.querySelector('#repo');
    let ul = document.querySelector('#commits');

    ul.replaceChildren();

    function attachElements(data){
        for(let element of data){
            let li = document.createElement('li');
            li.textContent = `${element.commit.author.name}: ${element.commit.message}`; 
            ul.appendChild(li);
        }
    }

    try{
        let response = await fetch(`https://api.github.com/repos/${username.value}/${repoInput.value}/commits`)
        if(response.status !== 200) throw new Error(`${response.status} (${response.statusText})`);
        let data = await response.json();
        attachElements(data);
    } catch(e){
        console.log(e);
        let li = document.createElement('li');
        li.textContent = e;
        ul.appendChild(li);
    }
}


// 0:
// author: {login: 'nakov', id: 1689586, node_id: 'MDQ6VXNlcjE2ODk1ODY=', avatar_url: 'https://avatars.githubusercontent.com/u/1689586?v=4', gravatar_id: '', …}
// comments_url: "https://api.github.com/repos/nakov/Nakov.io.cin/commits/642df65a82881f9f44ea99bc33a06a4e36ead299/comments"
// commit: {author: {…}, committer: {…}, message: 'Compressed the package icon', tree: {…}, url: 'https://api.github.com/repos/nakov/Nakov.io.cin/git/commits/642df65a82881f9f44ea99bc33a06a4e36ead299', …}
// committer: {login: 'nakov', id: 1689586, node_id: 'MDQ6VXNlcjE2ODk1ODY=', avatar_url: 'https://avatars.githubusercontent.com/u/1689586?v=4', gravatar_id: '', …}
// html_url: "https://github.com/nakov/Nakov.io.cin/commit/642df65a82881f9f44ea99bc33a06a4e36ead299"
// node_id: "MDY6Q29tbWl0NDE3MzExMjo2NDJkZjY1YTgyODgxZjlmNDRlYTk5YmMzM2EwNmE0ZTM2ZWFkMjk5"
// parents: [{…}]
// sha: "642df65a82881f9f44ea99bc33a06a4e36ead299"
// url: "https://api.github.com/repos/nakov/Nakov.io.cin/commits/642df65a82881f9f44ea99bc33a06a4e36ead299"
// [[Prototype]]: Object
// 1: {sha: 'fa416c15b59347e6e7501c9f95898af827a08ddb', node_id: 'MDY6Q29tbWl0NDE3MzExMjpmYTQxNmMxNWI1OTM0N2U2ZTc1MDFjOWY5NTg5OGFmODI3YTA4ZGRi', commit: {…}, url: 'https://api.github.com/repos/nakov/Nakov.io.cin/commits/fa416c15b59347e6e7501c9f95898af827a08ddb', html_url: 'https://github.com/nakov/Nakov.io.cin/commit/fa416c15b59347e6e7501c9f95898af827a08ddb', …}
// 2: {sha: 'b5e779a43411c4bc9d6bf447c42410fb2297a10f', node_id: 'MDY6Q29tbWl0NDE3MzExMjpiNWU3NzlhNDM0MTFjNGJjOWQ2YmY0NDdjNDI0MTBmYjIyOTdhMTBm', commit: {…}, url: 'https://api.github.com/repos/nakov/Nakov.io.cin/commits/b5e779a43411c4bc9d6bf447c42410fb2297a10f', html_url: 'https://github.com/nakov/Nakov.io.cin/commit/b5e779a43411c4bc9d6bf447c42410fb2297a10f', …}
