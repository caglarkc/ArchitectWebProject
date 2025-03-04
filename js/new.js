// Header yönetimi
$(document).ready(function() {
    // Header container'ları
    const headerContainer = $("#header-container");
    const mobileHeaderContainer = $("#mobile-header-container");
    const topHeader = $(".top-header");
    const footerContainer = $("#footer-container");

    // Footer yükleme fonksiyonu
    function loadFooter() {
        if (!footerContainer.length) {
            console.error("Footer container not found");
            return;
        }

        console.log("Attempting to load footer");
        footerContainer.load("footer.html", function(response, status, xhr) {
            if (status === "error") {
                console.error("Error loading footer:", xhr.status, xhr.statusText);
            } else {
                console.log("Footer loaded successfully");
                // Footer yüklendikten sonra iletişim bilgilerini güncelle
                loadContactInfo();
            }
        });
    }

    // İlk yükleme kontrolü ve header yükleme
    function loadAppropriateHeader() {
        const windowWidth = $(window).width();
        console.log("Current window width:", windowWidth);
    
        if (windowWidth <= 600) {
            console.log("Attempting to load mobile header");
            headerContainer.empty();
            topHeader.hide();
            mobileHeaderContainer.load("mobile_header.html", function(response, status, xhr) {
                if (status === "error") {
                    console.error("Error loading mobile header:", xhr.status, xhr.statusText);
                } else {
                    console.log("Mobile header loaded successfully");
                }
            });
        } else {
            console.log("Attempting to load normal header");
            mobileHeaderContainer.empty(); // Mobil header'ı temizle
            topHeader.show(); // Top header'ı göster
            headerContainer.load("header.html", function(response, status, xhr) {
                if (status === "error") {
                    console.error("Error loading header:", xhr.status, xhr.statusText);
                } else {
                    console.log("Normal header loaded successfully");
                    setActiveMenuItem(); // Normal menü aktif öğesini ayarla
                }
            });
        }
    }

    // İlk yükleme
    loadAppropriateHeader();
    loadFooter(); // Footer'ı yükle

    // Ekran boyutu değiştiğinde kontrol et
    let resizeTimer;
    
    // Resize olayını jQuery ile dinle
    $(window).on('resize orientationchange', function() {
        console.log("Window resize/orientation event triggered");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            loadAppropriateHeader();
        }, 250);
    });

    // Mobil cihazlar için orientationchange olayını da dinle
    window.addEventListener('orientationchange', function() {
        setTimeout(loadAppropriateHeader, 100);
    });

    // Sayfa tamamen yüklendiğinde bir kez daha kontrol et
    $(window).on('load', function() {
        loadAppropriateHeader();
        if (!footerContainer.children().length) {
            loadFooter(); // Footer yüklenmemişse tekrar dene
        }
    });

    // Ana sayfa içeriğini yükle
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        initializeSlider();
    }

    // İstatistikleri başlat
    initializeStats();
});

// Mobil menü için aktif öğeyi belirle
function setActiveMobileMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const urlParams = new URLSearchParams(window.location.search);
    const currentService = urlParams.get('service');
    
    $('.mobile-nav-list a').removeClass('active');
    
    // Aktif sayfanın linkini bul ve işaretle
    const activeLink = $(`.mobile-nav-list a[href="${currentPage}"]`);
    activeLink.addClass('active');
    
    // Hizmetler sayfası kontrolü
    if (currentPage === 'services.html' || currentPage === 'custom_service.html') {
        const servicesLink = $('.mobile-dropdown > a');
        servicesLink.addClass('active');
        
        if (currentService) {
            setTimeout(() => {
                const dropdownLinks = document.querySelectorAll('#mobileServicesDropdown a');
                dropdownLinks.forEach(link => {
                    if (link.href.includes(`service=${currentService}`)) {
                        link.classList.add('active');
                    }
                });
            }, 100);
        }
    }
}

