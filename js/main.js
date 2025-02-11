// Header'ı yükle
$(document).ready(function() {
    $("#header-container").load("header.html", function() {
        // Header yüklendikten sonra aktif sayfayı belirle
        setActiveMenuItem();

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

    // Footer'ı yükle
    $("#footer-container").load("footer.html");

    // Ana sayfada son blogları göster
    if (window.location.pathname.endsWith('mainPage.html') || window.location.pathname.endsWith('/')) {
        displayLatestBlogs();
    }

    // İstatistikleri başlat
    initializeStats();

    // Slider fonksiyonalitesi
    initializeSlider();
});

// Aktif menü öğesini belirle
function setActiveMenuItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.nav-list a').removeClass('active');
    $(`.nav-list a[href="${currentPage}"]`).addClass('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.fourth-card');
    const dots = document.querySelectorAll('.fourth-dot');
    const cardsPerPage = 3;
    let currentPage = 1;
    let isAnimating = false;

    // İlk yüklemede ilk 3 kartı göster
    updateCards();

    // Noktalara tıklama olayını dinle
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            if (isAnimating) return;
            const newPage = parseInt(this.dataset.slide);
            if (newPage === currentPage) return;
            
            isAnimating = true;
            animateCardTransition(newPage);
        });
    });

    function animateCardTransition(newPage) {
        const currentCards = document.querySelectorAll('.fourth-card:not(.hidden)');
        const direction = newPage > currentPage ? 1 : -1;
        
        // Mevcut kartları animasyonla çıkar
        currentCards.forEach((card, index) => {
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            card.style.transform = `translateX(${-100 * direction}%) perspective(1000px) rotateY(${20 * direction}deg)`;
            card.style.opacity = '0';
        });

        setTimeout(() => {
            // Mevcut kartları gizle
            currentCards.forEach(card => {
                card.classList.add('hidden');
                card.classList.remove('active');
                card.style.transform = '';
                card.style.opacity = '';
            });

            // Yeni kartları göster
            currentPage = newPage;
            updateDots();
            
            const newCards = Array.from(cards).filter((card, index) => 
                index >= (currentPage - 1) * cardsPerPage && index < currentPage * cardsPerPage
            );

            // Yeni kartları animasyonla getir
            newCards.forEach((card, index) => {
                card.classList.remove('hidden');
                card.style.transform = `translateX(${100 * direction}%) perspective(1000px) rotateY(${-20 * direction}deg)`;
                card.style.opacity = '0';
                card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        card.style.transform = 'translateX(0) perspective(1000px) rotateY(0deg)';
                        card.style.opacity = '1';
                        card.classList.add('active');
                    }, 50);
                });
            });

            setTimeout(() => {
                isAnimating = false;
                // Animasyon tamamlandıktan sonra inline stilleri temizle
                newCards.forEach(card => {
                    card.style.transition = '';
                    card.style.transform = '';
                    card.style.opacity = '';
                });
            }, 800);
        }, 600);
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentPage - 1].classList.add('active');
    }

    function updateCards() {
        cards.forEach((card, index) => {
            if (index >= (currentPage - 1) * cardsPerPage && index < currentPage * cardsPerPage) {
                card.classList.remove('hidden');
                card.classList.add('active');
            } else {
                card.classList.add('hidden');
                card.classList.remove('active');
            }
        });
    }
});

// İstatistik Sayaçları
function initializeStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
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

function animateNumbers() {
    const stats = document.querySelectorAll('.sixth-number');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9.]/g, '');
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
    const videoContainer = document.querySelector('.video-container');
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
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentSlide = 0;
    let isTransitioning = false;

    // İlk slide'ı aktif yap
    slides[0].classList.add('active');

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;

        // Slider'ı kaydır
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Aktif slide'ı güncelle
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            // Animasyonları sıfırla
            const elements = slide.querySelectorAll('.first-content h1, .first-content h2, .first-content p, .first-buttons');
            elements.forEach(element => {
                element.style.animation = 'none';
                element.offsetHeight; // Reflow
                element.style.animation = '';
            });
        });

        // Yeni slide'ı aktif yap ve animasyonları başlat
        setTimeout(() => {
            slides[currentSlide].classList.add('active');
        }, 50);

        // Dots'ları güncelle
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Geçiş tamamlandığında isTransitioning'i false yap
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

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning || currentSlide === index) return;
            currentSlide = index;
            updateSlider();
        });
    });

    // Otomatik geçiş
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Mouse hover olduğunda otomatik geçişi durdur
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Mouse ayrıldığında otomatik geçişi tekrar başlat
    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events için swipe desteği
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}
