import express from 'express';
import {
  getCreators,
  getCreatorById,
  getCreatorByHandle,
  updateMyProfile,
  toggleDemoVerification,
} from '../controllers/creatorController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCreators);
router.get('/handle/:handle', getCreatorByHandle);
router.get('/:id', getCreatorById);
router.put('/me', protect, requireRole('creator'), updateMyProfile);
router.post('/:id/toggle-demo-verification', toggleDemoVerification);

export default router;