// Aktif menü öğesini belirle
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const urlParams = new URLSearchParams(window.location.search);
    const currentService = urlParams.get('service');
    
    $('.nav-list a').removeClass('active');
    
    // Aktif sayfanın linkini bul ve işaretle
    const activeLink = $(`.nav-list a[href="${currentPage}"]`);
    activeLink.addClass('active');
    
    // Normal sayfalarda (hizmetler hariç) aktif linki tıklanamaz yap
    if (!activeLink.parent().hasClass('dropdown')) {
        activeLink.css('pointer-events', 'none');
    }
    
    // Hizmetler ana sayfasındaysak
    if (currentPage === 'services.html') {
        const servicesLink = $('.nav-list .dropdown > a');
        servicesLink.css('pointer-events', 'none');
        // Dropdown menünün çalışması için parent elementi tıklanabilir bırak
        servicesLink.parent().css('pointer-events', 'auto');
    }
    
    // Özel hizmet sayfasındaysak (custom_service.html)
    if (currentPage === 'custom_service.html') {
        const servicesLink = $('.nav-list .dropdown > a');
        servicesLink.addClass('active');
        
        // Dropdown menüyü aktif ve tıklanabilir tut
        servicesLink.parent().css('pointer-events', 'auto');
        
        // Mevcut hizmetin linkini bul ve tıklanamaz yap
        if (currentService) {
            // Header yüklendikten sonra işlem yap
            setTimeout(() => {
                const dropdownLinks = document.querySelectorAll('#services-dropdown a');
                dropdownLinks.forEach(link => {
                    if (link.href.includes(`service=${currentService}`)) {
                        link.style.pointerEvents = 'none';
                        link.classList.add('active');
                    }
                });
            }, 100); // Header'ın yüklenmesi için kısa bir süre bekle
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeFourthSection();

    loadContactInfo();

    const contactForm = document.getElementById('contact-form');
    const iletisimForm = document.getElementById('iletisim-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }

    if (iletisimForm) {
        iletisimForm.addEventListener('submit', handleSubmit);
    }
});

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

// Slider fonksiyonları
function initializeSlider() {
    const section = document.querySelector('.first-section');
    const slider = document.querySelector('.slider');
    
    // Slider değişkenlerini tanımla
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

function initializeFourthSection() {
    const fourthCards = document.querySelectorAll('.fourth-card');
    const dots = document.querySelectorAll('.fourth-dot');

    if (fourthCards.length === 0 || dots.length === 0) return;

    let currentPageIndex = 0;
    const itemsPerPage = 3;
    let isAnimating = false;

    function updateCards() {
        if (isAnimating) return;
        isAnimating = true;

        // Önce tüm kartları fade-out yap
        fourthCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.classList.add('fade-out');
                card.classList.remove('fade-in');
            }
        });

        // Kısa bir gecikme sonra yeni kartları göster
        setTimeout(() => {
            fourthCards.forEach((card, index) => {
                if (index >= currentPageIndex * itemsPerPage && index < (currentPageIndex + 1) * itemsPerPage) {
                    card.style.display = 'block';
                    card.classList.remove('fade-out');
                    requestAnimationFrame(() => {
                        card.classList.add('fade-in');
                    });
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in', 'fade-out');
                }
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 300);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPageIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index === currentPageIndex || isAnimating) return;
            currentPageIndex = index;
            updateCards();
            updateDots();
        });
    });

    // Başlangıç durumu için kartları ve dot'ları güncelle
    updateCards();
    updateDots();
}


// İstatistik Sayaçları
function initializeStats() {
    console.log("initializeStats");
    // İstatistik verilerini localStorage'dan al
    const statisticsData = {
        experienceYears: 30,
        satisfaction: 100,
        teamSize: 20,
        completedProjects: 1000,
        icons: {
            experience: 'experience.jpg',
            satisfaction: 'satisfaction.jpg',
            team: 'team.jpg',
            projects: 'project.jpg'
        }
    };

    // Ana sayfadaki ikonları güncelle (sixth-section)
    const sixthIcons = document.querySelectorAll('.sixth-icon img');
    if (sixthIcons.length === 4) {
        sixthIcons[0].src = `images/${statisticsData.icons.experience}`;
        sixthIcons[1].src = `images/${statisticsData.icons.satisfaction}`;
        sixthIcons[2].src = `images/${statisticsData.icons.team}`;
        sixthIcons[3].src = `images/${statisticsData.icons.projects}`;
    }

    // Hakkımızda sayfasındaki ikonları güncelle (stats-section)
    const statsIcons = document.querySelectorAll('.stat-icon img');
    if (statsIcons.length === 4) {
        statsIcons[0].src = `images/${statisticsData.icons.experience}`;
        statsIcons[1].src = `images/${statisticsData.icons.satisfaction}`;
        statsIcons[2].src = `images/${statisticsData.icons.team}`;
        statsIcons[3].src = `images/${statisticsData.icons.projects}`;
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

function loadReferences() {
    // Referansları güncelle
    const seventhContainer = document.querySelector('.seventh-container');
    if (seventhContainer) {
        seventhContainer.innerHTML = referencesData.map(ref => `
            <div class="seventh-item">
                <img src="${ref.image}" alt="${ref.name}">
            </div>
        `).join('');
    }
}

// İletişim bilgilerini yükle
function loadContactInfo() {
    const contactData = {
        address: 'İstanbul',
        phone1: '0544 482 58 65',
        phone2: '0532 739 58 03',
        email: 'info@clmimarlik.com',
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


// Sayfa kaydırıldığında butonu göster/gizle
window.onscroll = function() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
};

// Sayfanın en üstüne kaydır
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleSubmit(event) {
    event.preventDefault(); // Formun varsayılan gönderme işlemini engelle

    // Form alanlarını al
    const form = event.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const errors = [];

    // 🔍 Ad Soyad Kontrolü
    if (!name) {
        errors.push("Adınız Soyadınız alanı boş olamaz.");
    }

    // 📱 Telefon Numarası Kontrolü (Sadece rakam ve 10 haneli)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        errors.push("Telefon numaranız 10 haneli ve sadece rakamlardan oluşmalıdır.");
    }

    // 📧 E-posta Adresi Kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Geçerli bir e-posta adresi giriniz.");
    }

    // ✉️ Mesaj Kontrolü
    if (!message) {
        errors.push("Mesaj alanı boş olamaz.");
    }

    // ❌ Eğer hata varsa kullanıcıya göster
    if (errors.length > 0) {
        alert("Form Hataları:\n" + errors.join("\n"));
        return;
    }

    // ✅ Form Verilerini JSON Olarak Topla
    const formData = {
        name,
        phone,
        email,
        subject,
        message
    };

    console.log("Form Verileri:", formData);
    alert("Form başarıyla gönderildi!");

    // Formu Sıfırla
    form.reset();
}
