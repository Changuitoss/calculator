const btn = document.querySelectorAll('.btn');
const lcd = document.querySelector('.lcd');
const igual = document.querySelector('.igual');

let operations = {
   ' + ': function(a, b) {
        return a + b;
    },
    
    ' - ': function(a, b) {
        return a - b;
    },
    
    ' * ': function(a, b) {
        return a * b;
    },
    
    ' / ': function(a, b) {
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
    }else {
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
    const [a, b, c] = lcdArr;
    //console.log(operations[b](a, c));
    lcd.textContent = operations[b](a, c); 
}