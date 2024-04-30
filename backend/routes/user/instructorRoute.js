import express from 'express';
import controller from '../../controllers/user/instructorController.js';

const router = express.Router();

router.post('/courses', controller.courses);
router.post('/stats', controller.stats);
router.post('/stats-by-month', controller.statsByMonth);

export default router;
