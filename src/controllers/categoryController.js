const path = require('path');
const Category = require(path.join(__dirname, '../models/categoryModel'));

exports.addNewCategory = async (req, res) => {
  const { categoryName, categoryDescription } = req.body;
  if (!categoryName) {
    return res.json({ message: 'Lütfen gerekli alanları boş bırakmayınız!', alert: true });
  }
  try {
    const category = new Category(categoryName, categoryDescription);
    await Category.addCategory(category);
    const categories = await Category.getCategories();
    const lastCategory = await Category.getLastCategory();
    const statistics = {
      totalCategories: await Category.getCategoriesCount(),
    };
    res.json({ message: 'Kategori başarıyla eklendi', categories, category: lastCategory, statistics });
  } catch (err) {}
};

exports.updateCategoryByID = async (req, res) => {
  const { categoryNewName, categoryNewDescription, categoryID } = req.body;
  if (!categoryNewName || !categoryID) {
    return res.json({ message: 'Lütfen gerekli alanları boş bırakmayınız!', alert: true });
  }
  try {
    const category = new Category(categoryNewName, categoryNewDescription);
    await Category.updateCategory(categoryID, category);
    const categories = await Category.getCategories();
    const updatedCategory = await Category.getCategoriesByID(categoryID);
    res.json({ message: 'Kategori başarıyla güncellendi', categories, updatedCategory });
  } catch (err) {}
};

exports.deleteCategoryByID = async (req, res) => {
  try {
    const { categoryID } = req.body;
    await Category.deleteCategoryByID(categoryID);
    const categories = await Category.getCategories();
    const statistics = {
      totalCategories: await Category.getCategoriesCount(),
    };
    res.json({ message: 'Yorumunuz başarıyla silindi', categories, deletedCategoryID: categoryID, statistics });
  } catch (err) {}
};
