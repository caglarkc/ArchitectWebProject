document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blog-container');

    // Blog kartlarını oluştur
    function createBlogCards() {
        blogPosts.forEach(post => {
            const blogCard = `
                <div class="col-lg-4 col-md-6">
                    <div class="blog-card">
                        <div class="position-relative">
                            <img src="${post.image}" alt="${post.title}">
                            <span class="blog-category">${post.category}</span>
                        </div>
                        <div class="blog-card-content">
                            <h3 class="blog-card-title">${post.title}</h3>
                            <div class="blog-meta">
                                <span><i class="far fa-calendar"></i> ${post.date}</span>
                                <span><i class="far fa-user"></i> ${post.author}</span>
                            </div>
                            <p class="blog-excerpt">
                                ${post.excerpt}
                            </p>
                            <a href="#" class="read-more">Devamını Oku</a>
                        </div>
                    </div>
                </div>
            `;
            blogContainer.innerHTML += blogCard;
        });
    }

    // Blog kartlarını yükle
    createBlogCards();
}); 