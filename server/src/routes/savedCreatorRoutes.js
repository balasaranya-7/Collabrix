import express from 'express';
import {
  saveCreator,
  unsaveCreator,
  getSavedCreators,
} from '../controllers/savedCreatorController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, requireRole('brand'), saveCreator);
router.delete('/:creatorId', protect, requireRole('brand'), unsaveCreator);
router.get('/', protect, requireRole('brand'), getSavedCreators);

export default router;
