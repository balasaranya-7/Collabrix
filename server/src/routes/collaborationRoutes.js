import express from 'express';
import {
  getCollaborations,
  getCollaborationById,
  submitDeliveryAsset,
  requestRevision,
  completeCollaboration,
} from '../controllers/collaborationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getCollaborations);
router.get('/:id', protect, getCollaborationById);
router.post('/:id/assets', protect, submitDeliveryAsset);
router.post('/:id/revisions', protect, requestRevision);
router.post('/:id/complete', protect, completeCollaboration);

export default router;
