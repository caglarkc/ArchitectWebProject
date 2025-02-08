document.addEventListener('DOMContentLoaded', function() {
    const fifthGrid = document.querySelector('.fifth-grid');
    const fifthButtons = document.querySelectorAll('.fifth-btn');
    
    // Hizmet verileri
    const services = [
        // Mimari Hizmetler
        { image: 'service_images/mimari/service1.jpg', category: 'mimari' },
        { image: 'service_images/mimari/service2.jpg', category: 'mimari' },
        { image: 'service_images/mimari/service3.jpg', category: 'mimari' },
        
        // Ticari Hizmetler
        { image: 'service_images/ticari/service1.jpg', category: 'ticari' },
        { image: 'service_images/ticari/service2.jpg', category: 'ticari' },
        
        // Yaşam Alanı Hizmetleri
        { image: 'service_images/yasam/service1.jpg', category: 'yasam' },
        { image: 'service_images/yasam/service2.jpg', category: 'yasam' },
        { image: 'service_images/yasam/service3.jpg', category: 'yasam' }
    ];

    // Modal oluştur
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Büyük Görsel">
        </div>
    `;
    document.body.appendChild(modal);

    // Hizmet elementi oluştur
    function createServiceElement(service, index) {
        const element = document.createElement('div');
        element.className = 'fifth-item';
        element.dataset.category = service.category;
        element.innerHTML = `<img src="${service.image}" alt="Hizmet Görseli" onerror="this.parentElement.style.display='none'">`;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        // Resme tıklama olayı ekle
        element.addEventListener('click', function() {
            const modalImg = modal.querySelector('img');
            modalImg.src = service.image;
            modal.style.display = 'flex';
        });

        return element;
    }

    // Modal kapatma
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal dışına tıklayınca kapat
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Hizmetleri göster
    function renderServices(servicesToShow) {
        fifthGrid.innerHTML = '';
        
        servicesToShow.forEach((service, index) => {
            const element = createServiceElement(service, index);
            fifthGrid.appendChild(element);
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Filtreleme işlemi
    function filterServices(category) {
        const filteredServices = category === 'all' ? 
            services : 
            services.filter(service => service.category === category);
        
        const currentItems = Array.from(fifthGrid.children);
        currentItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });

        setTimeout(() => {
            renderServices(filteredServices);
        }, 300);
    }

    // Event listeners
    fifthButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            fifthButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterServices(this.dataset.filter);
        });
    });

    // İlk yükleme
    renderServices(services);
}); 