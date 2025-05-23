import express from 'express';
import {
  getAllPizzas,
  getPizzaById,
  updatePizza,
  deletePizza
} from '../controllers/pizzaController.js';

const router = express.Router();

router.get('/', getAllPizzas);
router.get('/:id', getPizzaById);
router.patch('/:id', updatePizza);
router.delete('/:id', deletePizza);

export default router;
