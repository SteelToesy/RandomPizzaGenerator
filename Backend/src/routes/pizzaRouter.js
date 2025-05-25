import express from 'express';
import {
  getAllPizzas,
  createPizza ,
  getPizzaById,
  updatePizza,
  deletePizza
} from '../controllers/pizzaController.js';

const router = express.Router();

router.get('/', getAllPizzas);
router.post('/', createPizza);
router.get('/:id', getPizzaById);
router.patch('/:id', updatePizza);
router.delete('/:id', deletePizza);

export default router;
