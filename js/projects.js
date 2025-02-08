document.addEventListener('DOMContentLoaded', function() {
    const fifthGrid = document.querySelector('.fifth-grid');
    const fifthButtons = document.querySelectorAll('.fifth-btn');
    
    // Örnek proje verileri
    const projects = [
        // Mimari Projeler
        { image: 'project_images/mimari_projeler/proje1.jpg', category: 'mimari' },
        { image: 'project_images/mimari_projeler/proje2.jpg', category: 'mimari' },
        { image: 'project_images/mimari_projeler/proje3.jpg', category: 'mimari' },
        
        // Ticari Projeler
        { image: 'project_images/ticari_projeler/proje1.jpg', category: 'ticari' },
        { image: 'project_images/ticari_projeler/proje2.jpg', category: 'ticari' },
        
        // Yaşam Alanı Projeleri
        { image: 'project_images/yasam_alani/proje1.jpg', category: 'yasam' },
        { image: 'project_images/yasam_alani/proje2.jpg', category: 'yasam' },
        { image: 'project_images/yasam_alani/proje3.jpg', category: 'yasam' },
        { image: 'project_images/yasam_alani/proje4.jpg', category: 'yasam' }
    ];

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

    // Projeleri göster
    function renderProjects(projectsToShow) {
        fifthGrid.innerHTML = '';
        
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
    }

    // Filtreleme işlemi
    function filterProjects(category) {
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
    }

    // Event listeners
    fifthButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            fifthButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterProjects(this.dataset.filter);
        });
    });

    // İlk yükleme
    renderProjects(projects);
}); 