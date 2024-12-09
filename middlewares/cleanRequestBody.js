const sanitizeHtml = require('sanitize-html');

// Req.body temizleyen middleware
function cleanRequestBody(req, res, next) {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      // Eğer değer bir string türündeyse, HTML etiketlerini temizle
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'], // İzin verilen etiketler
          allowedAttributes: {
            a: ['href', 'title'], // İzin verilen a etiket öznitelikleri
          },
          // Kötü amaçlı scriptler ve event handler'ları engelle
          disallowedTagsMode: 'recursiveEscape', // Kapanmayan etiketleri engeller
          disallowedAttributes: ['style', 'onerror', 'onclick'], // Kötü amaçlı öznitelikleri engeller
        });

        // String veriyi trimle (başındaki ve sonundaki boşlukları temizle)
        req.body[key] = req.body[key].trim();
      }
    }
  }
  next();
}

module.exports = cleanRequestBody;
