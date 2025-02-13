// Slider verilerini localStorage'da saklayacağız
let sliderData = JSON.parse(localStorage.getItem('sliderData')) || [];
let editingSlideId = null; // Düzenlenen slide'ın ID'sini tutacak değişken


// İçerik verilerini localStorage'da saklayacağız
let contentData = JSON.parse(localStorage.getItem('contentData')) || {
    title: 'Siz Hayal Edin &',
    span: 'Biz Üretelim',
    description: 'ETAŞ DESİGN 1992 yılından beri 2000 m2\'lik alanda 20 kişilik profesyonel ekibi ile tasarım, üretim ve proje uygulama alanında hizmet vermektedir. Mimari proje uygulama, özel ölçüye göre mobilya üretimi ve sıfırdan ihtiyaçlarınız doğrultusunda kendi bünyesinde hem tasarım hem üretim hizmeti vermektedir. Koşulsuz müşteri memnuniyeti vizyonu ile bugüne kadar gerçekleştirmiş olduğumuz tüm projelerimiz en büyük motivasyon kaynağımızdır.'
};

// Third section verilerini localStorage'da saklayacağız
let thirdSectionData = JSON.parse(localStorage.getItem('thirdSectionData')) || {
    text: 'Mobilyayı Sanat Eserine Dönüştürüyoruz.',
    backgroundImage: 'images/background/third-bg.jpg'
};

// Referans verilerini localStorage'da saklayacağız
let referencesData = JSON.parse(localStorage.getItem('referencesData')) || [];

// İletişim bilgilerini localStorage'da saklayacağız
let contactData = JSON.parse(localStorage.getItem('contactData')) || {
    address: 'Zafer, Madalyon Sk no:4/B, 34197 Bahçelievler/İstanbul',
    phone1: '0532 447 89 85',
    phone2: '0 212 503 64 59',
    email: 'bilgi@etasdesign.com',
    workingDays: 'Pzt - Cts.',
    workingHours: '09:00 - 19:00'
};

// İstatistik verilerini localStorage'da saklayacağız
let statisticsData = JSON.parse(localStorage.getItem('statisticsData')) || {
    experienceYears: 30,
    satisfaction: 100,
    teamSize: 20,
    completedProjects: 1000,
    icons: {
        experience: 'experience.svg',
        satisfaction: 'satisfaction.svg',
        team: 'team.svg',
        projects: 'projects.svg'
    }
};

// Hakkımızda Bölümü FirstSection verilerini localStorage'da saklayacağız
let infoFirstSectionData = JSON.parse(localStorage.getItem('infoFirstSectionData')) || {
    text: 'HAKKIMIZDA',
    backgroundImage: 'a1.jpg'
};

// Hakkımızda Bölümü SecondSection verilerini localStorage'da saklayacağız
let infoSecondSectionData = JSON.parse(localStorage.getItem('infoSecondSectionData')) || {
    capital: 'ETAŞ DESIGN',
    description: "ETAŞ Design olarak 1992 yılından beri 2000 m²'lik alanda 20 kişilik ekibimizle hem tasarım hem de üretim süreçlerinde rol almaktayız. Alanında profesyonel ustalarımızla birlikte %100 müşteri memnuniyetini hedefleyerek özel tasarım mobilya üretimi yapmaktayız. Mimari projeler, konsept tasarımlar, yaşam alanları, kişiye özel mobilya üretimler, işyerleri vb. mobilyanın yer aldığı her alanda ihtiyaçlara yönelik özel çözümler üretmekteyiz. Tasarım, üretim ve montaj sürecinin tek bir çatı altında gerçekleşmesiyle kaliteyi uygun fiyatlara sunmaktayız."
};

// What We Do verilerini localStorage'da saklayacağız
let whatWeDoData = JSON.parse(localStorage.getItem('whatWeDoData')) || {
    title: 'Neler Yapıyoruz?',
    description: 'Mobilya tasarım ve üretiminde profesyonel çözümler sunuyoruz.',
    services: [
        'Özel Tasarım Mobilya',
        'Mimari Proje Uygulamaları',
        'İç Mekan Tasarımı',
        'Otel Mobilyaları'
    ]
};


