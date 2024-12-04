exports.toUrlString = (text) => {
  return text
    .normalize('NFD') // Akcentli karakterlerden kurtulmak için
    .replace(/[\u0300-\u036f]/g, '') // Akcentli karakterleri temizle
    .toLowerCase() // Küçük harfe çevir
    .replace(/ı/g, 'i') // Türkçe 'ı' harfini 'i'ye dönüştür
    .replace(/ı/g, 'i') // Eğer küçük 'ı' yerine büyük 'İ' de dönüştürmek istersen, burada da büyük harfi dönüştür
    .replace(/[^a-z0-9\s-]/g, '') // Sadece harf, rakam ve boşluk bırak
    .trim() // Başlangıç ve bitişteki boşlukları kaldır
    .replace(/\s+/g, '-') // Birden fazla boşluğu - ile değiştir
    .replace(/-+/g, '-'); // Çoklu - işaretlerini tek bir tane yap
};
