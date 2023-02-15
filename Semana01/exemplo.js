console.log('hello world NodeJS Watch!!!');

// var vs let vs const

// JS ACEITA!!!
console.log(y);
var y;

// JS NAO ACEITA
// console.log(x)
// let x;

function fn() {
    var a = 5;
    console.log('dentro da funcao: ' + a);
}

fn();
// console.log(a) nao aceita

let result = 1 + 1;   // number + number = number
console.log({ msg: `result = 1 + 1;`, result });    // monta um objeto { result: result }

result = '1' + 1;   // string + number = string
console.log({ msg: `result = '1' + 1`, result }); 

result = 1 + '1';   // number + string = string
console.log({ msg: `result = 1 + '1';`, result }); 

// string sempre tem prioridade

result = 1 == '1';  // compara apenas valor
console.log({ msg: `result = 1 == '1';`, result });


result = 1 === '1'; // compara tipo
console.log({ msg: `result = 1 === '1';`, result });

result = null == undefined
console.log({ msg: `result = null == undefined `, result });

result = null == false
console.log({  msg: `result = null == false`, result });

result = undefined == false;
console.log({ msg: 'undefined == false', result });

//  MORAL DA HISTORIA, TIPOS EM JS NAO SAO CONFIAVEIS

function fn2(a, b) {
    return a + b;
}

// arrow functions
const fn3 = (a, b) => a + b;

const fn4 = (nome, sobrenome) => { 
    return nome + ' ' + sobrenome;
}

// omissao de () quando um parametro
const fn5 = param => param * param;

console.log(fn2(2, 3));
console.log(fn4('vini', 'fritzen'));
console.log(fn5(8));

const arr = [
    'twin peaks',
    'brooklin',
    'the last of us',
    'rick and morty',
    'walking dead',
    'vandinha',
    'casamento as cegas',
    'the witcher'
]

console.log({ arr, idx0: arr[0] });
const filtro = arr.filter(nome => nome.includes('a'))

console.log({ filtro })

const notas = [10, 7.5, 9, 7.5, 8.5];
let  soma = 0;
notas.forEach(n => {
    soma += n;
});
const media = soma/notas.length;
console.log({ media }); 

// funcao por parametro
// o primeiro parametro da funcao é um acumulador
// o segundo parametro da funcao assume cada um dos valores do vetor
const reduce = notas.reduce((a, b) => a + b/notas.length, 0);
console.log({ reduce })

class Usuario {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    fullname() {
        return this.nome + ' ' + this.sobrenome;
    }
}





