// Google Translate Widget'ını Başlatma
function googleTranslateElementInit() {
    try {
        new google.translate.TranslateElement({
            pageLanguage: 'tr',
            includedLanguages: 'ar,de,tr,en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
        
        console.log("Google Translate widget başlatıldı.");
        checkGoogleTranslateLoaded();

    } catch (e) {
        console.error("Google Translate başlatma sırasında hata oluştu: ", e);
    }
}

// Google Translate öğesinin yüklenip yüklenmediğini kontrol et
function checkGoogleTranslateLoaded() {
    let attempts = 0;
    const maxAttempts = 20; // Maksimum 10 saniye (20 x 500ms)

    const interval = setInterval(() => {
        const googleTranslateCombo = document.querySelector('.goog-te-combo');
        if (googleTranslateCombo) {
            console.log("✅ Google Translate öğesi başarıyla yüklendi.");
            clearInterval(interval);
        } else {
            attempts++;
            console.warn("⏳ Google Translate öğesi henüz yüklenmedi. Bekleniyor...");

            if (attempts >= maxAttempts) {
                console.error("❌ Google Translate öğesi yüklenemedi. Lütfen sayfayı yenileyin veya tarayıcı ayarlarını kontrol edin.");
                clearInterval(interval);
            }
        }
    }, 500); // Her 500ms'de bir kontrol et
}

// Sayfa Yüklendiğinde Google Translate'i Başlat
window.onload = () => {
    if (typeof googleTranslateElementInit === 'function') {
        googleTranslateElementInit();
    } else {
        console.error("Google Translate fonksiyonu bulunamadı.");
    }
};

// Sayfa Yüklendiğinde Google Translate Hazır mı Kontrolü
function translatePage(language) {
    const googleTranslateCombo = document.querySelector('.goog-te-combo');
    if (googleTranslateCombo) {
        googleTranslateCombo.value = language;
        googleTranslateCombo.dispatchEvent(new Event('change'));
        console.log(`🌐 Dil değiştirildi: ${language}`);
    } else {
        console.error("Google Translate öğesi henüz yüklenmedi. Lütfen sayfayı tam yükledikten sonra tekrar deneyin.");
    }
}
