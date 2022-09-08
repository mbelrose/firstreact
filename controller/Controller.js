const port = 3001;
const express = require('express');
const app = express();
const {getOne} = require('./ReviewController');

app.get('/controller/review/:id', getOne);
app.get('/', (req, res) => {
    res.status(200).send('Temp Home Page');
 });

app.listen( port, () => {
    console.log(`listening on port ${port}`);
});
