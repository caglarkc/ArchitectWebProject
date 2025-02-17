// Header'ı yükle
$(document).ready(function() {
    $("#header-container").load("header.html", function() {
        // Header yüklendikten sonra aktif sayfayı belirle
        setActiveMenuItem();

        // Header yüklendikten sonra dropdown menüyü doldur
        populateServicesDropdown();

        // Header yüklendikten sonra dropdown menü işlevselliğini ekle
        $('.dropdown-toggle').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');
        });

        // Mobil menü toggle
        $('.navbar-toggler').on('click', function() {
            $('.navbar-collapse').toggleClass('show');
        });
    });

    // Footer'ı yükle ve yüklendikten sonra iletişim bilgilerini güncelle
    $("#footer-container").load("footer.html", function() {
        // Footer yüklendikten sonra iletişim bilgilerini güncelle
        loadContactInfo();
    });

    // Ana sayfa içeriğini yükle
    if (window.location.pathname.endsWith('mainPage.html') || window.location.pathname.endsWith('/')) {
        loadMainContent();
        displayLatestBlogs();
        // Slider fonksiyonalitesi
        initializeSlider();
    }

    // İstatistikleri başlat
    initializeStats();

    

    // Özel hizmet sayfasını başlat
    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    
    if (currentPath.includes('custom_service.html') && searchParams.includes('?service=')) {
        initializeCustomService();
    }
});

// Aktif menü öğesini belirle
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'mainPage.html';
    $('.nav-list a').removeClass('active');
    $(`.nav-list a[href="${currentPage}"]`).addClass('active');
}

document.addEventListener('DOMContentLoaded', function() {

    // İletişim bilgilerini yükle
    loadContactInfo();

    initializeFirstSection();
    initializeSecondSection();
    initializeWhatWeDo();
    initializeServicesFirstSection();
    initializeServicesSecondSection();
    initializeContactsFirstSection();
    populateServicesDropdown();
    initializeFourthSection();

});

