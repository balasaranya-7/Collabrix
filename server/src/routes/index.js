import express from 'express';
import authRoutes from './authRoutes.js';
import creatorRoutes from './creatorRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import briefRoutes from './briefRoutes.js';
import matchRoutes from './matchRoutes.js';
import proposalRoutes from './proposalRoutes.js';
import collaborationRoutes from './collaborationRoutes.js';
import savedCreatorRoutes from './savedCreatorRoutes.js';
import messageRoutes from './messageRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/creators', creatorRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/briefs', briefRoutes);
router.use('/brief-builder', briefRoutes); // alias for /brief-builder/ai-assist
router.use('/matches', matchRoutes);
router.use('/proposals', proposalRoutes);
router.use('/collaborations', collaborationRoutes);
router.use('/saved-creators', savedCreatorRoutes);
router.use('/conversations', messageRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
