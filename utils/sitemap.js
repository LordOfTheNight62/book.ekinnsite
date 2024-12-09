const fs = require('fs');
const path = require('path');

const { toUrlString } = require('./urlFormatter');
const Book = require('../models/bookModel');

exports.updateSitemap = async () => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const staticUrls = [
    { loc: 'https://book.ekinn.site/', priority: '1.0' },
    { loc: 'https://book.ekinn.site/books', priority: '1.0' },
    { loc: 'https://book.ekinn.site/login', priority: '1.0' },
    { loc: 'https://book.ekinn.site/register', priority: '1.0' },
    { loc: 'https://book.ekinn.site/books/search', priority: '1.0' },
  ];

  staticUrls.forEach((url) => {
    sitemap += `<url>\n<loc>${url.loc}</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>${
      url.priority
    }</priority>\n</url>\n`;
  });

  const books = await Book.getAllBooks();

  books.forEach((book) => {
    sitemap += `<url>\n<loc>https://book.ekinn.site/books/${toUrlString(book.author)}/${toUrlString(book.name)}-b${
      book.id
    }</loc>\n<lastmod>${new Date().toISOString()}</lastmod>\n<priority>0.8</priority>\n</url>\n`;
  });

  sitemap += '</urlset>';

  const filePath = path.join(__dirname, '../public', 'sitemap.xml');
  fs.writeFile(filePath, sitemap, (err) => {
    if (err) {
      console.error('Sitemap güncellenirken bir hata oluştu:', err);
    } else {
      console.log('Sitemap başarıyla güncellendi.');
    }
  });
};
