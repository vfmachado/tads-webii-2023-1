
const express = require('express');
const { userRoutes } = require("./users/users-routes");
const app = express();

app.use(express.urlencoded());  

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))

app.use(userRoutes);

app.listen(3000, () => console.log('RODANDO NA PORTA 3000'));

