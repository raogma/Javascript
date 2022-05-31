function solve() {
   let resResName = document.querySelector('#bestRestaurant p');
   let resWorkers = document.querySelector('#workers p');
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick () {
      function processInput(textArr) {
            let data = {};
            for (let element of textArr) {
               [restaurantName, workersInfo] = element.split(' - ');
               if (!Object.keys(data).includes(restaurantName)){
                  data[restaurantName] = { workers: [], salaries: [] };
               }
               for (let subelement of workersInfo.split(', ')) {
                  [workerName, salary] = subelement.split(' ');
                  salary = Number(salary);
                  data[restaurantName]['workers'].push(workerName);
                  data[restaurantName]['salaries'].push(salary);
               }
               data[restaurantName]['average'] = data[restaurantName]['salaries'].reduce((x, y) => x + y) / data[restaurantName]['salaries'].length;
               data[restaurantName]['max'] = Math.max(...data[restaurantName]['salaries']);
            }
            return data;
      }
      function findBestRestaurant(data){
            let biggestValue = Object.values(data).sort((a,b) => b.average - a.average)[0];
            let key = Object.keys(data).find(x => data[x] === biggestValue);
            return [key, biggestValue];
      }
      //restaurant info
      let textArr = JSON.parse(document.querySelector('textarea').value);
      [key, value] = findBestRestaurant(processInput(textArr));
      resResName.textContent = `Name: ${key} Average Salary: ${value.average.toFixed(2)} Best Salary: ${value.max.toFixed(2)}`;

      //workers info
      let stringRes = '';
      let workersData = {};
      for (let i = 0; i < value['workers'].length; i++) {
         workersData[value['workers'][i]] = value['salaries'][i]
      }
      for (salary of Object.values(workersData).sort((a,b) => b - a)){
         let workerName = Object.keys(workersData).find(x => workersData[x] === salary);
         stringRes += `Name: ${workerName} With Salary: ${salary} `;
      }
      resWorkers.textContent = stringRes;
   }
}