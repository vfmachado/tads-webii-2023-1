
const isAuth = (req, res, next) => {

    const user = req.session.user;
    if (user) {
        return next();
    }

    return res.redirect('/error-auth.html');
}

module.exports = { isAuth };

