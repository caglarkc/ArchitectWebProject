// Özel hizmet sayfasını ve sectionları başlat
function initializeCustomServicePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service');
        
    if (!serviceName) {
        console.error('Hizmet adı bulunamadı');
        return;
    }

    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    
    const service = mainServicesData.find(s => {
        const urlFriendlyName = s.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[ğ]/g, 'g')
            .replace(/[ü]/g, 'u')
            .replace(/[ş]/g, 's')
            .replace(/[ı]/g, 'i')
            .replace(/[ö]/g, 'o')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '');
        return urlFriendlyName === serviceName;
    });

    if (!service) {
        console.error('Hizmet bulunamadı');
        return;
    }

    // Custom sectionları yükle
    loadCustomSections(service.name);
    
    // Başlığı güncelle
    document.getElementById('sample-images-title').textContent = service.name.substring(0,1).toUpperCase() + service.name.substring(2);
    
    // Örnek resimleri yükle
    loadServiceImages(service.name);
}

// Custom sectionları yükle
function loadCustomSections(serviceName) {
    const customServicesData = JSON.parse(localStorage.getItem('customServicesData')) || {};
    const sections = customServicesData[serviceName] || [];

    // Sectionları sırala
    sections.sort((a, b) => a.order - b.order);

    const customSectionsContainer = document.getElementById('special-sections-container');

    if (customSectionsContainer) {
        if (sections.length === 0) {
            return;
        }

        const sectionsHTML = sections.map((section, index) => {
            const imageUrl = `images/${section.image}`;
            if (index % 2 == 0 ) {
                return `
                <div class="special-service-section , special-primary">
                    <div class="special-service-content"
                        style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${imageUrl}')">                    
                    </div>
                    <div class="special-service-description">
                        <p>${section.description}</p>
                    </div>
                </div>
            `;
            }else {
                return `
                <div class="special-service-section , special-secondary">                     
                    <div class="special-service-content"
                    style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${imageUrl}')">
                    </div>
                    <div class="special-service-description">
                            <p>${"ASLÖMDKFSLFÖSLŞDAFKFMKLMÖFCFMKSLDMDSÖVŞMMFSKLDFMLKSDMFMSDŞFM \NSKDFLŞSAKFŞASDSFVLSKMADŞSLCVFSDKNLMSKDLSAJFLDJSKAŞFKSAKDFŞLDSAKFŞKSDAFKŞSAKDŞFKSAŞDLFLDSAKFŞSLDKFŞKŞA"}</p>
                    </div>
                </div>
            `;
            }
            
            
            
        }).join('');

        customSectionsContainer.innerHTML = sectionsHTML;

        // Animasyon için sectionları gözlemle
        observeSections();
    }
}

// Örnek resimleri yükle
function loadServiceImages(serviceName) {
    const customServicesImagesData = JSON.parse(localStorage.getItem('customServicesImagesData')) || {};
    const serviceImages = customServicesImagesData[serviceName] || [];
    
    const gridContainer = document.getElementById('sample-images-grid');
    
    if (serviceImages.length === 0) {
        gridContainer.innerHTML = '<p class="text-center">Bu hizmet için henüz örnek resim eklenmemiş.</p>';
        return;
    }

    gridContainer.innerHTML = serviceImages.map(img => `
        <div class="fifth-item">
            <img src="images/${img.image}" alt="${serviceName}">
            <div class="fifth-overlay">
                <div class="fifth-plus">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `).join('');

    // Resimlere tıklama olayı ekle
    gridContainer.querySelectorAll('.fifth-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            window.open(img.src, '_blank');
        });
    });
}

// Section animasyonları için Intersection Observer
function observeSections() {
    const sections = document.querySelectorAll('.special-service-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Steps verilerini yükle ve göster
function loadSteps() {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    const stepsContainer = document.getElementById('service-steps-container');

    console.log(stepsData);
    
    if (!stepsData.steps || stepsData.steps.length === 0) {
        console.error('Steps verisi bulunamadı');
        return;
    }

    const stepsHTML = `
        <div class="service-steps">
            ${stepsData.steps.map(step => `
                <div class="step-item">
                    <div class="step-circle" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/${step.image}')">
                        <span class="step-number">${step.number}</span>
                    </div>
                    <h3 class="step-title">${step.title}</h3>
                    <p class="step-description">${step.description}</p>
                </div>
            `).join('')}
        </div>
    `;

    stepsContainer.innerHTML = stepsHTML;
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomServicePage();
    loadSteps(); // Steps'leri yükle
});

let customServicesImagesData = JSON.parse(localStorage.getItem('customServicesImagesData')) || {};

let stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};