// Hizmetler Bölümü FirstSection verilerini localStorage'da saklayacağız
let servicesFirstSectionData = JSON.parse(localStorage.getItem('servicesFirstSectionData')) || {
    text: 'HİZMETLERİMİZ',
    backgroundImage: 'a1.jpg'
};


// Sayfa yüklendiğinde form alanlarını doldur ve önizlemeleri göster
document.addEventListener('DOMContentLoaded', function() {
    // Slider önizlemesini göster
    updateSliderPreview();
    
    // İçerik verilerini forma doldur
    document.getElementById('contentTitle').value = contentData.title;
    document.getElementById('contentSpan').value = contentData.span;
    document.getElementById('contentDescription').value = contentData.description;
    
    // Third section verilerini forma doldur
    document.getElementById('thirdSectionText').value = thirdSectionData.text;
    const imageName = thirdSectionData.backgroundImage.split('/').pop();
    document.getElementById('thirdSectionImage').value = imageName;
    
    // İçerik önizlemelerini göster
    updateContentPreview();
    updateThirdSectionPreview();
    
    // Referanslar önizlemesini göster
    updateReferencesPreview();
    
    // İletişim bilgilerini forma doldur
    document.getElementById('contactAddress').value = contactData.address;
    document.getElementById('contactPhone1').value = contactData.phone1;
    document.getElementById('contactPhone2').value = contactData.phone2;
    document.getElementById('contactEmail').value = contactData.email;
    document.getElementById('workingDays').value = contactData.workingDays;
    document.getElementById('workingHours').value = contactData.workingHours;
    
    // İletişim bilgileri önizlemesini göster
    updateContactPreview();
    
    // İstatistik form alanlarını doldur
    document.getElementById('experienceYears').value = statisticsData.experienceYears;
    document.getElementById('satisfaction').value = statisticsData.satisfaction;
    document.getElementById('teamSize').value = statisticsData.teamSize;
    document.getElementById('completedProjects').value = statisticsData.completedProjects;
    document.getElementById('experienceIcon').value = statisticsData.icons.experience;
    document.getElementById('satisfactionIcon').value = statisticsData.icons.satisfaction;
    document.getElementById('teamIcon').value = statisticsData.icons.team;
    document.getElementById('projectsIcon').value = statisticsData.icons.projects;
    
    // İstatistik önizlemesini göster
    updateStatisticsPreview();


    updateInfoFirstSectionPreview();

    // Hakkımızda FirstSection form alanlarını doldur
    document.getElementById('info-first-section-text').value = infoFirstSectionData.text;
    document.getElementById('info-first-section-image').value = infoFirstSectionData.backgroundImage;
    
    // Hakkımızda FirstSection önizlemesini göster
    updateInfoFirstSectionPreview();

    // Hakkımızda SecondSection form alanlarını doldur
    document.getElementById('info-second-section-capital').value = infoSecondSectionData.capital;
    document.getElementById('info-second-section-description').value = infoSecondSectionData.description;
    
    // Hakkımızda SecondSection önizlemesini göster
    updateInfoSecondSectionPreview();

    // What We Do form alanlarını doldur
    document.getElementById('info-third-section-title').value = whatWeDoData.title;
    document.getElementById('info-third-section-description').value = whatWeDoData.description;
    updateServicesInputs();
    
    // What We Do önizlemesini göster
    updateWhatWeDoPreview();

    // Hizmetler Bölümü FirstSection form alanlarını doldur
    document.getElementById('services-first-section-text').value = servicesFirstSectionData.text;
    document.getElementById('services-first-section-image').value = servicesFirstSectionData.backgroundImage;
    updateServicesFirstSectionPreview();



});