// İstatistik Sayaçları
function initializeStats() {
    // İstatistik verilerini localStorage'dan al
    const statisticsData = JSON.parse(localStorage.getItem('statisticsData')) || {
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

    // Ana sayfadaki ikonları güncelle (sixth-section)
    const sixthIcons = document.querySelectorAll('.sixth-icon img');
    if (sixthIcons.length === 4) {
        sixthIcons[0].src = `images/icons/${statisticsData.icons.experience}`;
        sixthIcons[1].src = `images/icons/${statisticsData.icons.satisfaction}`;
        sixthIcons[2].src = `images/icons/${statisticsData.icons.team}`;
        sixthIcons[3].src = `images/icons/${statisticsData.icons.projects}`;
    }

    // Hakkımızda sayfasındaki ikonları güncelle (stats-section)
    const statsIcons = document.querySelectorAll('.stat-icon');
    if (statsIcons.length === 4) {
        statsIcons[0].innerHTML = `<img src="images/icons/${statisticsData.icons.experience}" alt="Tecrübe İkonu">`;
        statsIcons[1].innerHTML = `<img src="images/icons/${statisticsData.icons.satisfaction}" alt="Memnuniyet İkonu">`;
        statsIcons[2].innerHTML = `<img src="images/icons/${statisticsData.icons.team}" alt="Ekip İkonu">`;
        statsIcons[3].innerHTML = `<img src="images/icons/${statisticsData.icons.projects}" alt="Proje İkonu">`;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(statisticsData);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Her iki sayfadaki stats bölümlerini gözlemle
    const statsSection = document.querySelector('.stats-section');
    const sixthSection = document.querySelector('.sixth-section');

    if (statsSection) observer.observe(statsSection);
    if (sixthSection) observer.observe(sixthSection);
}

function animateNumbers(statisticsData) {
    const stats = document.querySelectorAll('.sixth-number');
    
    stats.forEach((stat, index) => {
        let target;
        let suffix = '';

        // İlgili istatistik değerini belirle
        switch(index) {
            case 0: // Yıllık Tecrübe
                target = statisticsData.experienceYears;
                suffix = '+';
                break;
            case 1: // Müşteri Memnuniyeti
                target = statisticsData.satisfaction;
                suffix = '%';
                break;
            case 2: // Profesyonel Ekip
                target = statisticsData.teamSize;
                break;
            case 3: // Tamamlanmış Proje
                target = statisticsData.completedProjects;
                break;
        }

        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, interval);
    });
}

// Son iki blogu ana sayfada göster
function displayLatestBlogs() {
    // Blog verilerini tarihe göre sırala
    const sortedBlogs = [...blogPosts].sort((a, b) => {
        return new Date(convertTurkishDate(b.date)) - new Date(convertTurkishDate(a.date));
    });

    // İlk iki blogu al
    const latestTwo = sortedBlogs.slice(0, 2);

    const latestBlogsContainer = document.getElementById('latest-blogs');
    if (!latestBlogsContainer) return;

    const blogsHTML = `
        <div class="blog-grid">
            <!-- İlk blog - Resim solda -->
            <div class="blog-item">
                <div class="blog-image-container">
                    <div class="blog-date">${latestTwo[0].date}</div>
                    <img src="${latestTwo[0].image}" alt="${latestTwo[0].title}" class="latest-blog-image">
                </div>
                <div class="latest-blog-content">
                    <h2 class="latest-blog-title">${latestTwo[0].title}</h2>
                    <p class="latest-blog-excerpt">${latestTwo[0].excerpt}</p>
                    <div class="latest-blog-meta">
                        <span class="author"><i class="far fa-user"></i> ${latestTwo[0].author}</span>
                        <span class="category">${latestTwo[0].category}</span>
                        <a href="#" class="read-more">Devamını Oku</a>
                    </div>
                </div>
            </div>

            <!-- İkinci blog - Resim sağda -->
            <div class="blog-item image-right">
                <div class="blog-image-container">
                    <div class="blog-date">${latestTwo[1].date}</div>
                    <img src="${latestTwo[1].image}" alt="${latestTwo[1].title}" class="latest-blog-image">
                </div>
                <div class="latest-blog-content">
                    <h2 class="latest-blog-title">${latestTwo[1].title}</h2>
                    <p class="latest-blog-excerpt">${latestTwo[1].excerpt}</p>
                    <div class="latest-blog-meta">
                        <span class="author"><i class="far fa-user"></i> ${latestTwo[1].author}</span>
                        <span class="category">${latestTwo[1].category}</span>
                        <a href="#" class="read-more">Devamını Oku</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    latestBlogsContainer.innerHTML = blogsHTML;
}

// Türkçe tarihi JavaScript Date objesine çevir
function convertTurkishDate(turkishDate) {
    const months = {
        'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
        'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
        'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
    };
    
    const [day, month, year] = turkishDate.split(' ');
    return `${year}-${months[month]}-${day.padStart(2, '0')}`;
}

// Video oynatma fonksiyonu
function playVideo(videoId) {
    const videoContainer = document.querySelector('.what-we-do-video-container');
    videoContainer.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        </iframe>
    `;
}

// Slider fonksiyonları
function initializeSlider() {
    const section = document.querySelector('.first-section');
    const slider = document.querySelector('.slider');
    
    // LocalStorage'dan slider verilerini al
    const sliderData = JSON.parse(localStorage.getItem('sliderData')) || [];
    
    if (sliderData.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    // Slider içeriğini oluştur
    slider.innerHTML = sliderData.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}')">
            <div class="first-content">
                <h1>${slide.title}</h1>
                <h2>${slide.subtitle} <span>${slide.span}</span></h2>
                <p>${slide.description}</p>
                <div class="first-buttons">
                    <a href="${slide.firstButton.link}" class="first-btn first-btn-primary">${slide.firstButton.text}</a>
                    <a href="${slide.secondButton.link}" class="first-btn first-btn-secondary">${slide.secondButton.text}</a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Dots'ları güncelle
    const dotsContainer = document.querySelector('.slider-dots');
    dotsContainer.innerHTML = sliderData.map((_, index) => `
        <button class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
    `).join('');
    
    // Slider değişkenlerini güncelle
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentSlide = 0;
    let isTransitioning = false;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    // İlk slide'ı aktif yap ve butonları ayarla
    updateSlider();

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Slider'ı kaydır
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        slider.style.transition = 'transform 0.5s ease-out';

        // Aktif slide'ı güncelle
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Dots'ları güncelle
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // İlk ve son slide'larda butonları gizle/göster
        prevButton.style.opacity = currentSlide === 0 ? '0' : '1';
        prevButton.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
        nextButton.style.opacity = currentSlide === slides.length - 1 ? '0' : '1';
        nextButton.style.visibility = currentSlide === slides.length - 1 ? 'hidden' : 'visible';

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Mouse Events
    function dragStart(e) {
        if (e.target.closest('.slider-button') || e.target.closest('.slider-dot')) {
            return;
        }

        if (isTransitioning) return;
        isDragging = true;
        startPos = e.type === 'mousedown' ? e.pageX : e.touches[0].clientX;
        slider.style.transition = 'none';
        section.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = e.type === 'mousemove' ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPos;
        const move = (diff / slider.offsetWidth) * 100;
        currentTranslate = prevTranslate + move;
        
        if (currentTranslate > 0) {
            currentTranslate = 0;
        } else if (currentTranslate < -((slides.length - 1) * 100)) {
            currentTranslate = -((slides.length - 1) * 100);
        }
        
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const movePercent = currentTranslate - prevTranslate;
        
        if (Math.abs(movePercent) > 20) {
            if (movePercent > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            updateSlider();
        }
        
        section.style.cursor = 'grab';
        prevTranslate = -(currentSlide * 100);
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Mouse events
    section.addEventListener('mousedown', dragStart);
    section.addEventListener('mousemove', drag);
    section.addEventListener('mouseup', dragEnd);
    section.addEventListener('mouseleave', dragEnd);

    // Touch events
    section.addEventListener('touchstart', dragStart);
    section.addEventListener('touchmove', drag);
    section.addEventListener('touchend', dragEnd);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning || currentSlide === index) return;
            currentSlide = index;
            updateSlider();
        });
    });

    // Başlangıç durumu için cursor stilini ayarla
    section.style.cursor = 'grab';
}

