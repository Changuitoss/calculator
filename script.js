const btn = document.querySelectorAll('.btn');
const lcd1 = document.querySelector('.lcd1');
const lcd2 = document.querySelector('.lcd2');
const igualBtn = document.querySelector('.igual');
const clearBtn = document.querySelector('.clear');
const puntoBtn = document.querySelector('.punto');

let operations = {
   '+': function(a, b) {
        return a + b;
    },
    
    '-': function(a, b) {
        return a - b;
    },
    
    '*': function(a, b) {
        return a * b;
    },
    
    '/': function(a, b) {
        return a / b;
    }
}


/* Botones numericos y operators */

let lcdArr = []

function clickBtn(e) {
    let key = e.target.textContent;

    if(!isNaN(key)) {
        lcdArr.push(Number(key));
    } else if (key != '=' && key != '.') {
        lcdArr.push(` ${key} `);
    } else if (key != '=') {
        lcdArr.push(`${key}`);
    }  

    if (lcdArrTotal.length != 0 && lcdArr[0] != total) {
        lcd1.textContent = lcdArrTotal;
    } else {
        lcd1.textContent = lcdArr.join('');
    }  
}

btn.forEach(button => {
    button.addEventListener('click', clickBtn);
})



/* Boton IGUAL */

igualBtn.addEventListener('click', clickIgual);


let lcdArrTotal = [];

function isFloat(n) {
    if (n % 1 != 0) {
        return lcd2.textContent = n.toFixed(2);
    } else {
        return lcd2.textContent = n;
    }
}

function clickIgual(e) {
    let lcdJunto = lcdArr.join('');
    let lcdRearmado = lcdJunto.split(' ');
    lcdArrTotal = [...lcdRearmado];

    multiOperation('*', '/');

    if (lcdArrTotal.length > 0) {  // si lcdArrTotal = [], es porque comenzó la operacion con "/".
        multiOperation('+', '-');
        isFloat(lcdArrTotal[0]);
    }  
    
    lcd2.textContent = isFloat(lcdArrTotal[0]);
    lcdArr = lcdArrTotal; // para arrancar a trabajar con el resultado que tenés hasta el momento cuando ya apretaste IGUAL.
}

let total = 0;

function execOperations(i, step, oper1, oper2) {
    switch(lcdArrTotal[i + step]) {
        case oper1:
            total = operations[oper1](Number(lcdArrTotal[i]), Number(lcdArrTotal[i + 2]));
            lcdArrTotal.splice(i, 2);
            lcdArrTotal[i] = total;
            i = 0;
            break;
        case oper2:
            total = operations[oper2](Number(lcdArrTotal[i]), Number(lcdArrTotal[i + 2]));
            lcdArrTotal.splice(i, 2);
            lcdArrTotal[i] = total;
            i = 0;
            break;
    }
}

function multiOperation(oper1, oper2) {
    while (lcdArrTotal.includes(oper1) || lcdArrTotal.includes(oper2)) {
        for (var i = 0; i < lcdArrTotal.length - 1; i += 2) {
            if (lcdArr[0] == '-' || lcdArr[0] == '+') {   // si empieza con un numero negativo
                execOperations(i, 2, oper1, oper2);

            }  else if (lcdArrTotal[0] == "" && lcdArrTotal[1] == "+") {  // en caso de que arranque con "+", lo borra.
                lcdArrTotal.splice(0, 2);
                execOperations(i, 1, oper1, oper2);

            } else if (lcdArrTotal[0] == "" && lcdArrTotal[1] != "+" && lcdArrTotal[1] != "-") {  
                lcdArrTotal = [`ERROR: ("${lcdArrTotal[1]}") no permitido.`];
                break;

            } else {
                execOperations(i, 1, oper1, oper2);
            }
        }
    }    
    return lcdArrTotal;
}


/* Botón CLEAR */


clearBtn.addEventListener('click', clearScreen);

function clearScreen() {
    lcd1.textContent = "";
    lcd2.textContent = "";
    lcdArrTotal = [];
    lcdArr = [];
    total = [];
}


//todo: que marque las centenes con el resultado    