const db = require('../config/db');

class Book {
  constructor(name, description, author, categoryID) {
    this.name = name || '';
    this.description = description || '';
    this.author = author || '';
    this.categoryID = categoryID || null;
  }

  static async addBook(bookData, userID) {
    const { name, description, author, categoryID } = bookData;
    try {
      const [result] = await db.execute(
        'INSERT INTO books (name, description, author, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
        [name, description, author, categoryID, userID]
      );
      return result[0];
    } catch (err) {
      console.error('Kitap eklenirken hata meydana geldi, ', err.message);
    }
  }

  static async getBook(bookID) {
    try {
      const [result] = await db.execute(
        'SELECT books.*, categories.name AS category_name, COUNT(favorites.book_id) AS favorites_count FROM books JOIN categories ON books.category_id = categories.id LEFT JOIN favorites ON books.id = favorites.book_id WHERE books.id = ? GROUP BY books.id',
        [bookID]
      );
      return result[0];
    } catch (error) {
      console.error('Kitap bilgisi alınırken hata oluştu, ', err.message);
    }
  }

  static async updateBook(id, bookData) {
    const { name, description, author, categoryID } = bookData;

    try {
      const [result] = await db.execute(
        'UPDATE books SET name = ?, description = ?, author = ?, category_id = ? WHERE id = ?',
        [name, description, author, categoryID, id]
      );
      return result[0];
    } catch (err) {
      console.error('Kitap bilgileri güncellenirken bir hata meydana geldi, ', err.message);
    }
  }

  static async deleteBook(bookID) {
    try {
      const [result] = await db.execute('DELETE FROM books WHERE id = ?', [bookID]);
      return result;
    } catch (err) {
      console.error('Kitap silinirken hata oluştu, ', err.message);
    }
  }

  static async getAllBooks() {
    try {
      const [rows] = await db.execute(
        'SELECT books.*, categories.name AS category_name FROM books JOIN categories ON books.category_id = categories.id ORDER BY added_at DESC'
      );
      return rows;
    } catch (err) {
      console.error('Kitap verileri alınamadı, ', err.message);
    }
  }

  static async getBooksByUserID(userID) {
    try {
      const [rows] = await db.execute(
        'SELECT books.*, categories.name AS category_name FROM books JOIN categories ON books.category_id = categories.id WHERE books.user_id = ? ORDER BY added_at DESC',
        [userID]
      );
      return rows;
    } catch (err) {
      console.error('Kitap verileri alınamadı, ', err.message);
    }
  }

  static async addFavorite(userID, bookID) {
    try {
      const [result] = await db.execute('INSERT INTO favorites (user_id, book_id) VALUES (?, ?)', [userID, bookID]);
      return result[0];
    } catch (err) {
      console.error('Favorilere eklenirken hata meydana geldi, ', err.message);
    }
  }

  static async deleteFavorite(userID, bookID) {
    try {
      const [result] = await db.execute('DELETE FROM favorites WHERE user_id = ? AND book_id = ?', [userID, bookID]);
      return result;
    } catch (err) {
      console.error('Kitap favorilerden silinirken bir hata oluştu, ', err.message);
    }
  }

  static async isFavorite(userID, bookID) {
    try {
      const [rows] = await db.execute('SELECT 1 FROM favorites WHERE user_id = ? AND book_id = ?', [userID, bookID]);
      return rows.length > 0; // Favori varsa true, yoksa false
    } catch (err) {
      console.error('Favori kontrolünde hata: ', err.message);
    }
  }

  static async getFavoritesByUserID(userID) {
    try {
      const [rows] = await db.execute(
        'SELECT books.*, categories.name AS category_name FROM favorites JOIN books ON favorites.book_id = books.id JOIN categories ON books.category_id = categories.id WHERE favorites.user_id = ? ORDER BY favorites.created_at DESC',
        [userID]
      );
      return rows;
    } catch (err) {
      console.error('Favori kitaplar alınamadı, ', err.message);
    }
  }

  static async getFavoritesCountByUserID(userID) {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_favorites FROM favorites WHERE user_id = ?', [
        userID,
      ]);
      return result[0].total_favorites;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async getTotalBookCount() {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_books FROM books');
      return result[0].total_books;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async getTotalBookCountByUserId(userID) {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_books FROM books WHERE user_id = ?', [userID]);
      return result[0].total_books;
    } catch (err) {
      console.error('Toplam kullanıcı sayısı alınamadı, ', err.message);
    }
  }

  static async searchBook(term) {
    try {
      const [results] = await db.execute(
        'SELECT books.*, categories.name AS category_name FROM books JOIN categories ON books.category_id = categories.id WHERE books.name LIKE ? OR books.author LIKE ? OR categories.name LIKE ?',
        [`%${term}%`, `%${term}%`, `%${term}%`]
      );
      return results;
    } catch (err) {
      console.error('Sonuç Bulunamadı, ', err.message);
    }
  }
}

module.exports = Book;
