import express from 'express';
import { getMatchesForBrief, analyzeBriefMatchesQuick } from '../controllers/matchController.js';

const router = express.Router();

router.get('/:briefId', getMatchesForBrief);
router.post('/quick-analyze', analyzeBriefMatchesQuick);

export default router;
