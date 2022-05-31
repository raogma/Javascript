function studentsImport() {
    let url = 'http://localhost:3030/jsonstore/collections/students';
    let tableBody = document.querySelector('#results tbody');
    let form = document.querySelector('form');
    
    //load all existing info
    attachElements(fetch(url), 'get'); 

    form.addEventListener('submit', ev => {
        let inputs = new FormData(form);

        attachElements(fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                firstName: inputs.get('firstName'),
                lastName: inputs.get('lastName'),
                facultyNumber: inputs.get('facultyNumber'),
                grade: inputs.get('grade')
            })
        }), 'post');

        form.reset()
    })



    async function attachElements(query, method) {
        methodsDict = {
            get: function (data) {
                tableBody.replaceChildren();
                for (key in data) {
                    let tr = document.createElement('tr');
                    tr.innerHTML = 
`<td>${data[key].firstName}</td>
<td>${data[key].lastName}</td>
<td>${data[key].facultyNumber}</td>
<td>${Number(data[key].grade).toFixed(2)}</td>
`;
                    tableBody.appendChild(tr);
                }
            },
            post: function (data) {
                let tr = document.createElement('tr');
                tr.innerHTML = 
`<td>${data.firstName}</td>
<td>${data.lastName}</td>
<td>${data.facultyNumber}</td>
<td>${Number(data.grade).toFixed(2)}</td>
`;
                tableBody.appendChild(tr);
                
            }
        }

        try {
            let response = await query;
            if (response.status !== 200) throw new Error;
            let data = await response.json();
            
            methodsDict[method](data);
        } catch (e) {
            alert(e.message);
        }
    }
}

studentsImport();


// 54e6d099-6e00-4613-97b7-bc2b6bdc1db5:
// facultyNumber: "90000587896"
// firstName: "Isaac"
// grade: 4.99
// lastName: "Netero"
// _id: "54e6d099-6e00-4613-97b7-bc2b6bdc1db5"