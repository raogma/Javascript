function attachEventsListeners() {
    let data = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    document.querySelector('#convert').addEventListener('click', ev =>{
        let inputNum = Number(document.querySelector('#inputDistance').value);
        let inputUnit = document.querySelector('#inputUnits').value;

        let numToMeters = inputNum * data[inputUnit];
        
        let outputUnit = document.querySelector('#outputUnits').value;

        document.querySelector('#outputDistance').value = numToMeters / data[outputUnit];
    })
}