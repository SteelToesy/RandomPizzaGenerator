import express from 'express';
import {
  getAllPizzas,
  createPizza ,
  getPizzaSummaries,
  getPizzaById,
  updatePizza,
  deletePizza
} from '../controllers/pizzaController.js';

const router = express.Router();

router.get('/', getAllPizzas);
router.get('/:id', getPizzaById);
router.get('/summaries', getPizzaSummaries);
router.post('/', createPizza);
router.patch('/:id', updatePizza);
router.delete('/:id', deletePizza);

export default router;
