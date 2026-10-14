import express from 'express';
import {
  createBrief,
  getBriefs,
  getBriefById,
  updateBrief,
  deleteBrief,
  generateAiBrief,
} from '../controllers/briefController.js';
import { protect, optionalAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, requireRole('brand'), createBrief);
router.get('/', optionalAuth, getBriefs);
router.get('/:id', getBriefById);
router.put('/:id', protect, requireRole('brand'), updateBrief);
router.delete('/:id', protect, requireRole('brand'), deleteBrief);
router.post('/ai-assist', generateAiBrief);

export default router;
