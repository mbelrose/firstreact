const port = 3001;
const express = require('express');
const app = express();
const {getOne, getAll, updateOne} = require('./ReviewController');

app.use(express.json());

app.post('controller/reviews', updateOne);

app.get('/controller/reviews', getAll);

app.get('/controller/reviews/:id', getOne);

app.get('/', (req, res) => {
    res.status(200).send('Temp Home Page');
 });

app.listen( port, () => {
    console.log(`listening on port ${port}`);
});
