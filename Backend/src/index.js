import express from 'express';
import pizzaRouter from './routes/pizzaRouter.js';
import recipeRouter from './routes/recipeRouter.js';
import ingredientRouter from './routes/ingredientRouter.js';
import reviewRouter from './routes/reviewRouter.js';
const app = express();

app.use(express.static('./../Frontend'));
app.use(express.json());
app.use('/api/v1/pizzas', pizzaRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/ingredients', ingredientRouter);
app.use('/api/v1/reviews', reviewRouter);

app.get('/', (req, res) => {
   res.sendFile('./../Frontend/index.html')
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});

export const port = 3000;