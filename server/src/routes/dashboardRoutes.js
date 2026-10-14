import express from 'express';
import {
  getBrandDashboardStats,
  getCreatorDashboardStats,
} from '../controllers/dashboardController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/brand', protect, requireRole('brand'), getBrandDashboardStats);
router.get('/creator', protect, requireRole('creator'), getCreatorDashboardStats);

export default router;