// Proje kategorilerini ve resimleri yükle
function loadProjects() {
    const fifthButtons = document.querySelectorAll('.fifth-btn');
    const fifthGrid = document.querySelector('.fifth-grid');
    
    // Örnek proje verileri
    const projects = [
        // Mimari Projeler
        { image: 'images/projects/mimari_projeler/proje1.jpg', category: 'mimari' },
        { image: 'images/projects/mimari_projeler/proje2.jpg', category: 'mimari' },
        { image: 'images/projects/mimari_projeler/proje3.jpg', category: 'mimari' },
        
        // Ticari Projeler
        { image: 'images/projects/ticari_projeler/proje1.jpg', category: 'ticari' },
        { image: 'images/projects/ticari_projeler/proje2.jpg', category: 'ticari' },
        
        // Yaşam Alanı Projeleri
        { image: 'images/projects/yasam_alani/proje1.jpg', category: 'yasam' },
        { image: 'images/projects/yasam_alani/proje2.jpg', category: 'yasam' }
    ];
    
    if (!projects || projects.length === 0) {
        fifthGrid.innerHTML = '<p class="no-projects">Henüz proje bulunmamaktadır.</p>';
        return;
    }
    
    fifthGrid.innerHTML = '';
    
    // Projeleri göster
    const renderProjects = (projectsToShow) => {
        fifthGrid.innerHTML = ''; // Her render öncesi grid'i temizle
        projectsToShow.forEach((project, index) => {
            const element = createProjectElement(project, index);
            fifthGrid.appendChild(element);
            
            // Her projeyi sırayla göster
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    // Filtreleme işlemi
    const filterProjects = (category) => {
        const filteredProjects = category === 'all' ? 
            projects : 
            projects.filter(project => project.category === category);
        
        // Mevcut projeleri gizle
        const currentItems = Array.from(fifthGrid.children);
        currentItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });

        // Kısa bir gecikme sonra yeni projeleri göster
        setTimeout(() => {
            renderProjects(filteredProjects);
        }, 300);
    };

    // Event listeners
    if (fifthButtons) {
        fifthButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.classList.contains('active')) return;
                
                fifthButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                filterProjects(this.dataset.filter);
            });
        });
    }

    // İlk yüklemede tüm projeleri göster
    renderProjects(projects);
}

