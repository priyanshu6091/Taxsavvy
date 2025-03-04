import express from 'express';
import { 
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
  getUpdates 
} from '../controllers/regulatory.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/alerts', auth, getAlerts);
router.post('/alerts', auth, createAlert);
router.put('/alerts/:id', auth, updateAlert);
router.delete('/alerts/:id', auth, deleteAlert);
router.get('/updates', auth, getUpdates);

export default router;
