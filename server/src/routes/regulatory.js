import express from 'express';
import { 
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
  getUpdates 
} from '../controllers/regulatory.js';

const router = express.Router();

router.get('/alerts', getAlerts);
router.post('/alerts', createAlert);
router.put('/alerts/:id', updateAlert);
router.delete('/alerts/:id', deleteAlert);
router.get('/updates', getUpdates);

export default router;
