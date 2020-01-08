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

btn.forEach(button => {
    button.addEventListener('click', clickBtn);
})

function clickBtn(e) {
    let key = e.target.textContent;
    input(key)
}

function input(key) {
    if (key == 'Enter') {
        clickIgual();
    }

    if(key == 'Backspace') {
        clearScreen();
    }

    if(!isNaN(key)) {
        lcdArr.push(Number(key));
    } else if (key == '+' || key == '-' || key == '*' || key == '/') {
        lcdArr.push(` ${key} `);
    } else if (key == '.') {
        lcdArr.push(`${key}`);
    }  

    if (lcdArrTotal.length != 0 && lcdArr[0] != total) {
        lcd1.textContent = lcdArrTotal;
    } else {
        lcd1.textContent = lcdArr.join('');
    }
}

window.addEventListener('keydown', numPad);

function numPad(e) {
    let key = e.key;
    input(key);
}


/* Boton IGUAL */

let lcdArrTotal = [];
let total = 0;

igualBtn.addEventListener('click', clickIgual);


function clickIgual(e) {
    setDisplay();
    multiOperation('*', '/');

    if (lcdArrTotal.length > 1) {  
        multiOperation('+', '-');
        isFloat(lcdArrTotal[0]);
    }  
    
    isFloat(lcdArrTotal[0]);
    lcdArr = lcdArrTotal; // para arrancar a trabajar con el resultado que tenés hasta el momento cuando ya apretaste IGUAL.
}

function setDisplay() { // reordena los arrays para mostrar en lcd1 y lcd2
    let lcdJunto = lcdArr.join('');
    let lcdRearmado = lcdJunto.split(' ');
    lcdArrTotal = [...lcdRearmado];
    return 
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

function isFloat(n) {
    if (n % 1 != 0) {
        return lcd2.textContent = n.toFixed(2);
    } else {
        return lcd2.textContent = n;
    }
}

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