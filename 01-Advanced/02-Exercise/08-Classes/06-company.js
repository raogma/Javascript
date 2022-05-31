class Company{
    constructor(){
        this.departments = {};
    }
    addEmployee(name, salary, position, department){
        [name, salary, position, department].map(x => {
            if (x === '' || x === null || x === undefined){
                throw new Error("Invalid input!");
            }
        })
        if (salary < 0){
            throw new Error("Invalid input!");
        }

        if(!Object.keys(this.departments).includes(department)){
            this.departments[department] = [];
        }
        this.departments[department].push({name, salary, position});

        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment() {
        function getAverage(department){
            let total = [];
            department.map(x => total.push(Number(x.salary)));
            return total.reduce((x,y) => x + y) / total.length;
        }

        function getHighestDepartment(departments){
            let highestAverage = 0;
            let highestDepartment = '';
            for (let department in departments){
                let average = getAverage(departments[department]);
                if (average > highestAverage){
                    highestAverage = average;  
                    highestDepartment = department;
                } 
            }
            return [highestAverage, highestDepartment];
        }

        let [highestAverage, highestDepartment] = getHighestDepartment(this.departments);
        let workersArr = this.departments[highestDepartment];

        workersArr.sort((a,b) => {
            if (a.salary === b.salary){
                return a.name.localeCompare(b.name);
            }
            return b.salary - a.salary;
        })

        let res = `Best Department is: ${highestDepartment}
Average salary: ${Number(highestAverage).toFixed(2)}\n`;

        workersArr.map(x => res += x.name + ' ' + x.salary + ' ' + x.position + '\n');
        return res.slice(0, res.length - 1);
    }
}

// departments = {
//     department1 : [
//         {name: 'Pesho', 'salary': 1000, 'position': 'worker'},
//         {name: 'Pesho', 'salary': 1000, 'position': 'worker'},
//         {name: 'Pesho','salary': 1000, 'position': 'worker'},
//     ]
// }

let c = new Company();
console.log(c.addEmployee("Stanimir", 2000, "engineer", "Construction"));
console.log(c.addEmployee("Pesho", 1500, "electrical engineer", "Construction"));
console.log(c.addEmployee("Slavi", 500, "dyer", "Construction"));
console.log(c.addEmployee("Stan", 2000, "architect", "Construction"));
console.log(c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing"));
console.log(c.addEmployee("Pesho", 1000, "graphical designer", "Marketing"));
console.log(c.addEmployee("Gosho", 1350, "HR", "Human resources"));
console.log(c.bestDepartment());