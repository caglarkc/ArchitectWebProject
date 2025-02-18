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


    // Hizmetler Bölümü SecondSection form alanlarını doldur
    document.getElementById('services-second-section-capital').value = servicesSecondSectionData.capital;
    document.getElementById('services-second-section-description').value = servicesSecondSectionData.description;
    updateServicesSecondSectionPreview();


    // İletişim Bölümü FirstSection form alanlarını doldur
    document.getElementById('contacts-first-section-text').value = contactsFirstSectionData.text;
    document.getElementById('contacts-first-section-image').value = contactsFirstSectionData.backgroundImage;
    updateContactsFirstSectionPreview();

    // Hakkımızda SecondSection form alanlarını doldur
    updateMainServicesPreview();

    populateMainPageServiceSelect();

    updateMainPageServices();

    // Custom services select'i doldur
    populateCustomServicesSelect();

    // Steps verilerini forma doldur
    document.getElementById('stepSelect').addEventListener('change', function() {
        const selectedStep = stepsData.steps[this.value - 1];
        document.getElementById('stepTitle').value = selectedStep.title;
        document.getElementById('stepDescription').value = selectedStep.description;
        document.getElementById('stepImage').value = selectedStep.image;
    });

    // İlk adımın verilerini yükle
    document.getElementById('stepSelect').dispatchEvent(new Event('change'));

    // Steps önizlemesini göster
    updateStepsPreview();

    // Custom services images select'i doldur
    populateCustomServicesImagesSelect();
    
    // Select değiştiğinde önizlemeyi güncelle
    document.getElementById('custom-services-images-section-select').addEventListener('change', function() {
        const selectedService = this.options[this.selectedIndex].text;
        updateCustomServicesImagesPreview(selectedService);
    });
});


/* *************************** Ana Sayfa ****************************** */

/* ********************** Ana Sayfa - Slider ********************** */
// Ana Sayfa - Slider
let sliderData = JSON.parse(localStorage.getItem('sliderData')) || [];
let editingSlideId = null; // Düzenlenen slide'ın ID'sini tutacak değişken
// Ana Sayfa - Slider
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
        image: 'images/' + document.getElementById('slideImage').value
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
// Ana Sayfa - Slider
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
// Ana Sayfa - Slider
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
// Ana Sayfa - Slider
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
// Ana Sayfa - Slider
function moveSlide(index, direction) {
    if (direction === 'up' && index > 0) {
        [sliderData[index], sliderData[index - 1]] = [sliderData[index - 1], sliderData[index]];
    } else if (direction === 'down' && index < sliderData.length - 1) {
        [sliderData[index], sliderData[index + 1]] = [sliderData[index + 1], sliderData[index]];
    }
    
    localStorage.setItem('sliderData', JSON.stringify(sliderData));
    updateSliderPreview();
}

// Ana Sayfa - İkinci Bölüm
let contentData = JSON.parse(localStorage.getItem('contentData')) || {
    title: 'Siz Hayal Edin &',
    span: 'Biz Üretelim',
    description: 'ETAŞ DESİGN 1992 yılından beri 2000 m2\'lik alanda 20 kişilik profesyonel ekibi ile tasarım, üretim ve proje uygulama alanında hizmet vermektedir. Mimari proje uygulama, özel ölçüye göre mobilya üretimi ve sıfırdan ihtiyaçlarınız doğrultusunda kendi bünyesinde hem tasarım hem üretim hizmeti vermektedir. Koşulsuz müşteri memnuniyeti vizyonu ile bugüne kadar gerçekleştirmiş olduğumuz tüm projelerimiz en büyük motivasyon kaynağımızdır.'
};
// Ana Sayfa - İkinci Bölüm
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
// Ana Sayfa - İkinci Bölüm
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

