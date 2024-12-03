const db = require('../config/db');

class Comment {
  constructor(comment, bookID, userID) {
    this.comment = comment || '';
    this.bookID = bookID || null;
    this.userID = userID || null;
  }

  static async addComment(commentData) {
    const { comment, bookID, userID } = commentData;
    try {
      const [result] = await db.execute('INSERT INTO comments (comment, book_id, user_id) VALUES (?, ?, ?)', [
        comment,
        bookID,
        userID,
      ]);
      return result[0];
    } catch (err) {
      console.error('Yorum eklenirken hata meydana geldi, ', err.message);
    }
  }

  static async getAllComments() {
    try {
      const [rows] = await db.execute(
        'SELECT comments.id, comments.comment, comments.created_at, users.name, users.avatar FROM comments JOIN users ON comments.user_id = users.id ORDER BY created_at DESC'
      );
      return rows;
    } catch (err) {
      console.error('Yorum verileri alınamadı, ', err.message);
    }
  }

  static async getAllCommentsByBookID(bookID) {
    try {
      const [rows] = await db.execute(
        'SELECT comments.id, comments.comment, comments.created_at, users.name, users.avatar FROM comments JOIN users ON comments.user_id = users.id WHERE book_id = ? ORDER BY created_at DESC',
        [bookID]
      );
      return rows;
    } catch (err) {
      console.error('Yorum verileri alınamadı, ', err.message);
    }
  }

  static async getAllCommentsByUserID(userID) {
    try {
      const [rows] = await db.execute(
        'SELECT comments.id, comments.comment, comments.created_at, users.name, users.avatar FROM comments JOIN users ON comments.user_id = users.id WHERE user_id = ? ORDER BY created_at DESC',
        [userID]
      );
      return rows;
    } catch (err) {
      console.error('Yorum verileri alınamadı, ', err.message);
    }
  }

  static async getAllCommentsCount() {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_comments FROM comments');
      return result[0].total_comments;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async getAllCommentsCountByBookID(bookID) {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_comments FROM comments WHERE book_id = ?', [bookID]);
      return result[0].total_comments;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async getAllCommentsCountByUserID(userID) {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_comments FROM comments WHERE user_id = ?', [userID]);
      return result[0].total_comments;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async deleteCommentByID(commentID) {
    try {
      const [result] = await db.execute('DELETE FROM comments WHERE id = ?', [commentID]);
      return result[0];
    } catch (err) {
      console.error('Yorum silinemedi!, ', err.message);
    }
  }

  static async getLastComment(bookID) {
    try {
      const [result] = await db.execute(
        'SELECT comments.id, comments.comment, comments.created_at, users.name, users.avatar FROM comments JOIN users ON comments.user_id = users.id WHERE book_id = ? ORDER BY created_at DESC LIMIT 1',
        [bookID]
      );
      return result[0];
    } catch (err) {
      console.error('Yorum verileri alınamadı, ', err.message);
    }
  }
}

module.exports = Comment;
