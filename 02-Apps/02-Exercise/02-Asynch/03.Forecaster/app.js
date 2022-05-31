// i've made optional improvements of the exercise in order to achieve multiple inputs
// error is displayed in label instead of in plain div
// tested with input: invalid => valid => invalid
//                    valid => valid
//                    invalid => invalid
//                    valid => invalid => valid

function attachEvents() {
    let forecastSection = document.querySelector('#forecast');
    let symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    document.querySelector('#submit').addEventListener('click', ev => {
        let inputLocation = document.querySelector('#location').value;

        async function requestLocation(urlLocations) {
            try {
                let response = await fetch(urlLocations);
                if (response.status !== 200) {
                    throw new Error;
                }

                let locationsList = await response.json();

                let currLocation = locationsList.find(x => x.name === inputLocation);
                let code = currLocation.code;
                return code;
            } catch (err) {
                forecastSection.querySelector('#current .label').textContent = 'Error';
                forecastSection.querySelector('#upcoming .label').textContent = '';
                let current = forecastSection.querySelector('#current .forecasts');
                let upcomings = Array.from(forecastSection.querySelectorAll('#upcoming .upcoming'));
                if(current !== null && upcomings.length !== 0) {
                    current.remove();
                    upcomings.map(x =>x.remove());
                }
            }
        }

        async function requestCurrentConditions(urlToday) {
            let response = await fetch(urlToday);
            return await response.json();
        }

        async function requestUpcommingConditions(urlUpcomming) {
            let response = await fetch(urlUpcomming);
            return await response.json();
        }

        async function attachDOMElements() {
            let code = await requestLocation('http://localhost:3030/jsonstore/forecaster/locations');
            forecastSection.style.display = 'block';

            if (code) {
                let [todayObj, upcomingObj] = await Promise.all([
                    requestCurrentConditions(`http://localhost:3030/jsonstore/forecaster/today/${code}`),
                    requestUpcommingConditions(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                ])

                // generating Current Conditions
    
                let condition = todayObj.forecast.condition;
                let degrees = symbols.Degrees;
    
                document.querySelector('#current').innerHTML = 
`<div class="label">Current conditions</div>
<div class="forecasts">
    <span class="condition symbol">${symbols[condition]}</span>
    <span class="condition">
        <span class="forecast-data">${todayObj.name}</span>
        <span class="forecast-data">${todayObj.forecast.low}${degrees}/${todayObj.forecast.high}${degrees}</span>
        <span class="forecast-data">${condition}</span>
    </span>
</div>
`
                // generating Three-day Forecast
    
                let upcomingSection = document.querySelector('#upcoming');

                let forecastInfo = document.createElement('div');
                forecastInfo.className = 'forecast-info';

                for (let day of upcomingObj.forecast) {
                    let upcomingCondition = day.condition;
    
                    let upcomingInfo = document.createElement('span');
                    upcomingInfo.className = 'upcoming';
                    upcomingInfo.innerHTML =
`<span class="symbol">${symbols[upcomingCondition]}</span>
<span class="forecast-data">${day.low}${degrees}/${day.high}${degrees}</span>
<span class="forecast-data">${upcomingCondition}</span>
</span>`
                    forecastInfo.appendChild(upcomingInfo);
                }

                upcomingSection.innerHTML = 
`<div class="label">Three day forecast</div>
${forecastInfo.innerHTML}
`
            }
        }
        attachDOMElements();
    })
}
attachEvents();