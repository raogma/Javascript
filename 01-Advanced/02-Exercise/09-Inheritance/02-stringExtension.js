(function solution(){
    String.prototype.ensureStart = function(str){
        let myStr = this.toString();
        if (myStr.startsWith(str)) return myStr;
        return str + myStr;
    }

    String.prototype.ensureEnd = function(str){
        let myStr = this.toString();
        if (myStr.endsWith(str)) return myStr;
        return myStr + str;
    }

    String.prototype.isEmpty = function(){
        let myStr = this.toString();
        return myStr.length === 0;
    }

    String.prototype.truncate = function(n){
        if(n < 4){
            return '.'.repeat(n);       //tested
        } 
        let myStr = this.toString();
        if(myStr.endsWith('...')){
            myStr = myStr.substr(0, myStr.length - 3);
        }

        if(myStr.length <= n) { //tested
            return myStr;
        }

        if(!myStr.includes(' ')){                       //tested
            return myStr.substr(0, n - 3) + '...';
        }

        myStr = myStr.substr(0, n);
        myStr = myStr.substr(0, myStr.lastIndexOf(' '));
        if (myStr.length + 3 > n){
            myStr = myStr.substr(0, myStr.lastIndexOf(' '));
        }
        return myStr + '...';
    }

    String.format = function (string, ...params){
        for (let i = 0; i < params.length; i++) {
            string = string.replace(`{${i}}`, params[i]);
        }
        return string;
    }
}())

let str = 'the quick brown';
// str = str.truncate(12); 
// console.log(str, str.length); //equal to n /// the quick...
str = str.truncate(11); 
console.log(str, str.length); // > n


str = str.truncate(16); // str.length < n
console.log(str);
str = str.truncate(14); // str.length > n also tested with str.length == n == 15 => fixed while l >= n
console.log(str);
str = str.truncate(8) ; // str.length > n ? should i remove the '...' before any operation
console.log(str);
str = str.truncate(4); // no split test
console.log(str);
str = str.truncate(1); // n < 4
console.log(str);
