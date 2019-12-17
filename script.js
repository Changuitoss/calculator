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
// usar [...rest]?
// ordenar la lcdArr para que queden primero los '*' y '/'  ??

igual.addEventListener('click', clickIgual);

function clickIgual(e) {
    let lcdJunto = lcdArr.join('');
    let lcdRearmado = lcdJunto.split(' ');

    const [a, b, c] = lcdRearmado;

    lcd.textContent = operations[b](Number(a), Number(c)); 
}


for (var i = 0; i < lcdArr.length; i + 2) {
    if(lcdArr[i + 1] == '*') {
        lcdRearmado.reduce((total, num) => {
            return total * num
        })
        operations[b](Number(a), Number(c))
    }
}