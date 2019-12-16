const btn = document.querySelectorAll('.btn');
const lcd = document.querySelector('.lcd');


function sum(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


function operate(oper, a, b) {
    switch(oper) {
        case '+':
            return sum(a, b);
            break;
        case '-':
            return substract(a, b);
            break;  
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return console.log('no es una operacion valida');
    }
}


btn.forEach(button => {
    button.addEventListener('click', clickBtn);
})

function clickBtn(e) {
    let key = e.target.textContent;
    
    if(!isNaN(key)) {
        lcdArr.push(key);
    }else {
        lcdArr.push(` ${key} `);
    }
    
    lcd.textContent = lcdArr.join('');
}

let lcdArr = []