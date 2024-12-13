const path = require('path');
const db = require(path.join(__dirname, '../config/db'));

class Category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  static async addCategory(categoryData) {
    const { name, description } = categoryData;
    try {
      const [result] = await db.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [
        name,
        description,
      ]);
      return result[0];
    } catch (err) {
      console.error('Kategori eklenirken hata meydana geldi, ', err.message);
    }
  }

  static async updateCategory(categoryID, categoryData) {
    try {
      const { name, description } = categoryData;
      const [result] = await db.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [
        name,
        description,
        categoryID,
      ]);
      return result[0];
    } catch (err) {
      console.error('Kitap bilgileri güncellenirken bir hata meydana geldi, ', err.message);
    }
  }

  static async getCategories() {
    try {
      const [rows] = await db.execute('SELECT * FROM categories');
      return rows;
    } catch (err) {}
  }

  static async getCategoriesByID(categoryID) {
    try {
      const [result] = await db.execute('SELECT * FROM categories WHERE id = ?', [categoryID]);
      return result[0];
    } catch (err) {}
  }

  static async getCategoriesCount() {
    try {
      const [result] = await db.execute('SELECT COUNT(*) AS total_categories FROM categories');
      return result[0].total_categories;
    } catch (err) {}
  }

  static async getLastCategory() {
    try {
      const [result] = await db.execute('SELECT * FROM categories ORDER BY created_at DESC LIMIT 1');
      return result[0];
    } catch (err) {
      console.error('Son kategori alınamadı, ', err.message);
    }
  }

  static async deleteCategoryByID(categoryID) {
    try {
      await db.execute('UPDATE books SET category_id = 1 WHERE category_id = ?', [categoryID]);
      const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [categoryID]);
      return result[0];
    } catch (err) {
      console.error('Kategori Silinemedi!, ', err);
    }
  }
}

module.exports = Category;
