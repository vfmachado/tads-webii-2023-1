
const isAdmin = (req, res, next) => {

    const user = req.session.user;
    if (user.role == 'ADMIN') {
        return next();
    }

    return res.redirect('/error-auth.html?error=authorization');
}

module.exports = { isAdmin };