// Form submit olduğunda içeriği güncelle
document.getElementById('contentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    contentData = {
        title: document.getElementById('contentTitle').value,
        span: document.getElementById('contentSpan').value,
        description: document.getElementById('contentDescription').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('contentData', JSON.stringify(contentData));
    
    // İçerik önizlemesini güncelle
    updateContentPreview();
    
    alert('İçerik başarıyla güncellendi!');
});

// İçerik önizlemesini güncelle
function updateContentPreview() {
    const previewContainer = document.getElementById('contentPreview');
    previewContainer.innerHTML = `
        <div class="second-section">
            <div class="second-content">
                <h2>${contentData.title} <span>${contentData.span}</span></h2>
                <p>${contentData.description}</p>
            </div>
        </div>
    `;
}

// Third section form submit
document.getElementById('thirdSectionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    thirdSectionData = {
        text: document.getElementById('thirdSectionText').value,
        backgroundImage: 'images/background/' + document.getElementById('thirdSectionImage').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('thirdSectionData', JSON.stringify(thirdSectionData));
    
    // İçerik önizlemesini güncelle
    updateThirdSectionPreview();
    
    alert('Üçüncü bölüm içeriği başarıyla güncellendi!');
});

// Third section önizlemesini güncelle
function updateThirdSectionPreview() {
    const previewContainer = document.getElementById('thirdSectionPreview');
    previewContainer.innerHTML = `
        <div class="third-section" style="background-image: url('${thirdSectionData.backgroundImage}')">
            <div class="third-content">
                <p>${thirdSectionData.text}</p>
            </div>
        </div>
    `;
}

// Referans form submit
document.getElementById('referenceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const imageName = document.getElementById('referenceImage').value;
    // Resim adından gereksiz yolu temizle
    const cleanImageName = imageName.split('/').pop().split('\\').pop();
    
    const referenceData = {
        id: Date.now(),
        image: 'images/references/' + cleanImageName,
        name: document.getElementById('referenceName').value
    };
    
    // Yeni referans ekle
    referencesData.push(referenceData);
    
    // LocalStorage'ı güncelle
    localStorage.setItem('referencesData', JSON.stringify(referencesData));
    
    // Formu temizle
    this.reset();
    
    // Referanslar önizlemesini güncelle
    updateReferencesPreview();
    
    alert('Referans başarıyla eklendi!');
});

// Referans sil
function deleteReference(id) {
    if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
        referencesData = referencesData.filter(ref => ref.id !== id);
        localStorage.setItem('referencesData', JSON.stringify(referencesData));
        updateReferencesPreview();
    }
}

// Referans sırasını değiştir
function moveReference(index, direction) {
    if (direction === 'up' && index > 0) {
        [referencesData[index], referencesData[index - 1]] = [referencesData[index - 1], referencesData[index]];
    } else if (direction === 'down' && index < referencesData.length - 1) {
        [referencesData[index], referencesData[index + 1]] = [referencesData[index + 1], referencesData[index]];
    }
    
    localStorage.setItem('referencesData', JSON.stringify(referencesData));
    updateReferencesPreview();
}

// Referanslar önizlemesini güncelle
function updateReferencesPreview() {
    const previewContainer = document.getElementById('referencesPreview');
    
    const referencesHTML = `
        <div class="seventh-section">
            <div class="seventh-container">
                ${referencesData.map((ref, index) => `
                    <div class="seventh-item">
                        <img src="${ref.image}" alt="${ref.name}" onerror="this.src='images/placeholder.jpg'; this.onerror=null;">
                        <div class="slide-actions mt-2">
                            <button class="btn btn-danger btn-sm" onclick="deleteReference(${ref.id})">Sil</button>
                            <button class="btn btn-secondary btn-sm" onclick="moveReference(${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                            <button class="btn btn-secondary btn-sm" onclick="moveReference(${index}, 'down')" ${index === referencesData.length - 1 ? 'disabled' : ''}>↓</button>
                        </div>
                        <div class="image-path mt-1 text-muted small">${ref.image}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    previewContainer.innerHTML = referencesHTML;
}

