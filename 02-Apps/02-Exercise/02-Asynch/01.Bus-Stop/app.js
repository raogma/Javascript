function getInfo() {
    let input = document.getElementById('stopId');
    let divStopName = document.getElementById('stopName');
    let busesList = document.getElementById('buses');

    async function getResponse(){
        try {
            busesList.innerHTML = '';
            
            let response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${Number(input.value)}`);
            if (response.status !== 200){
                throw new Error;
            }

            let data = await response.json();
            divStopName.textContent = data.name;
            
            for (let bus in data.buses){
                let li = document.createElement('li');
                li.textContent = `Bus ${bus} arrives in ${data['buses'][bus]} minutes`;
                busesList.appendChild(li);
            }

        } catch(error) {
            divStopName.textContent = 'Error';
        }
    }
    getResponse()
}


// stopId: {
//     name: stopName,
//     buses: { busId: time, … }
//   }