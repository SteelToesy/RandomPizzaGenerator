import express from 'express';
import {
  getAllPizzas,
  getPizzaSummaries,
  getPizzaById,
  createPizza ,
  updatePizza,
  deletePizza
} from '../controllers/pizzaController.js';

const router = express.Router();

router.get('/summaries', getPizzaSummaries);
router.get('/', getAllPizzas);
router.get('/:id', getPizzaById);
router.post('/', createPizza);
router.put('/:id', updatePizza);
router.delete('/:id', deletePizza);

export default router;
