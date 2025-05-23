import express from 'express';
import pizzaRoutes from './routes/pizzaRouter.js';
const app = express();

app.use(express.static('./../Frontend'));
app.use(express.json());
app.use('/api/v1/pizzas', pizzaRoutes);

app.get('/', (req, res) => {
   res.sendFile('./../Frontend/index.html')
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});

export const port = 3000;