// Form submit olduğunda iletişim bilgilerini güncelle
document.getElementById('contactInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    contactData = {
        address: document.getElementById('contactAddress').value,
        phone1: document.getElementById('contactPhone1').value,
        phone2: document.getElementById('contactPhone2').value,
        email: document.getElementById('contactEmail').value,
        workingDays: document.getElementById('workingDays').value,
        workingHours: document.getElementById('workingHours').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('contactData', JSON.stringify(contactData));
    
    // İletişim bilgileri önizlemesini güncelle
    updateContactPreview();
    
    alert('İletişim bilgileri başarıyla güncellendi!');
});

// İletişim bilgileri önizlemesini güncelle
function updateContactPreview() {
    const previewContainer = document.getElementById('contactPreview');
    previewContainer.innerHTML = `
        <div class="contact-container">
            <div class="contact-info">
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="info-content">
                        <h3>Adres</h3>
                        <p>${contactData.address}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <div class="info-content">
                        <h3>Telefon</h3>
                        <p>${contactData.phone1}</p>
                        ${contactData.phone2 ? `<p>${contactData.phone2}</p>` : ''}
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <div class="info-content">
                        <h3>E-posta</h3>
                        <p>${contactData.email}</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="far fa-clock"></i>
                    <div class="info-content">
                        <h3>Çalışma Saatleri</h3>
                        <p>${contactData.workingDays} / ${contactData.workingHours}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Form submit olduğunda istatistikleri güncelle
document.getElementById('statisticsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    statisticsData = {
        experienceYears: parseInt(document.getElementById('experienceYears').value),
        satisfaction: parseInt(document.getElementById('satisfaction').value),
        teamSize: parseInt(document.getElementById('teamSize').value),
        completedProjects: parseInt(document.getElementById('completedProjects').value),
        icons: {
            experience: document.getElementById('experienceIcon').value,
            satisfaction: document.getElementById('satisfactionIcon').value,
            team: document.getElementById('teamIcon').value,
            projects: document.getElementById('projectsIcon').value
        }
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
    
    // İstatistik önizlemesini güncelle
    updateStatisticsPreview();
    
    alert('İstatistikler başarıyla güncellendi!');
});

// İstatistik önizlemesini güncelle
function updateStatisticsPreview() {
    const previewContainer = document.getElementById('statisticsPreview');
    previewContainer.innerHTML = `
        <div class="sixth-section">
            <div class="sixth-container">
                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/icons/${statisticsData.icons.experience}" alt="Tecrübe İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.experienceYears}+</div>
                    <div class="sixth-text">Yıllık Tecrübe</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/icons/${statisticsData.icons.satisfaction}" alt="Memnuniyet İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.satisfaction}%</div>
                    <div class="sixth-text">Müşteri Memnuniyeti</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/icons/${statisticsData.icons.team}" alt="Ekip İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.teamSize}</div>
                    <div class="sixth-text">Profesyonel Ekip</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/icons/${statisticsData.icons.projects}" alt="Proje İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.completedProjects}</div>
                    <div class="sixth-text">Tamamlanmış Proje</div>
                </div>
            </div>
        </div>
    `;
}

// Hizmet ekleme formu submit
document.getElementById('serviceItemForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newService = document.getElementById('serviceItemText').value;
    
    // Yeni hizmeti listeye ekle
    whatWeDoData.services.push(newService);
    
    // LocalStorage'ı güncelle
    localStorage.setItem('whatWeDoData', JSON.stringify(whatWeDoData));
    
    // Formu temizle
    this.reset();
    
    // İçerik önizlemesini güncelle
    updateWhatWeDoPreview();
    
    alert('Hizmet başarıyla eklendi!');
});

// Hizmet sil
function deleteService(index) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        whatWeDoData.services.splice(index, 1);
        localStorage.setItem('whatWeDoData', JSON.stringify(whatWeDoData));
        updateWhatWeDoPreview();
    }
}

// Hizmet sırasını değiştir
function moveService(index, direction) {
    if (direction === 'up' && index > 0) {
        [whatWeDoData.services[index], whatWeDoData.services[index - 1]] = 
        [whatWeDoData.services[index - 1], whatWeDoData.services[index]];
    } else if (direction === 'down' && index < whatWeDoData.services.length - 1) {
        [whatWeDoData.services[index], whatWeDoData.services[index + 1]] = 
        [whatWeDoData.services[index + 1], whatWeDoData.services[index]];
    }
    
    localStorage.setItem('whatWeDoData', JSON.stringify(whatWeDoData));
    updateWhatWeDoPreview();
}




// Form submit olduğunda yeni slide ekle veya mevcut slide'ı güncelle
document.getElementById('sliderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const slideData = {
        id: editingSlideId || Date.now(),
        title: document.getElementById('slideTitle').value,
        subtitle: document.getElementById('slideSubtitle').value,
        span: document.getElementById('slideSpan').value,
        description: document.getElementById('slideDescription').value,
        firstButton: {
            text: document.getElementById('firstBtnText').value,
            link: document.getElementById('firstBtnLink').value
        },
        secondButton: {
            text: document.getElementById('secondBtnText').value,
            link: document.getElementById('secondBtnLink').value
        },
        image: 'images/slides/' + document.getElementById('slideImage').value
    };

    if (editingSlideId) {
        // Mevcut slide'ı güncelle
        const index = sliderData.findIndex(slide => slide.id === editingSlideId);
        if (index !== -1) {
            sliderData[index] = slideData;
        }
        editingSlideId = null; // Düzenleme modunu kapat
        document.querySelector('button[type="submit"]').textContent = 'Slide Ekle';
    } else {
        // Yeni slide ekle
        sliderData.push(slideData);
    }
    
    // LocalStorage'ı güncelle
    localStorage.setItem('sliderData', JSON.stringify(sliderData));
    
    // Formu temizle
    this.reset();
    
    // Slider önizlemesini güncelle
    updateSliderPreview();
    
    alert(editingSlideId ? 'Slide başarıyla güncellendi!' : 'Slide başarıyla eklendi!');
});
// Slider önizlemesini güncelle
function updateSliderPreview() {
    const previewContainer = document.getElementById('sliderPreview');
    previewContainer.innerHTML = '';
    
    sliderData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide-item';
        slideElement.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${slide.image}" alt="Slide ${index + 1}" class="img-fluid mb-2">
                </div>
                <div class="col-md-8">
                    <h3>${slide.title}</h3>
                    <h4>${slide.subtitle} <span style="color: var(--gold-color)">${slide.span}</span></h4>
                    <p>${slide.description}</p>
                    <div>
                        <strong>Butonlar:</strong>
                        <div>${slide.firstButton.text} - ${slide.firstButton.link}</div>
                        <div>${slide.secondButton.text} - ${slide.secondButton.link}</div>
                    </div>
                </div>
            </div>
            <div class="slide-actions">
                <button class="btn btn-warning btn-sm" onclick="editSlide(${slide.id})">Düzenle</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSlide(${slide.id})">Sil</button>
                <button class="btn btn-secondary btn-sm" onclick="moveSlide(${index}, 'up')" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="btn btn-secondary btn-sm" onclick="moveSlide(${index}, 'down')" ${index === sliderData.length - 1 ? 'disabled' : ''}>↓</button>
            </div>
        `;
        previewContainer.appendChild(slideElement);
    });
}
// Slide'ı sil
function deleteSlide(id) {
    if (confirm('Bu slide\'ı silmek istediğinizden emin misiniz?')) {
        sliderData = sliderData.filter(slide => slide.id !== id);
        localStorage.setItem('sliderData', JSON.stringify(sliderData));
        updateSliderPreview();
        
        // Eğer düzenlenen slide siliniyorsa formu temizle
        if (editingSlideId === id) {
            document.getElementById('sliderForm').reset();
            editingSlideId = null;
            document.querySelector('button[type="submit"]').textContent = 'Slide Ekle';
        }
    }
}
// Slide'ı düzenle
function editSlide(id) {
    const slide = sliderData.find(slide => slide.id === id);
    if (slide) {
        editingSlideId = id; // Düzenleme modunu aç
        
        // Form alanlarını doldur
        document.getElementById('slideTitle').value = slide.title;
        document.getElementById('slideSubtitle').value = slide.subtitle;
        document.getElementById('slideSpan').value = slide.span;
        document.getElementById('slideDescription').value = slide.description;
        document.getElementById('firstBtnText').value = slide.firstButton.text;
        document.getElementById('firstBtnLink').value = slide.firstButton.link;
        document.getElementById('secondBtnText').value = slide.secondButton.text;
        document.getElementById('secondBtnLink').value = slide.secondButton.link;
        
        // Resim yolundan dosya adını çıkar
        const imageName = slide.image.split('/').pop();
        document.getElementById('slideImage').value = imageName;
        
        // Submit butonunun metnini değiştir
        document.querySelector('button[type="submit"]').textContent = 'Değişiklikleri Kaydet';
    }
}
// Slide'ın sırasını değiştir
function moveSlide(index, direction) {
    if (direction === 'up' && index > 0) {
        [sliderData[index], sliderData[index - 1]] = [sliderData[index - 1], sliderData[index]];
    } else if (direction === 'down' && index < sliderData.length - 1) {
        [sliderData[index], sliderData[index + 1]] = [sliderData[index + 1], sliderData[index]];
    }
    
    localStorage.setItem('sliderData', JSON.stringify(sliderData));
    updateSliderPreview();
}


