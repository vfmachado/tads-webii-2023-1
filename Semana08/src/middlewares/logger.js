
const logger = (req, res, next) => {

    const user = req.session.user;
    
    if (user)
        console.log('USUARIO AUTENTICADO ' + user.email + ' SOLICITANDO O RECURSO ' + req.originalUrl + ' AS ' + new Date());
    else
        console.log('USUARIO NAO AUTENTICADO SOLICITANDO O RECURSO ' + req.originalUrl + ' AS ' + new Date());
    return next();
}

module.exports = { logger };

