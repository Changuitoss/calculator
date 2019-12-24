const btn = document.querySelectorAll('.btn');
const lcd = document.querySelector('.lcd');
const igualBtn = document.querySelector('.igual');
const clearBtn = document.querySelector('.clear');

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
    },

    '-1': function(a, b) {
        return b - a;
    },

    '-2': function(a, b) {
        return - b - a;
    },
}


/* Botones numericos y operators */

btn.forEach(button => {
    button.addEventListener('click', clickBtn);
})

function clickBtn(e) {
    let key = e.target.textContent;
    
    if(!isNaN(key)) {
        lcdArr.push(Number(key));
    } else if (key != '=') {
        lcdArr.push(` ${key} `);
    }

    lcd.textContent = lcdArr.join('');
}

let lcdArr = []


/* Boton IGUAL */

igualBtn.addEventListener('click', clickIgual);


let lcdArrTotal = [];

function clickIgual(e) {
    let lcdJunto = lcdArr.join('');
    let lcdRearmado = lcdJunto.split(' ');

    if (lcdRearmado[0] == '') {  // borra el primer espacio que queda si inicias con algun operator.
        lcdRearmado.splice(0, 1);
    }

    lcdArrTotal = [...lcdRearmado];

    multiOperation('*', '/');

    if (lcdArrTotal.length > 0) {  // si lcdArrTotal = [], es porque comenzó la operacion con "/".
        multiOperation('+', '-');
        lcd.textContent = lcdArrTotal.join(' ');
    }
    
    // lcd.textContent = lcdArrTotal.join(' ');
    // lcdArr = lcdArrTotal.split('');
}

let total = 0;


function multiOperation(oper1, oper2) {
    while (lcdArrTotal.includes(oper1) || lcdArrTotal.includes(oper2) && lcdArrTotal.length > 4) {
        for (var i = 0; i < lcdArrTotal.length - 1; i += 2) {
            if (lcdArrTotal[0] == '-' || lcdArrTotal[0] == '+') {   // si empieza con un numero negativo
                switch(lcdArrTotal[i + 2]) {
                    case oper1:
                        total = operations[oper1](Number(lcdArrTotal[i + 1]), Number(lcdArrTotal[i + 3]));
                        lcdArrTotal.splice(i + 1, 3);
                        lcdArrTotal[i + 1] = total;
                        i = 0;
                        break;
                    case oper2:
                        total = operations[oper2](Number(lcdArrTotal[i + 1]), Number(lcdArrTotal[i + 3]));
                        lcdArrTotal.splice(i + 1, 3);
                        lcdArrTotal[i + 1] = total;
                        i = 0;
                        break;
                }
            } else if (lcdArrTotal[0] == "/" || lcdArrTotal[0] == "*") {  
                 lcd.textContent = `ERROR: ("${lcdArrTotal[0]}") no permitido en primera posicion.`
                 lcdArrTotal = [];
                 break;
            } else {
                switch(lcdArrTotal[i + 1]) {  // si empieza con un numero positivo
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
        }
    }
    for(var i = 0; i <= 1; i++) { 
        if (lcdArrTotal[0] == "/" || lcdArrTotal[0] == "*") {  
            lcd.textContent = `ERROR: ("${lcdArrTotal[0]}") no permitido en primera posicion.`
            lcdArrTotal = [];
        } else if(lcdArrTotal[0] == '-' && lcdArrTotal[0 + 2] == '+') {     //si los ultimos 2 numeros que quedan son 1ro negativo, 2do positivo.
            total = operations['-1'](Number(lcdArrTotal[i + 1]), Number(lcdArrTotal[i + 3]));
            lcdArrTotal.splice(i, 4);
            lcdArrTotal[i] = total;
        } else if (lcdArrTotal[0] == '-' && lcdArrTotal[0 + 2] == '-') {    //si los ultimos 2 numeros que quedan son 1ro negativo, 2do positivo.
            total = operations['-2'](Number(lcdArrTotal[i + 1]), Number(lcdArrTotal[i + 3]));
            lcdArrTotal.splice(i, 4);
            lcdArrTotal[i] = total;
        }

    }

    return lcdArrTotal;
}


/* Botón CLEAR */


clearBtn.addEventListener('click', clearScreen);

function clearScreen() {
    lcd.textContent = "";
    lcdArr = [];
}