// Proje elementi oluştur
function createProjectElement(project, index) {
    const element = document.createElement('div');
    element.className = 'fifth-item';
    element.dataset.category = project.category;
    element.innerHTML = `<img src="${project.image}" alt="Proje Görseli" onerror="this.parentElement.style.display='none'">`;
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    return element;
}

// Ana sayfa içeriğini yükle
function loadMainContent() {
    // İkinci bölüm içeriği
    const contentData = JSON.parse(localStorage.getItem('contentData')) || {
        title: 'Siz Hayal Edin &',
        span: 'Biz Üretelim',
        description: 'ETAŞ DESİGN 1992 yılından beri 2000 m2\'lik alanda 20 kişilik profesyonel ekibi ile tasarım, üretim ve proje uygulama alanında hizmet vermektedir. Mimari proje uygulama, özel ölçüye göre mobilya üretimi ve sıfırdan ihtiyaçlarınız doğrultusunda kendi bünyesinde hem tasarım hem üretim hizmeti vermektedir. Koşulsuz müşteri memnuniyeti vizyonu ile bugüne kadar gerçekleştirmiş olduğumuz tüm projelerimiz en büyük motivasyon kaynağımızdır.'
    };

    // Üçüncü bölüm içeriği
    const thirdSectionData = JSON.parse(localStorage.getItem('thirdSectionData')) || {
        text: 'Mobilyayı Sanat Eserine Dönüştürüyoruz.',
        backgroundImage: 'images/background/third-bg.jpg'
    };

    // Referanslar
    const referencesData = JSON.parse(localStorage.getItem('referencesData')) || [];

    // İkinci bölümü güncelle
    const secondContent = document.querySelector('.second-content');
    if (secondContent) {
        secondContent.innerHTML = `
            <h2>${contentData.title} <span>${contentData.span}</span></h2>
            <p>${contentData.description}</p>
        `;
    }

    // Üçüncü bölümü güncelle
    const thirdContent = document.querySelector('.third-content');
    if (thirdContent) {
        thirdContent.innerHTML = `<p>${thirdSectionData.text}</p>`;
        const thirdSection = document.querySelector('.third-section');
        if (thirdSection) {
            thirdSection.style.backgroundImage = `url('${thirdSectionData.backgroundImage}')`;
        }
    }

    // Referansları güncelle
    const seventhContainer = document.querySelector('.seventh-container');
    if (seventhContainer) {
        seventhContainer.innerHTML = referencesData.map(ref => `
            <div class="seventh-item">
                <img src="${ref.image}" alt="${ref.name}">
            </div>
        `).join('');
    }

    // Projeleri yükle
    loadProjects();
}

