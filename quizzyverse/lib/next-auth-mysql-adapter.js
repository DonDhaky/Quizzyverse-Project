import { query } from './mysql';
import bcrypt from 'bcrypt';

const MySQLAdapter = {

  async getAllUsers() {
    const result = await query('SELECT * FROM users');
    return result;
  },

  async getAllUsersSorted() {
    const result = await query('SELECT * FROM users ORDER BY xp DESC')
    return result;
  },

  async getUser(id) {
    const result = await query('SELECT * FROM users WHERE id = ?', [id]);
    return result.length ? result[0] : null;
  },

  async getUserByEmail(email) {
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    return result.length ? result[0] : null;
  },
  
  // async createUser(user) {
  //   const result = await query(
  //     'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  //     [user.username, user.mail, user.password]
  //   );
  //   return { id: result.insertId, ...user };
  // },

  async updateUser(user) {
    let hashedPassword = null;
    if (user.password) {
      hashedPassword = await bcrypt.hash(user.password, 10);
    }
    await query(
      'UPDATE users SET email = ?, password = ? WHERE id = ?',
      [user.email, hashedPassword, user.id]
    );
    return user;
  },

  async deleteUser(email) {
    await query('DELETE FROM users WHERE email = ?', [email]);
  },
  
  async deleteUserById(id) {
    await query('DELETE FROM users WHERE id = ?', [id]);
  },
};
export default MySQLAdapter;