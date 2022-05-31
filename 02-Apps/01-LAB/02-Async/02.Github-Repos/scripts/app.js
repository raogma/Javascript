async function loadRepos() {
	let user = document.getElementById('username').value;
	let list = document.getElementById('repos');
	let url = `https://api.github.com/users/${user}/repos`;

	try {
		list.innerHTML = '';
		let response = await fetch(url);
		if(response.ok === false) {
			li.innerHTML = `${response.status} ${response.statusText}`;
		}

		let data = await response.json();

		for (let element of data){
			let li = document.createElement('li');
			li.innerHTML = `<a href="${element.html_url}">
${element.full_name}
</a>`
			list.appendChild(li);
		}
	} catch(error) {
		li = document.createElement('li');
		li.innerHTML = error;
		list.appendChild(li);
	}
}
