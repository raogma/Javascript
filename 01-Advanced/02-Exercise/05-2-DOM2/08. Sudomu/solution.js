function solve() {
    function generateSum(rows){
        let generate = [];
        for (let i = 1; i <= rows.length; i++){
            generate.push(i);
        }
        return generate.reduce((a, b) => a + b);
    }

    function emptyChecker(tbody){
        let rows = tbody.children;
        for (let i = 0; i < rows.length; i++){
            let tr = rows[i];
            for (let j = 0; j < tr.children.length; j++){
                let td = tr.children[j];
                if (td.children[0].value === ''){
                    return false;
                }
            }
        }
        return true;
    }

    function rowcolChecker(totalSum, rows){
        for (let i = 0; i < rows.length; i++){
            let rowSum = 0;
            let tr = rows[i];
            for (let j = 0; j < tr.children.length; j++){
                let td = tr.children[j];
                rowSum += Number(td.children[0].value);
            }
            if (rowSum !== totalSum){
                return false;
            }
        }
        for (let i = 0; i < rows.length; i++){
            let colSum = 0;
            for (let j = 0; j < rows.length; j++){
                let tr = rows[j];
                let td = tr.children[i];
                colSum += Number(td.children[0].value);
            }
            if (colSum !== totalSum){
                return false;
            }
        }
        return true;
    }

    let tbody = document.querySelector('table tbody');
    let tfoot = document.querySelector('table tfoot');
    let p = document.querySelector('#exercise #check p');

    [check, clear] = tfoot.querySelectorAll('button');

    check.addEventListener('click', ev => {
        if (emptyChecker(tbody) && rowcolChecker(generateSum(tbody.children), tbody.children)){
            p.textContent = "You solve it! Congratulations!";
            p.style.color = 'green';
            tbody.parentElement.style.border = '2px solid green';
        } else {
            p.textContent = "NOP! You are not done yet...";
            p.style.color = 'red';
            tbody.parentElement.style.border = '2px solid red';
        }
    })

    ///////////////////////////////////////////////////////////////

    clear.addEventListener('click', ev =>{
        let rows = tbody.children;
        for (let i = 0; i < rows.length; i++){
            let tr = rows[i];
            for (let j = 0; j < tr.children.length; j++){
                let td = tr.children[j];
                td.children[0].value = '';
            }
        }
        p.textContent = "";
        p.style.color = '';
        tbody.parentElement.style.border = '';
    })
}