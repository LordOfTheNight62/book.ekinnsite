const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST, // MySQL sunucusunun adresi
  user: process.env.MYSQL_USER, // Veritabanı kullanıcı adı
  password: process.env.MYSQL_PASSWORD, // Veritabanı şifresi
  database: process.env.MYSQL_DATABASE, // Kullanılacak veritabanı adı
  port: process.env.MYSQL_PORT, // Kullanılacak veritabanı portu
  connectionLimit: 10, // Bağlantı havuzundaki maksimum bağlantı sayısı
  waitForConnections: true, // Bağlantı talebi olduğunda beklemeye izin verir
  queueLimit: 0, // Sıra limiti, sıfır sonsuz beklemeye izin verir
});

module.exports = pool.promise();