// İletişim bilgilerini yükle
function loadContactInfo() {
    const contactData = JSON.parse(localStorage.getItem('contactData')) || {
        address: 'Zafer, Madalyon Sk no:4/B, 34197 Bahçelievler/İstanbul',
        phone1: '0532 447 89 85',
        phone2: '0 212 503 64 59',
        email: 'bilgi@etasdesign.com',
        workingDays: 'Pzt - Cts.',
        workingHours: '09:00 - 19:00'
    };

    // Header telefon numarasını güncelle
    const headerPhone = document.querySelector('.header-right .phone-number');
    if (headerPhone) {
        headerPhone.innerHTML = `<i class="fas fa-phone"></i> ${contactData.phone1}`;
        headerPhone.href = `tel:${contactData.phone1}`;
    }

    // Top header iletişim bilgilerini güncelle
    const topHeaderEmail = document.querySelector('.contact-group a[href^="mailto"]');
    const topHeaderPhone = document.querySelector('.contact-group a[href^="tel"]');
    const topHeaderWorkingHours = document.querySelector('.contact-group .top-contact-item:last-child');

    if (topHeaderEmail) {
        topHeaderEmail.innerHTML = `<i class="far fa-envelope"></i>${contactData.email}`;
        topHeaderEmail.href = `mailto:${contactData.email}`;
    }

    if (topHeaderPhone) {
        topHeaderPhone.innerHTML = `<i class="fas fa-phone"></i>${contactData.phone1}`;
        topHeaderPhone.href = `tel:${contactData.phone1}`;
    }

    if (topHeaderWorkingHours) {
        topHeaderWorkingHours.innerHTML = `<i class="far fa-clock"></i>${contactData.workingDays} / ${contactData.workingHours}`;
    }

    // Footer iletişim bilgilerini güncelle
    const footerContactInfo = document.querySelector('.footer .contact-info');
    if (footerContactInfo) {
        footerContactInfo.innerHTML = `
            <p><i class="fas fa-map-marker-alt"></i> ${contactData.address}</p>
            <p><i class="fas fa-phone"></i> ${contactData.phone2}</p>
            <p><i class="fas fa-envelope"></i> ${contactData.email}</p>
        `;
    }

    // Ana sayfadaki iletişim bölümü bilgilerini güncelle
    const contactInfo = document.querySelector('.contact-section .contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
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
        `;
    }
}

function convertToFolderName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// Hakkımızda sayfası birinci bölüm yönetimi
function initializeFirstSection() {
    const firstSection = document.getElementById('info-first-section');
    const firstSectionTitle = document.getElementById('firstSectionTitle');
    
    if (firstSection && firstSectionTitle) {
        const firstSectionData = JSON.parse(localStorage.getItem('infoFirstSectionData')) || {
            text: 'HAKKIMIZDA',
            backgroundImage: 'a1.jpg'
        };

        // Başlığı güncelle
        firstSectionTitle.textContent = firstSectionData.text;

        // Arkaplan resmini güncelle
        firstSection.style.backgroundImage = `url('images/info/first_section/${firstSectionData.backgroundImage}')`;
        
        // Overlay ekle
        firstSection.style.position = 'relative';
        firstSection.style.backgroundSize = 'cover';
        firstSection.style.backgroundPosition = 'center';
    }
}

// Hakkımızda sayfası ikinci bölüm yönetimi
function initializeSecondSection() {
    const secondSectionTitle = document.getElementById('info-second-section-title');
    const secondSectionContent = document.getElementById('info-second-section-content');

    if (secondSectionTitle && secondSectionTitle) {
        const secondSectionData = JSON.parse(localStorage.getItem('infoSecondSectionData')) || {
            capital: 'ETAŞ DESIGN',
            description: 'ETAŞ DESIGN, 1992 yılından beri 2000 m2\'lik alanda 20 kişilik profesyonel ekibi ile tasarım, üretim ve proje uygulama alanında hizmet vermektedir.<br>Mimari proje uygulama, özel ölçüye göre mobilya üretimi ve sıfırdan ihtiyaçlarınız doğrultusunda kendi bünyesinde hem tasarım hem üretim hizmeti vermektedir.<br>Koşulsuz müşteri memnuniyeti vizyonu ile bugüne kadar gerçekleştirmiş olduğumuz tüm projelerimiz en büyük motivasyon kaynağımızdır.'
        };

        // Başlığı güncelle
        secondSectionTitle.textContent = secondSectionData.capital;

        secondSectionContent.textContent = secondSectionData.description;
        
    }

}
        
        



// Neler Yapıyoruz bölümünü başlat
function initializeWhatWeDo() { 
    const whatWeDoData = JSON.parse(localStorage.getItem('whatWeDoData'));

    // Başlık güncelle
    const title = document.querySelector('.what-we-do-title');
    if (title) {
        title.textContent = whatWeDoData.title;
    }

    // Açıklama güncelle
    const description = document.querySelector('.what-we-do-description');
    if (description) {
        description.textContent = whatWeDoData.description;
    }

    // Hizmet listesini güncelle
    const servicesList = document.querySelector('.what-we-do-services-list ul');
    if (servicesList) {
        servicesList.innerHTML = whatWeDoData.services.map(service => `
            <li><i class="fas fa-check"></i> ${service}</li>
        `).join('');
    }
}

// Hizmetler sayfası birinci bölüm yönetimi
function initializeServicesFirstSection() {
    const firstSection = document.getElementById('services-first-section');
    const firstSectionTitle = document.getElementById('services-first-section-title');

    if (firstSection && firstSectionTitle) {
        const firstSectionData = JSON.parse(localStorage.getItem('servicesFirstSectionData')) || {
            text: 'HİZMETLERİMİZ',
            backgroundImage: 'a1.jpg'
        };

        // Başlığı güncelle
        firstSectionTitle.textContent = firstSectionData.text;

        // Arkaplan resmini güncelle
        firstSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/services/first_section/${firstSectionData.backgroundImage}')`;
        
        // Overlay ekle
        firstSection.style.position = 'relative';
        firstSection.style.backgroundSize = 'cover';
        firstSection.style.backgroundPosition = 'center';
    }
}

