const port = 3001;
const express = require('express');
const app = express();
const ReviewController = require('./ReviewController');

app.use(express.json());

app.post('/controller/reviews/', ReviewController.insertOne);

app.put('/controller/reviews/:id', ReviewController.updateOne);

app.delete('/controller/reviews/:id', ReviewController.deleteOne);

app.get('/controller/reviews/', ReviewController.getAll);

app.get('/controller/reviews/:id', ReviewController.getOne);

app.get('/', (req, res) => {
    res.status(200).send('Temp Home Page');
 });

app.listen( port, () => {
    console.log(`listening on port ${port}`);
});
