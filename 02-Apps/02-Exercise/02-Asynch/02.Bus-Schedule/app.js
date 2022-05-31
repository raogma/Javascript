function solve() {
    let infoBox = document.querySelector('.info');
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let currentStop = '';
    let nextStop = 'depot';

    async function depart() {
        try {
            let response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`);
            if (response.status !== 200){
                throw new Error;
            }

            let data = await response.json();

            departBtn.disabled = true; arriveBtn.disabled = false;

            currentStop = data.name
            infoBox.textContent = `Next stop ${currentStop}`;
            nextStop = data.next;

        } catch (error) {
            departBtn.disabled = true; arriveBtn.disabled = true;
            infoBox.textContent = 'Error';
        }
    }

    function arrive() {
        departBtn.disabled = false; arriveBtn.disabled = true;
        infoBox.textContent = `Arriving at ${currentStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();


// stopId {
//     name: stopName,
//     next: nextStopId
//   }