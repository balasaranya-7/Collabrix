import express from 'express';
import {
  createProposal,
  getProposals,
  respondProposal,
} from '../controllers/proposalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createProposal);
router.get('/', protect, getProposals);
router.patch('/:id/respond', protect, respondProposal);

export default router;