// Hizmetler Bölümü SecondSection yönetimi
function initializeServicesSecondSection() {
    const secondSectionTitle = document.getElementById('services-fourth-section-title');
    const secondSectionDescription = document.getElementById('services-fourth-section-content');

    if (secondSectionTitle) {
        const secondSectionData = JSON.parse(localStorage.getItem('servicesSecondSectionData')) || {
            capital: 'NELER YAPIYORUZ?',
            description: 'Ali Mobilyanın var olduğu her alanda özel ölçüye göre tasarımlar üretmekteyiz.<br>Mimari tasarımlarda ve konsept projelerde uygulamacı olarak çalışıyoruz.'
        };

        // Başlığı güncelle
        secondSectionTitle.textContent = secondSectionData.capital;

        // Açıklama güncelle
        if (secondSectionDescription) {
            secondSectionDescription.innerHTML = secondSectionData.description;
        }
    }
}

// İletişim Bölümü FirstSection yönetimi
function initializeContactsFirstSection() {
    const firstSection = document.getElementById('contacts-first-section');
    const firstSectionTitle = document.getElementById('contacts-first-section-title');

    if (firstSection && firstSectionTitle) {
        const firstSectionData = JSON.parse(localStorage.getItem('contactsFirstSectionData')) || {
            text: 'İLETİŞİM',
            backgroundImage: 'a1.jpg'
        };

        // Başlığı güncelle
        firstSectionTitle.textContent = firstSectionData.text;

        // Arkaplan resmini güncelle
        firstSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/contacts/first_section/${firstSectionData.backgroundImage}')`;
        
        // Overlay ekle
        firstSection.style.position = 'relative';
        firstSection.style.backgroundSize = 'cover';
        firstSection.style.backgroundPosition = 'center';
    }
}


// Dropdown menüyü doldur
function populateServicesDropdown() {
    const services = [];
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    mainServicesData.forEach(service => {
        const urlFriendlyName = service.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[ğ]/g, 'g')
            .replace(/[ü]/g, 'u')
            .replace(/[ş]/g, 's')
            .replace(/[ı]/g, 'i')
            .replace(/[ö]/g, 'o')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '');

        services.push({ 
            title: service.name, 
            link: `/custom_service.html?service=${urlFriendlyName}`,
            id: service.id
        });
    });
    
    const dropdown = document.getElementById('services-dropdown');
    if (dropdown) {
        dropdown.innerHTML = '';
        services.forEach(service => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = service.link;
            a.textContent = service.title;
            // ID'yi data attribute olarak ekle
            a.dataset.serviceId = service.id;
            li.appendChild(a);
            dropdown.appendChild(li);
        });
    }
}