// Hakkımızda Bölümü FirstSection Submit olduğunda
document.getElementById('info-first-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al - parseInt kaldırıldı çünkü string değerler almalıyız
    infoFirstSectionData = {
        text: document.getElementById('info-first-section-text').value,
        backgroundImage: document.getElementById('info-first-section-image').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('infoFirstSectionData', JSON.stringify(infoFirstSectionData));
    
    // Önizlemeyi güncelle
    updateInfoFirstSectionPreview();
    
    alert('Hakkımızda Bölümü FirstSection başarıyla güncellendi!');
});

// Hakkımızda Bölümü FirstSection Önizleme
function updateInfoFirstSectionPreview() {
    const previewContainer = document.getElementById('info-first-section-preview');
    previewContainer.innerHTML = `
        <div class="first-section" style="background-image: url('images/info/first_section/${infoFirstSectionData.backgroundImage}')">
            <div class="first-section-content">
                <h2>${infoFirstSectionData.text}</h2>
                <div class="breadcrumb-container">
                    <a class="breadcrumb-item">Ana Sayfa</a>
                    <span class="breadcrumb-separator">&gt;</span>
                    <span class="breadcrumb-item active">Hakkımızda</span>
                </div>
            </div>
        </div>
    `;
}

// Hakkımızda Bölümü SecondSection Submit olduğunda
document.getElementById('info-second-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    infoSecondSectionData = {
        capital: document.getElementById('info-second-section-capital').value,
        description: document.getElementById('info-second-section-description').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('infoSecondSectionData', JSON.stringify(infoSecondSectionData));
    
    // Önizlemeyi güncelle
    updateInfoSecondSectionPreview();
    
    alert('Hakkımızda Bölümü İkinci Kısım başarıyla güncellendi!');
});

