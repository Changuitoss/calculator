const btn = document.querySelectorAll('.btn');
const lcd = document.querySelector('.lcd');
const igual = document.querySelector('.igual');

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

igual.addEventListener('click', clickIgual);


let lcdArrTotal = [];

function clickIgual(e) {
    let lcdJunto = lcdArr.join('');
    let lcdRearmado = lcdJunto.split(' ');
    lcdArrTotal = [...lcdRearmado];
    console.log('lcdArrTotal (dentro de clickIgual):', lcdArrTotal);
    console.log('lcdArrTotal incluye *?:', lcdArrTotal.includes('*'));
    console.log('lcdArrTotal length:', lcdArrTotal.length);

    lcd.textContent = multiOperation(lcdArrTotal);
}

let total = 0;


function multiOperation(lcdArrTotal) {
    while (lcdArrTotal.includes('*') || lcdArrTotal.includes('/')) {
        for (var i = 0; i < lcdArrTotal.length - 1; i += 2) {
            switch(lcdArrTotal[i + 1]) {
                case '*':
                    total = operations['*'](lcdArrTotal[i], lcdArrTotal[i + 2]);
                    lcdArrTotal.splice(i, 2);
                    lcdArrTotal[i] = total;
                    i = 0;
                    break;
                case '/':
                    total = operations['/'](lcdArrTotal[i], lcdArrTotal[i + 2]);
                    lcdArrTotal.splice(i, 2);
                    lcdArrTotal[i] = total;
                    i = 0;
                    break;
            }
        }
    }

    while (lcdArrTotal.includes('+') || lcdArrTotal.includes('-')) {
        for (var i = 0; i < lcdArrTotal.length - 1; i += 2) {
            switch(lcdArrTotal[i + 1]) {
                case '+':
                    total = operations['+'](Number(lcdArrTotal[i]), Number(lcdArrTotal[i + 2]));
                    lcdArrTotal.splice(i, 2);
                    lcdArrTotal[i] = total;
                    i = 0;
                    break;
                case '-':
                    total = operations['-'](lcdArrTotal[i], lcdArrTotal[i + 2]);
                    lcdArrTotal.splice(i, 2);
                    lcdArrTotal[i] = total;
                    i = 0;
                    break;
            }
        }
    }
    return lcdArrTotal;
}




/*for (var i = 0; i < lcdArr.length - 1; i + 2) {
    switch(lcdArr[i + 1]) {
        case '*':
            operations['*'](lcdArr[i], lcdArr[i + 2]);
            break;
        case '/':
            operations['/'](lcdArr[i], lcdArr[i + 2]);
            break;
    }
}*/
