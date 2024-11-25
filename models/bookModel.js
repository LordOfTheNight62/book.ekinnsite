const db = require('../config/db');

class Book {
  constructor(name, description, author, categoryID, price) {
    this.name = name || '';
    this.description = description || '';
    this.author = author || '';
    this.categoryID = categoryID || null;
    this.price = price || 0.0;
  }

  static async addBook(bookData) {
    console.log(bookData);
    const { name, description, author, categoryID, price } = bookData;
    try {
      const [result] = await db.execute(
        'INSERT INTO books (name, description, author, category_id, price) VALUES (?, ?, ?, ?, ?)',
        [name, description, author, categoryID, price]
      );
      return result[0];
    } catch (err) {
      console.error('Kitap eklenirken hata meydana geldi, ', err.message);
    }
  }

  static async getBook(bookID) {
    try {
      const [result] = await db.execute('SELECT * FROM books WHERE id = ?', [bookID]);
      return result[0];
    } catch (error) {
      console.error('Kitap bilgisi alınırken hata oluştu, ', err.message);
    }
  }

  async updateBook(id, bookData) {
    const { name, description, author, categoryID, price } = bookData;

    try {
      const [result] = await db.execute(
        'UPDATE books SET name = ?, description = ?, author = ?, category_id = ?, price = ? WHERE id = ?',
        [name, description, author, categoryID, price, id]
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
      const [rows] = await db.execute('SELECT * FROM books');
      return rows;
    } catch (err) {
      console.error('Kitap verileri alınamadı, ', err.message);
    }
  }

  static async searchBook(term) {
    try {
      const [results] = await db.execute('SELECT * FROM books WHERE name LIKE ? OR author LIKE ?', [
        `%${term}%`,
        `%${term}%`,
      ]);
      return results;
    } catch (err) {
      console.error('Sonuç Bulunamadı, ', err.message);
    }
  }
}

module.exports = Book;
