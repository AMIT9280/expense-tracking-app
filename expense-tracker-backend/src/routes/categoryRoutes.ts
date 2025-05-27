import { Router } from 'express';
import { getAllCategories, addCategory, deleteCategory, updateCategory} from '../controllers/category/categoryController';

const router = Router();

router.get('/', getAllCategories);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