// Hakkımızda Bölümü SecondSection Önizleme
function updateInfoSecondSectionPreview() {
    const previewContainer = document.getElementById('info-second-section-preview');
    previewContainer.innerHTML = `
        <div class="stats-content">
            <h2>${infoSecondSectionData.capital}</h2>
            <p>${infoSecondSectionData.description}</p>
        </div>
    `;
}

// What We Do Submit olduğunda
document.getElementById('info-third-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    whatWeDoData = {
        title: document.getElementById('info-third-section-title').value,
        description: document.getElementById('info-third-section-description').value,
        services: getServicesFromInputs()
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('whatWeDoData', JSON.stringify(whatWeDoData));
    
    // Önizlemeyi güncelle
    updateWhatWeDoPreview();
    
    alert('Neler Yapıyoruz bölümü başarıyla güncellendi!');
});

// Hizmet input alanlarını güncelle
function updateServicesInputs() {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    whatWeDoData.services.forEach((service, index) => {
        container.appendChild(createServiceInput(service, index));
    });
}

// Yeni hizmet input alanı oluştur
function createServiceInput(value = '', index) {
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `
        <input type="text" class="form-control service-input" value="${value}" required>
        <button type="button" class="btn btn-danger" onclick="removeService(${index})">
            <i class="fas fa-trash"></i>
        </button>
        <button type="button" class="btn btn-secondary" onclick="moveService(${index}, 'up')" ${index === 0 ? 'disabled' : ''}>
            <i class="fas fa-arrow-up"></i>
        </button>
        <button type="button" class="btn btn-secondary" onclick="moveService(${index}, 'down')" ${index === whatWeDoData.services.length - 1 ? 'disabled' : ''}>
            <i class="fas fa-arrow-down"></i>
        </button>
    `;
    return div;
}

