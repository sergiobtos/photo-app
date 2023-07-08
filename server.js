const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Serving photo app on http://localhost:${port}`)
});
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});