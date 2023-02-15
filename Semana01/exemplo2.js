// O MUNDO É ASYNC
console.log('antes da funcao');
const buscaUsuario = (usuario) => setTimeout(() => {
    console.log('EXECUTEI a funcao');
    Object.assign(usuario, { user: 'vini', senha: '1234'})
    console.log({ usuario })
}, 5000);

let usuario = { };
buscaUsuario(usuario);

setTimeout(() => {
    console.log({ usuario })
 }, 6000)


console.log('fora da funcao');