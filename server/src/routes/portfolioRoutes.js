import express from 'express';
import {
  getCreatorPortfolio,
  getPortfolioItemById,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../controllers/portfolioController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/creator/:creatorId', getCreatorPortfolio);
router.get('/:id', getPortfolioItemById);
router.post('/', protect, requireRole('creator'), addPortfolioItem);
router.put('/:id', protect, requireRole('creator'), updatePortfolioItem);
router.delete('/:id', protect, requireRole('creator'), deletePortfolioItem);

export default router;
