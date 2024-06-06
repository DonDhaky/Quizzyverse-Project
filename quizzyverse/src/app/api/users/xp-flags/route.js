import { getSession } from 'next-auth/react';
import MySQLAdapter from '../../../../../lib/next-auth-mysql-adapter';

export default async (req, res) => {
    const session = await getSession({ req });
  
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const { user } = session;
    const { xp } = req.body;
  
    try {
      const result = await MySQLAdapter.updateUserXp(user.email, xp);
      if (result) {
        res.status(200).json({ message: 'XP updated successfully' });
      } else {
        res.status(500).json({ error: 'Error updating XP' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating XP' });
    }
  };