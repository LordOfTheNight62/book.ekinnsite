const db = require('../config/db');

class User {
  constructor(userName, userSurname, userEmail, userPassword) {
    this.userName = userName;
    this.userSurname = userSurname;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }

  static async createUser(userData) {
    const { userName, userSurname, userEmail, userPassword } = userData;
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [userEmail]);
      if (rows.length > 0) throw new Error('registered-email');
      const [result] = await db.execute('INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)', [
        userName,
        userSurname,
        userEmail,
        userPassword,
      ]);
      return result[0];
    } catch (err) {
      console.error('Kullanıcı oluşturulurken hata meydana geldi ', err.message);
      throw err;
    }
  }

  static async setUserPassword(userID, userNewPassword) {
    try {
      const [result] = await db.execute('UPDATE users SET password = ? WHERE id = ?', [userNewPassword, userID]);
      return result[0];
    } catch (err) {
      console.error('Kullanıcı şifresi değiştirilemedi, ', err.message);
      throw err;
    }
  }

  static async getUserByID(userID) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userID]);
      return rows[0];
    } catch (err) {
      console.error('Kullanıcı bilgisi alınamadı, ', err.message);
      throw err;
    }
  }

  static async getUserByEmail(userEmail) {
    try {
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [userEmail]);
      return rows[0];
    } catch (err) {
      console.error('Kullanıcı bilgisi alınamadı, ', err.message);
      throw err;
    }
  }

  static async deleteUser(userID) {
    try {
      const [result] = await db.execute('DELETE FROM users WHERE id = ?', [userID]);
      return result[0];
    } catch (err) {
      console.error('Hesap silinirken hata oluştu, ', err.message);
      throw err;
    }
  }

  static async getAllUser() {
    try {
      const [rows] = await db.execute('SELECT * FROM users ORDER BY joined_at DESC');
      return rows;
    } catch (err) {
      console.error('Tüm kullanıcılar alınırken hata oluştu, ', err.message);
    }
  }

  static async getTotalUserCount() {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_users FROM users');
      return result[0].total_users;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async setUserAvatar(userAvatarValue, userID) {
    try {
      const [result] = await db.execute('UPDATE users SET avatar = ? WHERE id = ?', [userAvatarValue, userID]);
      return result[0];
    } catch (err) {}
  }
}

module.exports = User;
