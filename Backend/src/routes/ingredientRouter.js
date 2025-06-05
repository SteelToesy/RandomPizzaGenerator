import express from 'express';
import {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientsGroupedByCategory
} from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', getAllIngredients);
router.get('/grouped', getIngredientsGroupedByCategory);
router.get('/:id', getIngredientById);
router.post('/', createIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;