/* ********************** Ana Sayfa - Üçüncü Bölüm ********************** */
// Ana Sayfa - Üçüncü Bölüm
let thirdSectionData = JSON.parse(localStorage.getItem('thirdSectionData')) || {
    text: 'Mobilyayı Sanat Eserine Dönüştürüyoruz.',
    backgroundImage: 'images/a1.jpg'
};
// Ana Sayfa - Üçüncü Bölüm
document.getElementById('thirdSectionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al
    thirdSectionData = {
        text: document.getElementById('thirdSectionText').value,
        backgroundImage: 'images/' + document.getElementById('thirdSectionImage').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('thirdSectionData', JSON.stringify(thirdSectionData));
    
    // İçerik önizlemesini güncelle
    updateThirdSectionPreview();
    
    alert('Üçüncü bölüm içeriği başarıyla güncellendi!');
});
// Ana Sayfa - Üçüncü Bölüm
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


/* ********************** Ana Sayfa - Referanslar ********************** */
// Ana Sayfa - Referanslar
let referencesData = JSON.parse(localStorage.getItem('referencesData')) || [];
// Ana Sayfa - Referanslar
document.getElementById('referenceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const imageName = document.getElementById('referenceImage').value;
    // Resim adından gereksiz yolu temizle
    const cleanImageName = imageName.split('/').pop().split('\\').pop();
    
    const referenceData = {
        id: Date.now(),
        image: 'images/' + cleanImageName,
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
// Ana Sayfa - Referanslar
function deleteReference(id) {
    if (confirm('Bu referansı silmek istediğinizden emin misiniz?')) {
        referencesData = referencesData.filter(ref => ref.id !== id);
        localStorage.setItem('referencesData', JSON.stringify(referencesData));
        updateReferencesPreview();
    }
}
// Ana Sayfa - Referanslar
function moveReference(index, direction) {
    if (direction === 'up' && index > 0) {
        [referencesData[index], referencesData[index - 1]] = [referencesData[index - 1], referencesData[index]];
    } else if (direction === 'down' && index < referencesData.length - 1) {
        [referencesData[index], referencesData[index + 1]] = [referencesData[index + 1], referencesData[index]];
    }
    
    localStorage.setItem('referencesData', JSON.stringify(referencesData));
    updateReferencesPreview();
}
// Ana Sayfa - Referanslar
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



/* ********************** Hakkımızda ********************** */






// Hakkımızda - İlk Bölüm
let infoFirstSectionData = JSON.parse(localStorage.getItem('infoFirstSectionData')) || {
    text: 'HAKKIMIZDA',
    backgroundImage: 'a1.jpg'
};
// Hakkımızda - İlk Bölüm
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
// Hakkımızda - İlk Bölüm
function updateInfoFirstSectionPreview() {
    const previewContainer = document.getElementById('info-first-section-preview');
    previewContainer.innerHTML = `
        <div class="first-section" style="background-image: url('images/${infoFirstSectionData.backgroundImage}')">
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

// Hakkımızda - İkinci Bölüm
let infoSecondSectionData = JSON.parse(localStorage.getItem('infoSecondSectionData')) || {
    capital: 'ETAŞ DESIGN',
    description: "ETAŞ Design olarak 1992 yılından beri 2000 m²'lik alanda 20 kişilik ekibimizle hem tasarım hem de üretim süreçlerinde rol almaktayız. Alanında profesyonel ustalarımızla birlikte %100 müşteri memnuniyetini hedefleyerek özel tasarım mobilya üretimi yapmaktayız. Mimari projeler, konsept tasarımlar, yaşam alanları, kişiye özel mobilya üretimler, işyerleri vb. mobilyanın yer aldığı her alanda ihtiyaçlara yönelik özel çözümler üretmekteyiz. Tasarım, üretim ve montaj sürecinin tek bir çatı altında gerçekleşmesiyle kaliteyi uygun fiyatlara sunmaktayız."
};
// Hakkımızda - İkinci Bölüm
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
// Hakkımızda - İkinci Bölüm
function updateInfoSecondSectionPreview() {
    const previewContainer = document.getElementById('info-second-section-preview');
    previewContainer.innerHTML = `
        <div class="stats-content">
            <h2>${infoSecondSectionData.capital}</h2>
            <p>${infoSecondSectionData.description}</p>
        </div>
    `;
}

/// Hakkımızda - Üçüncü Bölüm
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
// Hakkımızda - Üçüncü Bölüm
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
// Hakkımızda - Üçüncü Bölüm
function updateServicesInputs() {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    whatWeDoData.services.forEach((service, index) => {
        container.appendChild(createServiceInput(service, index));
    });
}
// Hakkımızda - Üçüncü Bölüm
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
// Hakkımızda - Üçüncü Bölüm
document.getElementById('add-service-btn').addEventListener('click', function() {
    whatWeDoData.services.push('');
    updateServicesInputs();
});
// Hakkımızda - Üçüncü Bölüm
function removeService(index) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        whatWeDoData.services.splice(index, 1);
        updateServicesInputs();
    }
}
// Hakkımızda - Üçüncü Bölüm
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
// Hakkımızda - Üçüncü Bölüm
function getServicesFromInputs() {
    return Array.from(document.getElementsByClassName('service-input'))
        .map(input => input.value.trim())
        .filter(value => value !== '');
}
// Hakkımızda - Üçüncü Bölüm
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












/* ********************** Hizmetler ********************** */
// Hizmetler Bölümü FirstSection verilerini localStorage'da saklayacağız
let servicesFirstSectionData = JSON.parse(localStorage.getItem('servicesFirstSectionData')) || {
    text: 'HİZMETLERİMİZ',
    backgroundImage: 'a1.jpg'
};
// Hizmetler - İlk Bölüm
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
// Hizmetler - İlk Bölüm
function updateServicesFirstSectionPreview() {
    const previewContainer = document.getElementById('services-first-section-preview');
    previewContainer.innerHTML = `
        <div class="first-section" style="background-image: url('images/${servicesFirstSectionData.backgroundImage}')">
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

let servicesSecondSectionData = JSON.parse(localStorage.getItem('servicesSecondSectionData')) || {
    capital: 'NELER YAPIYORUZ?',
    description: 'Ali Mobilyanın var olduğu her alanda özel ölçüye göre tasarımlar üretmekteyiz.<br>Mimari tasarımlarda ve konsept projelerde uygulamacı olarak çalışıyoruz.'
};
// Hizmetler - İkinci Bölüm
document.getElementById('services-second-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al - parseInt kaldırıldı çünkü string değerler almalıyız
    servicesSecondSectionData = {
        capital: document.getElementById('services-second-section-capital').value,
        description: document.getElementById('services-second-section-description').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('servicesSecondSectionData', JSON.stringify(servicesSecondSectionData));
    
    // Önizlemeyi güncelle
    updateServicesSecondSectionPreview();
    
    alert('Hizmetler Bölümü SecondSection başarıyla güncellendi!');
});
// Hizmetler - İkinci Bölüm
function updateServicesSecondSectionPreview() {
    const previewContainer = document.getElementById('services-second-section-preview');
    previewContainer.innerHTML = `
        <div class="stats-content">
            <h2>${servicesSecondSectionData.capital}</h2>
            <p>${servicesSecondSectionData.description}</p>
        </div>
    `;
}


// Hizmetler - Ana Hizmetler
let mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
// Hizmetler - Ana Hizmetler
document.getElementById('main-services-add-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('main-services-add-section-name').value;

    const services = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    if (services.some(service => service.name === name)) {
        alert('Bu hizmet zaten mevcut!');
        return;
    }
    // Yeni hizmet verilerini al
    const newService = {
        id: Date.now(),
        name: document.getElementById('main-services-add-section-name').value,
        mainTitle: document.getElementById('main-services-add-section-main-title').value,
        subTitle: document.getElementById('main-services-add-section-sub-title').value,
        description: document.getElementById('main-services-add-section-description').value,
        image: document.getElementById('main-services-add-section-image').value,
        order: mainServicesData.length
    };
    
    mainServicesData.push(newService);
    localStorage.setItem('mainServicesData', JSON.stringify(mainServicesData));
    e.target.reset();
    updateMainServicesPreview();
    
    alert('Hizmet başarıyla eklendi!');
});
// Hizmetler - Ana Hizmetler
function updateMainServicesPreview() {
    const previewContainer = document.getElementById('main-services-preview');
    previewContainer.innerHTML = mainServicesData.map((service, index) => `
        <div class="main-service-preview-item" data-id="${service.id}">
            <div class="main-service-preview-controls">
                <button class="btn btn-sm btn-warning" onclick="editMainService(${service.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteMainService(${service.id})">
                    <i class="fas fa-trash"></i>
                </button>
                ${index > 0 ? `
                    <button class="btn btn-sm btn-info" onclick="moveMainService(${service.id}, 'up')">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                ` : ''}
                ${index < mainServicesData.length - 1 ? `
                    <button class="btn btn-sm btn-info" onclick="moveMainService(${service.id}, 'down')">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                ` : ''}
            </div>
            <div class="main-service-preview-content">
                <h3 class="main-service-name">${service.name}</h3>
                <div class="main-service-image-container">
                    <img src="images/${service.image}" alt="${service.name}">
                    <div class="main-service-overlay">
                        <h4 class="main-service-main-title">${service.mainTitle}</h4>
                        <h5 class="main-service-sub-title">${service.subTitle}</h5>
                        <p class="main-service-description">${service.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
// Hizmetler - Ana Hizmetler
function deleteMainService(id) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        mainServicesData = mainServicesData.filter(service => service.id !== id);
        localStorage.setItem('mainServicesData', JSON.stringify(mainServicesData));
        updateMainServicesPreview();
    }
}
// Hizmetler - Ana Hizmetler
function moveMainService(id, direction) {
    const index = mainServicesData.findIndex(service => service.id === id);
    if (direction === 'up' && index > 0) {
        [mainServicesData[index], mainServicesData[index - 1]] = [mainServicesData[index - 1], mainServicesData[index]];
    } else if (direction === 'down' && index < mainServicesData.length - 1) {
        [mainServicesData[index], mainServicesData[index + 1]] = [mainServicesData[index + 1], mainServicesData[index]];
    }
    localStorage.setItem('mainServicesData', JSON.stringify(mainServicesData));
    updateMainServicesPreview();
}
// Hizmetler - Ana Hizmetler
function editMainService(id) {
    const service = mainServicesData.find(service => service.id === id);
    if (service) {
        // Form alanlarını doldur
        document.getElementById('main-services-add-section-name').value = service.name;
        document.getElementById('main-services-add-section-main-title').value = service.mainTitle;
        document.getElementById('main-services-add-section-sub-title').value = service.subTitle;
        document.getElementById('main-services-add-section-description').value = service.description;
        document.getElementById('main-services-add-section-image').value = service.image;
        
        // Submit butonunun metnini değiştir
        document.querySelector('button[type="submit"]').textContent = 'Değişiklikleri Kaydet';
    }
}


// Hizmetler - Ana Sayfa Hizmetleri
function populateMainPageServiceSelect() {
    const mainPageServiceSelect = document.getElementById('mainPageServiceSelect');
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    
    // Mevcut seçenekleri temizle
    mainPageServiceSelect.innerHTML = '<option value="">Hizmet Seçin</option>';
    
    // Her hizmet için bir seçenek ekle
    mainServicesData.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = service.name;
        mainPageServiceSelect.appendChild(option);
    });
}
// Hizmetler - Ana Sayfa Hizmetleri
document.getElementById('main-services-main-page-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mainPageServiceSelect = document.getElementById('mainPageServiceSelect');
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];

    if (!mainPageServiceSelect.value) {
        alert('Lütfen bir hizmet seçin!');
        return;
    }

    const selectedServiceIndex = mainPageServiceSelect.value;
    const selectedService = mainServicesData[selectedServiceIndex];

    const description = document.getElementById('main-services-main-page-section-description').value;
    const image = document.getElementById('main-services-main-page-section-image').value;

    const newService = {
        name: selectedService.name,
        description: description,
        image: image,
        index: selectedServiceIndex
    };

    // Mevcut servisleri al
    let mainPageServicesData = JSON.parse(localStorage.getItem('mainPageServicesData')) || [];
    
    // Seçilen hizmetin index'ini kontrol et
    const existingServiceIndex = mainPageServicesData.findIndex(service => service.index === selectedServiceIndex);
    
    if (existingServiceIndex !== -1) {
        // Hizmet zaten varsa, güncelle
        mainPageServicesData[existingServiceIndex] = newService;
        alert('Hizmet görünümü başarıyla güncellendi!');
    } else {
        // Hizmet yoksa, yeni ekle
        mainPageServicesData.push(newService);
        alert('Hizmet görünümü başarıyla eklendi!');
    }
    
    // LocalStorage'a kaydet
    localStorage.setItem('mainPageServicesData', JSON.stringify(mainPageServicesData));
    updateMainPageServices();
    
    // Formu temizle
    this.reset();
});
// Hizmetler - Ana Sayfa Hizmetleri
function updateMainPageServices() {
    const mainPageServicePreview = document.getElementById('main-services-main-page-section-preview');
    const mainPageServicesData = JSON.parse(localStorage.getItem('mainPageServicesData')) || [];

    if (mainPageServicesData.length === 0) {
        mainPageServicePreview.innerHTML = '<p class="text-muted">Henüz bir hizmet eklenmedi.</p>';
        return;
    }

    // Tüm hizmetleri göster
    const cardsHTML = mainPageServicesData.map(service => {
        return `
            <div class="main-page-service-preview">
                <div class="card-image">
                    <img src="images/${service.image}" alt="${service.name}">
                    <div class="plus-icon"></div>
                    <div class="card-content">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <a href="#" class="fourth-btn">Daha Fazlası</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    mainPageServicePreview.innerHTML = cardsHTML;
}
// Hizmetler - Ana Sayfa Hizmetleri
document.getElementById('mainPageServiceSelect').addEventListener('change', function() {
    const mainPageServicesData = JSON.parse(localStorage.getItem('mainPageServicesData')) || [];
    
    // Seçilen hizmetin daha önce eklenip eklenmediğini kontrol et
    const existingService = mainPageServicesData.find(service => service.index === this.value);
    
    if (existingService) {
        document.getElementById('main-services-main-page-section-description').value = existingService.description;
        document.getElementById('main-services-main-page-section-image').value = existingService.image;
    } else {
        document.getElementById('main-services-main-page-section-description').value = '';
        document.getElementById('main-services-main-page-section-image').value = '';
    }
});


// Hizmetler - Özel Hizmetler Extra Section Ekleme
document.getElementById('custom-services-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const customServicesSelect = document.getElementById('custom-services-section-select');
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData'));

    if (!customServicesSelect.value) {
        alert('Lütfen bir hizmet seçin!');
        return;
    }

    const selectedServiceIndex = parseInt(customServicesSelect.value);
    const selectedService = mainServicesData[selectedServiceIndex];

    // Mevcut custom sections'ları al
    let customServicesData = JSON.parse(localStorage.getItem('customServicesData')) || {};
    
    // Seçili hizmet için sections array'ini oluştur (yoksa)
    if (!customServicesData[selectedService.name]) {
        customServicesData[selectedService.name] = [];
    }

    const newSection = {
        id: Date.now(),
        description: document.getElementById('custom-services-section-description').value,
        image: document.getElementById('custom-services-section-image').value,
        order: customServicesData[selectedService.name].length
    };

    customServicesData[selectedService.name].push(newSection);
    
    // LocalStorage'a kaydet
    localStorage.setItem('customServicesData', JSON.stringify(customServicesData));
    updateCustomServicesPreview(selectedService.name);
    
    // Formu temizle
    this.reset();
    alert('Section başarıyla eklendi!');
});
// Hizmetler - Özel Hizmetler Extra Section Ekleme
function updateCustomServicesPreview(serviceName) {
    const previewContainer = document.getElementById('custom-services-section-preview');
    const customServicesData = JSON.parse(localStorage.getItem('customServicesData')) || {};
    
    if (!serviceName || !customServicesData[serviceName]) {
        previewContainer.innerHTML = '<p class="text-muted">Lütfen bir hizmet seçin veya section ekleyin.</p>';
        return;
    }

    const sections = customServicesData[serviceName];
    
    // Sections'ları order'a göre sırala
    sections.sort((a, b) => a.order - b.order);

    const sectionsHTML = sections.map((section, index) => `
        <div class="custom-service-section-preview" data-id="${section.id}">
            <div class="section-preview-controls">
                <button class="btn btn-sm btn-warning" onclick="editCustomSection('${serviceName}', ${section.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteCustomSection('${serviceName}', ${section.id})">
                    <i class="fas fa-trash"></i>
                </button>
                ${index > 0 ? `
                    <button class="btn btn-sm btn-info" onclick="moveCustomSection('${serviceName}', ${section.id}, 'up')">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                ` : ''}
                ${index < sections.length - 1 ? `
                    <button class="btn btn-sm btn-info" onclick="moveCustomSection('${serviceName}', ${section.id}, 'down')">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                ` : ''}
            </div>
            <div class="section-preview-content">
                <img src="images/${section.image}" alt="${serviceName} section ${index + 1}">
                <p>${section.description}</p>
            </div>
        </div>
    `).join('');

    previewContainer.innerHTML = sectionsHTML;
}
// Hizmetler - Özel Hizmetler Extra Section Ekleme
document.getElementById('custom-services-section-select').addEventListener('change', function() {
    const selectedService = this.options[this.selectedIndex].text;
    updateCustomServicesPreview(selectedService);
});
// Hizmetler - Özel Hizmetler Extra Section Ekleme
function editCustomSection(serviceName, sectionId) {
    const customServicesData = JSON.parse(localStorage.getItem('customServicesData'));
    const section = customServicesData[serviceName].find(s => s.id === sectionId);
    
    if (section) {
        document.getElementById('custom-services-section-description').value = section.description;
        document.getElementById('custom-services-section-image').value = section.image;
        
        // Form submit event'ini güncelleme moduna al
        const form = document.getElementById('custom-services-section-form');
        form.dataset.editMode = 'true';
        form.dataset.editServiceName = serviceName;
        form.dataset.editSectionId = sectionId;
        
        // Submit butonunu güncelle
        form.querySelector('button[type="submit"]').textContent = 'Değişiklikleri Kaydet';
    }
}
// Hizmetler - Özel Hizmetler Extra Section Ekleme
function deleteCustomSection(serviceName, sectionId) {
    if (confirm('Bu section\'ı silmek istediğinizden emin misiniz?')) {
        const customServicesData = JSON.parse(localStorage.getItem('customServicesData'));
        customServicesData[serviceName] = customServicesData[serviceName].filter(s => s.id !== sectionId);
        
        // Order'ları güncelle
        customServicesData[serviceName].forEach((section, index) => {
            section.order = index;
        });
        
        localStorage.setItem('customServicesData', JSON.stringify(customServicesData));
        updateCustomServicesPreview(serviceName);
    }
}
// Hizmetler - Özel Hizmetler Extra Section Ekleme
function moveCustomSection(serviceName, sectionId, direction) {
    const customServicesData = JSON.parse(localStorage.getItem('customServicesData'));
    const sections = customServicesData[serviceName];
    const currentIndex = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && currentIndex > 0) {
        [sections[currentIndex].order, sections[currentIndex - 1].order] = 
        [sections[currentIndex - 1].order, sections[currentIndex].order];
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
        [sections[currentIndex].order, sections[currentIndex + 1].order] = 
        [sections[currentIndex + 1].order, sections[currentIndex].order];
    }
    
    localStorage.setItem('customServicesData', JSON.stringify(customServicesData));
    updateCustomServicesPreview(serviceName);
}


// Hizmetler - Özel Hizmet Resimleri
let customServicesImagesData = JSON.parse(localStorage.getItem('customServicesImagesData')) || {};
// Hizmetler - Özel Hizmet Resimleri
function populateCustomServicesSelect() {
    const customServicesSelect = document.getElementById('custom-services-section-select');
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    
    // Mevcut seçenekleri temizle
    customServicesSelect.innerHTML = '<option value="">Hizmet Seçin</option>';
    
    // Her hizmet için bir seçenek ekle
    mainServicesData.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = service.name;
        customServicesSelect.appendChild(option);
    });
}
// Hizmetler - Özel Hizmet Resimleri
function populateCustomServicesImagesSelect() {
    const customServicesImagesSelect = document.getElementById('custom-services-images-section-select');
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    
    // Mevcut seçenekleri temizle
    customServicesImagesSelect.innerHTML = '';
    
    // Her hizmet için bir seçenek ekle
    mainServicesData.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = service.name;
        customServicesImagesSelect.appendChild(option);
    });

    updateCustomServicesImagesPreview(mainServicesData[0].name);
}
// Hizmetler - Özel Hizmet Resimleri
document.getElementById('custom-services-images-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const select = document.getElementById('custom-services-images-section-select');
    const serviceName = select.options[select.selectedIndex].text;
    
    if (!serviceName || serviceName == 'Hizmet Seçin') {
        alert('Lütfen bir hizmet seçin!');
        return;
    }

    // Yeni resim verisi
    const newImage = {
        id: Date.now(),
        image: document.getElementById('custom-services-images-section-image').value
    };

    // Seçili hizmet için images array'ini oluştur (yoksa)
    if (!customServicesImagesData[serviceName]) {
        customServicesImagesData[serviceName] = [];
    }

    // Yeni resmi ekle
    customServicesImagesData[serviceName].push(newImage);
    
    // LocalStorage'ı güncelle
    localStorage.setItem('customServicesImagesData', JSON.stringify(customServicesImagesData));
    
    // Önizlemeyi güncelle
    updateCustomServicesImagesPreview(serviceName);
    
    // Formu temizle
    this.reset();
    alert('Resim başarıyla eklendi!');
});
// Hizmetler - Özel Hizmet Resimleri
function deleteCustomServiceImage(serviceName, imageId) {
    if (confirm('Bu resmi silmek istediğinizden emin misiniz?')) {
        customServicesImagesData[serviceName] = customServicesImagesData[serviceName].filter(img => img.id !== imageId);
        localStorage.setItem('customServicesImagesData', JSON.stringify(customServicesImagesData));
        updateCustomServicesImagesPreview(serviceName);
    }
}
// Hizmetler - Özel Hizmet Resimleri
function updateCustomServicesImagesPreview(serviceName) {
    const previewContainer = document.getElementById('custom-services-images-section-preview');
    
    if (!serviceName || !customServicesImagesData[serviceName]) {
        previewContainer.innerHTML = '<p class="text-muted">Lütfen bir hizmet seçin veya resim ekleyin.</p>';
        return;
    }

    const images = customServicesImagesData[serviceName];

    previewContainer.innerHTML = `
        <div class="fifth-header">
            <h6>ÖRNEK RESİMLER</h6>
            <h2>${serviceName}</h2>
        </div>
        <div class="fifth-grid">
            ${images.map(img => `
                <div class="fifth-item">
                    <img src="images/${img.image}" alt="${serviceName}">
                    <div class="image-controls">
                        <button class="btn btn-sm btn-danger" onclick="deleteCustomServiceImage('${serviceName}', ${img.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}





/* ********************** İletişim ********************** */
// İletişim Bölümü FirstSection verilerini localStorage'da saklayacağız
let contactsFirstSectionData = JSON.parse(localStorage.getItem('contactsFirstSectionData')) || {
    text: 'İLETİŞİM',
    backgroundImage: 'a1.jpg'
};
// İletişim Bölümü - First Section
document.getElementById('contacts-first-section-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form verilerini al - parseInt kaldırıldı çünkü string değerler almalıyız
    contactsFirstSectionData = {
        text: document.getElementById('contacts-first-section-text').value,
        backgroundImage: document.getElementById('contacts-first-section-image').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('contactsFirstSectionData', JSON.stringify(contactsFirstSectionData));
    
    // Önizlemeyi güncelle
    updateContactsFirstSectionPreview();
    
    alert('İletişim Bölümü FirstSection başarıyla güncellendi!');
});
// İletişim Bölümü - First Section
function updateContactsFirstSectionPreview() {
    const previewContainer = document.getElementById('contacts-first-section-preview');
    previewContainer.innerHTML = `
        <div class="first-section" style="background-image: url('images/${contactsFirstSectionData.backgroundImage}')">
            <div class="first-section-content">
                <h2>${contactsFirstSectionData.text}</h2>
                <div class="breadcrumb-container">
                    <a class="breadcrumb-item">Ana Sayfa</a>
                    <span class="breadcrumb-separator">&gt;</span>
                    <span class="breadcrumb-item active">İletişim</span>
                </div>
            </div>
        </div>
    `;
}





/* ********************** Ortak Bileşenler ********************** */

// ortak bileşenler - istatistikler
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
// ortak bileşenler - istatistikler
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
// ortak bileşenler - istatistikler
function updateStatisticsPreview() {
    const previewContainer = document.getElementById('statisticsPreview');
    previewContainer.innerHTML = `
        <div class="sixth-section">
            <div class="sixth-container">
                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/${statisticsData.icons.experience}" alt="Tecrübe İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.experienceYears}+</div>
                    <div class="sixth-text">Yıllık Tecrübe</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/${statisticsData.icons.satisfaction}" alt="Memnuniyet İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.satisfaction}%</div>
                    <div class="sixth-text">Müşteri Memnuniyeti</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/${statisticsData.icons.team}" alt="Ekip İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.teamSize}</div>
                    <div class="sixth-text">Profesyonel Ekip</div>
                </div>

                <div class="sixth-item">
                    <div class="sixth-icon">
                        <img src="images/${statisticsData.icons.projects}" alt="Proje İkonu">
                    </div>
                    <div class="sixth-number">${statisticsData.completedProjects}</div>
                    <div class="sixth-text">Tamamlanmış Proje</div>
                </div>
            </div>
        </div>
    `;
}

// ortak bileşenler - iletişim bilgileri
let contactData = JSON.parse(localStorage.getItem('contactData')) || {
    address: 'Zafer, Madalyon Sk no:4/B, 34197 Bahçelievler/İstanbul',
    phone1: '0532 447 89 85',
    phone2: '0 212 503 64 59',
    email: 'bilgi@etasdesign.com',
    workingDays: 'Pzt - Cts.',
    workingHours: '09:00 - 19:00'
};
// ortak bileşenler - iletişim bilgileri
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
// ortak bileşenler - iletişim bilgileri
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

// Steps verilerini tutan değişken
let stepsData = JSON.parse(localStorage.getItem('stepsData')) || {
    steps: [
        {
            number: "01",
            title: "Tasarım",
            description: "Hayalinizdeki tasarımı bize anlatın\nya da ölçüleri bizimle paylaşın.\nSizin için üretelim.",
            image: "deneme (1).jpg"
        },
        {
            number: "02",
            title: "Üretim",
            description: "2000 m²'lik üretim merkezimizde\nsıfır hata payı ile\nmobilyalarınızı üretiyoruz.",
            image: "deneme (2).jpg"
        },
        {
            number: "03",
            title: "Proje Uygulama",
            description: "Söz verilen tarihte mobilyalarınızın\nuygulamasını ve montajını\ngerçekleştiriyoruz.",
            image: "deneme (3).jpg"
        }
    ]
};
// ortak bileşenler - service steps
document.getElementById('stepsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const stepIndex = document.getElementById('stepSelect').value - 1;
    
    // Form verilerini al
    stepsData.steps[stepIndex] = {
        number: String(stepIndex + 1).padStart(2, '0'),
        title: document.getElementById('stepTitle').value,
        description: document.getElementById('stepDescription').value,
        image: document.getElementById('stepImage').value
    };
    
    // LocalStorage'ı güncelle
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
    
    // Önizlemeyi güncelle
    updateStepsPreview();
    
    alert('Adım başarıyla güncellendi!');
});
// ortak bileşenler - service steps
function updateStepsPreview() {
    const previewContainer = document.getElementById('stepsPreview');
    
    previewContainer.innerHTML = `
        <div class="service-steps">
            ${stepsData.steps.map(step => `
                <div class="step-item">
                    <div class="step-circle">
                        <span class="step-number">${step.number}</span>
                        <img src="images/${step.image}" 
                             alt="${step.title}" 
                             class="step-image"
                             style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8); transition: box-shadow 0.3s ease;">
                             
                    </div>
                    <h3 class="step-title">${step.title}</h3>
                    <p class="step-description">${step.description}</p>
                </div>
            `).join('')}
        </div>
    `;

            
}



/*
// what we do
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

// what we do
function deleteService(index) {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
        whatWeDoData.services.splice(index, 1);
        localStorage.setItem('whatWeDoData', JSON.stringify(whatWeDoData));
        updateWhatWeDoPreview();
    }
}

// what we do
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

*/