import express from 'express';
const app = express();

app.use(express.static('./../RandomPizzaGenerator'));
app.use(express.json);

app.get('/', (req, res) => {
   res.sendFile('./../RandomPizzaGenerator/index.html')
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});