function initializeFourthSection() {
    const fourthCards = document.querySelector('.fourth-cards');
    const fourthNavigation = document.querySelector('.fourth-navigation');
    if (!fourthCards || !fourthNavigation) return;

    // Key ismini mainPageServicesData olarak değiştirdik
    const mainPageServicesData = JSON.parse(localStorage.getItem('mainPageServicesData')) || [];
    console.log(mainPageServicesData);
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];

    if (mainPageServicesData.length === 0) return;

    const dotVal = Math.ceil(mainPageServicesData.length / 3);
    let currentPage = 1;

    // Dot'ları oluştur
    fourthNavigation.innerHTML = Array.from({ length: dotVal }, (_, i) => `
        <button class="fourth-dot ${i + 1 === currentPage ? 'active' : ''}" data-slide="${i + 1}"></button>
    `).join('');

    let currentPageIndex = 0;

    function updateCards() {
        const startIndex = currentPageIndex * 3;
        const firstService = mainPageServicesData[startIndex];
        const secondService = mainPageServicesData[startIndex + 1];
        const thirdService = mainPageServicesData[startIndex + 2];
        const willShowServices = [firstService, secondService, thirdService];

        // Önce mevcut kartları gizle
        const currentCards = fourthCards.querySelectorAll('.fourth-card');
        currentCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        // Kısa bir gecikme sonra yeni kartları göster
        setTimeout(() => {
            const cardsHTML = willShowServices.map(serviceData => {
                if (!serviceData) return '';
                const selectedService = mainServicesData[serviceData.index];
                return `
                    <div class="fourth-card">
                        <div class="card-image">
                            <img src="images/services/mainPage/${serviceData.image}" alt="${serviceData.name}">
                            <div class="plus-icon"></div>
                            <div class="card-content">
                                <h3>${serviceData.name}</h3>
                                <p>${serviceData.description}</p>
                                <a href="/services.html" class="fourth-btn">Daha Fazlası</a>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            fourthCards.innerHTML = cardsHTML;

        }, 300); // Kartların silinmesi ve yenilerinin eklenmesi arasındaki gecikme
    }    

    // İlk kartları göster
    updateCards();

    // İlk yüklemede kartları animasyonla göster
    const initialCards = fourthCards.querySelectorAll('.fourth-card');
    initialCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Dot'lara tıklama olayını ekle
    const dots = document.querySelectorAll('.fourth-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const newPage = parseInt(this.dataset.slide);
            if (newPage === currentPageIndex + 1) return;

            currentPageIndex = newPage - 1;
            
            // Dot'ları güncelle
            dots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');

            // Kartları güncelle
            updateCards();
        });
    });
}

// Özel hizmet sayfasını başlat
function initializeCustomService() {
    // URL'den hizmet adını al
    const urlParams = new URLSearchParams(window.location.search);
    const serviceName = urlParams.get('service');
    
    if (!serviceName) {
        console.error('Hizmet adı bulunamadı');
        return;
    }

    // LocalStorage'dan hizmet verilerini al
    const mainServicesData = JSON.parse(localStorage.getItem('mainServicesData')) || [];
    
    // URL-friendly ismi orijinal isme çevir ve hizmeti bul
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


    const customServiceSection = document.getElementById('custom-service-section');
    const customServiceName = document.getElementById('custom-service-name');
    const customServiceMainTitle = document.getElementById('custom-service-main-title');
    const customServiceSubTitle = document.getElementById('custom-service-sub-title');
    const customServiceDescription = document.getElementById('custom-service-description');

    if (customServiceSection && customServiceName && customServiceMainTitle && 
        customServiceSubTitle && customServiceDescription) {
        
        // Başlığı güncelle
        customServiceName.textContent = service.name;
        customServiceMainTitle.textContent = service.mainTitle;
        customServiceSubTitle.textContent = service.subTitle;
        customServiceDescription.textContent = service.description;

        // Arkaplan resmini güncelle
        if (service.image) {
            const backgroundImageUrl = `images/services/first_section/${service.image}`;
            console.log('Background image URL:', backgroundImageUrl);
            customServiceSection.style.backgroundImage = 
                `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${backgroundImageUrl}')`;
        } else {
            console.error('Service image is undefined');
        }
        
        // Overlay ekle
        customServiceSection.style.position = 'relative';
        customServiceSection.style.backgroundSize = 'cover';
        customServiceSection.style.backgroundPosition = 'center';
    }
}
