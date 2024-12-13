const path = require('path');
const db = require(path.join(__dirname, '../config/db'));

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
        'SELECT comments.*, SUM(CASE WHEN likesdislikes.isLike = 1 THEN 1 ELSE 0 END) AS total_likes, SUM(CASE WHEN likesdislikes.isLike = 0 THEN 1 ELSE 0 END) AS total_dislikes, users.name, users.avatar FROM comments JOIN users ON comments.user_id = users.id LEFT JOIN likesdislikes ON comments.id = likesdislikes.comment_id WHERE book_id = ? GROUP BY comments.id ORDER BY created_at DESC',
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

  static async addLikeOrDislike(userID, commentID, isLike) {
    isLike = isLike ? 1 : 0;
    try {
      const [result] = await db.execute('INSERT INTO likesdislikes (user_id, comment_id, isLike) VALUES (?, ?, ?)', [
        userID,
        commentID,
        isLike,
      ]);
      return result[0];
    } catch (err) {
      if (isLike) console.error(`${commentID} id olan yoruma beğeni eklenemedi, `, err.message);
      else console.error(`${commentID} id olan yoruma beğenmeme eklenemedi, `, err.message);
    }
  }

  static async deleteLikeOrDislike(userID, commentID) {
    try {
      const [result] = await db.execute('DELETE FROM likesdislikes WHERE user_id = ? AND comment_id = ?', [
        userID,
        commentID,
      ]);
      return result[0];
    } catch (err) {
      console.error(`${commentID} id olan yorum beğenisi veya beğenmemesi kaldırılamadı, `, err.message);
    }
  }

  static async isLike(userID, bookID) {
    try {
      const [rows] = await db.execute(
        'SELECT likesdislikes.*, comments.book_id FROM likesdislikes JOIN comments ON comments.id = likesdislikes.comment_id WHERE comments.book_id = ? AND likesdislikes.user_id = ? AND likesdislikes.isLike = ?',
        [bookID, userID, 1]
      );
      return rows;
    } catch (err) {
      console.error('Beğeni kontrolünde hata: ', err.message);
    }
  }

  static async isDislike(userID, bookID) {
    try {
      const [rows] = await db.execute(
        'SELECT likesdislikes.*, comments.book_id FROM likesdislikes JOIN comments ON comments.id = likesdislikes.comment_id WHERE comments.book_id = ? AND likesdislikes.user_id = ? AND likesdislikes.isLike = ?',
        [bookID, userID, 0]
      );
      return rows;
    } catch (err) {
      console.error('Beğenmeme kontrolünde hata: ', err.message);
    }
  }

  static async checkLikeOrDislikeByUser(userID, commentID) {
    try {
      const [result] = await db.execute('SELECT * FROM likesdislikes WHERE user_id = ? AND comment_id = ?', [
        userID,
        commentID,
      ]);
      return result;
    } catch (err) {
      console.error('Like/Dislike kontrolünde hata: ', err.message);
    }
  }

  static async getLikesCount(commentID) {
    try {
      const [result] = await db.execute(
        'SELECT COUNT(*) AS total_comment_likes FROM likesdislikes WHERE comment_id = ? AND isLike = ?',
        [commentID, 1]
      );
      return result[0].total_comment_likes;
    } catch (err) {
      console.error('Yoruma ait toplam beğeni sayısı alınamadı: ', err.message);
    }
  }

  static async getDislikesCount(commentID) {
    try {
      const [result] = await db.execute(
        'SELECT COUNT(*) AS total_comment_dislikes FROM likesdislikes WHERE comment_id = ? AND isLike = ?',
        [commentID, 0]
      );
      return result[0].total_comment_dislikes;
    } catch (err) {
      console.error('Yoruma ait toplam beğenmeme sayısı alınamadı: ', err.message);
    }
  }
}

module.exports = Comment;
