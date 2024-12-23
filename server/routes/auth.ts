import { Router } from 'express';
import { validateTelegramAuth } from '../middleware/telegramAuth';
import { generateToken } from '../utils/jwt';
import { debugLog } from '../utils/debug';

const router = Router();

router.post('/telegram', validateTelegramAuth, async (req, res) => {
  try {
    const user = req.telegramUser;
    
    if (!user?.id) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    const token = generateToken(user);
    
    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name
      }
    });
  } catch (error) {
    debugLog('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;