// Yeni hizmet ekle butonu
document.getElementById('add-service-btn').addEventListener('click', function() {
    whatWeDoData.services.push('');
    updateServicesInputs();
});

// Hizmet sil
function removeService(index) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        whatWeDoData.services.splice(index, 1);
        updateServicesInputs();
    }
}

// Hizmet sırasını değiştir
function moveService(index, direction) {
    if (direction === 'up' && index > 0) {
        [whatWeDoData.services[index], whatWeDoData.services[index - 1]] = 
        [whatWeDoData.services[index - 1], whatWeDoData.services[index]];
    } else if (direction === 'down' && index < whatWeDoData.services.length - 1) {
        [whatWeDoData.services[index], whatWeDoData.services[index + 1]] = 
        [whatWeDoData.services[index + 1], whatWeDoData.services[index]];
    }
    updateServicesInputs();
}

// Input alanlarından hizmetleri al
function getServicesFromInputs() {
    return Array.from(document.getElementsByClassName('service-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
}

// What We Do Önizleme
function updateWhatWeDoPreview() {
    const previewContainer = document.getElementById('info-third-section-preview');
    previewContainer.innerHTML = `
        <div class="what-we-do-preview">
            <div class="what-we-do-content">
                <span class="what-we-do-subtitle">NELER YAPIYORUZ</span>
                <h2>${whatWeDoData.title}</h2>
                <p>${whatWeDoData.description}</p>
                <div class="what-we-do-services-list">
                    <ul>
                        ${whatWeDoData.services.map(service => `
                            <li><i class="fas fa-check"></i> ${service}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}



























// Hakkımızda Bölümü FirstSection Submit olduğunda
document.getElementById('services-first-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al - parseInt kaldırıldı çünkü string değerler almalıyız
    servicesFirstSectionData = {
        text: document.getElementById('services-first-section-text').value,
        backgroundImage: document.getElementById('services-first-section-image').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('servicesFirstSectionData', JSON.stringify(servicesFirstSectionData));
    
    // Önizlemeyi güncelle
    updateServicesFirstSectionPreview();
    
    alert('Hizmetler Bölümü FirstSection başarıyla güncellendi!');
});

// Hizmetler Bölümü FirstSection Önizleme
function updateServicesFirstSectionPreview() {
    const previewContainer = document.getElementById('services-first-section-preview');
    previewContainer.innerHTML = `
        <div class="first-section" style="background-image: url('images/services/first_section/${servicesFirstSectionData.backgroundImage}')">
            <div class="first-section-content">
                <h2>${servicesFirstSectionData.text}</h2>
                <div class="breadcrumb-container">
                    <a class="breadcrumb-item">Ana Sayfa</a>
                    <span class="breadcrumb-separator">&gt;</span>
                    <span class="breadcrumb-item active">Hizmetlerimiz</span>
                </div>
            </div>
        </div>
    `;
}