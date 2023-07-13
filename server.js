const express = require('express');
const app = express();
const db = require('./models')
const bodyParser = require('body-parser');
const expressSEssion = require('express-session');

app.use(expressSEssion({
    secret: 'secret'
}));
global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

const PhotosRouter = require('./routes/PhotosRouter');
const CommentsRouter = require('./routes/CommentsRouter');
const UsersRouter = require('./routes/UsersRouter');
const PageRouter = require('./routes/PageRouter');


app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/images', PhotosRouter);
app.use('/comments', CommentsRouter);
app.use('/users', UsersRouter);
app.use('/', PageRouter);

//db

// db.sequelize
//     .sync({})
//     .then(() => {
//     app.listen(sqlPort, () => {
//         console.log(`Mariadb Connection successfully established http://localhost:${sqlPort}`);
//     })
//     .catch(err => {
//         console.error("Unable to connect to database: " + err.message)
//     });
// })


//server
const port = 8080;
app.listen(port, () => {
    console.log(`Serving photo app on http://localhost:${port}`)
});
