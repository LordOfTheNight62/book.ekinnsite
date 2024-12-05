const Category = require('../models/categoryModel');

exports.addNewCategory = async (req, res) => {
  const { categoryName, categoryDescription } = req.body;
  if (!categoryName || !categoryName) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return res.status(302).redirect(fullUrl + '?message=error');
  }
  try {
    const category = new Category(categoryName, categoryDescription);
    console.log(category);
    await Category.addCategory(category);
    const lastCategory = await Category.getLastCategory();
    const statistics = {
      totalCategories: await Category.getCategoriesCount(),
    };
    res.json({ message: 'Kategori başarıyla eklendi', category: lastCategory, statistics });
  } catch (err) {}
};

exports.deleteCategoryByID = async (req, res) => {
  try {
    const { categoryID } = req.body;
    await Category.deleteCategoryByID(categoryID);
    const statistics = {
      totalCategories: await Category.getCategoriesCount(),
    };
    res.json({ message: 'Yorumunuz başarıyla silindi', deletedCategoryID: categoryID, statistics });
  } catch (err) {}
};
