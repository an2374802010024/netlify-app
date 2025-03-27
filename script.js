// Initialize products array
let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: 1,
        name: "iPhone 13",
        price: 799,
        category: "apple",
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "A powerful smartphone with A15 Bionic chip and amazing camera system."
    },
    {
        id: 2,
        name: "Samsung Galaxy S21",
        price: 699,
        category: "samsung",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Feature-packed Android phone with excellent display and versatile camera."
    },
    {
        id: 3,
        name: "Xiaomi Mi 11",
        price: 599,
        category: "xiaomi",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "High-performance smartphone at an affordable price with great specs."
    },
    {
        id: 4,
        name: "iPhone 12",
        price: 699,
        category: "apple",
        image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "A great all-around iPhone with 5G capabilities and stunning design."
    }
];

// Display products in the grid
function displayProducts(productsToShow = products) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    productGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p class="product-price">$${product.price}</p>
                <a href="#" class="view-btn">View Details</a>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(filter) {
    if (filter === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === filter);
        displayProducts(filtered);
    }
}

// Page Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            loadPage(page);
        }
    });
});

function loadPage(page) {
    const main = document.querySelector('main');

    switch(page) {
        case 'home':
            main.innerHTML = `
                <section id="hero">
                    <h1>Welcome to PhoneStore</h1>
                    <p>Discover the Latest Smartphones</p>
                </section>
                <section id="featured-products">
                    <h2>Featured Products</h2>
                    <div class="product-grid" id="productGrid"></div>
                </section>
            `;
            displayProducts(products.slice(0, 4)); // Show first 4 products
            break;

        case 'products':
            main.innerHTML = `
                <section id="filters">
                    <div class="filter-container">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="apple">Apple</button>
                        <button class="filter-btn" data-filter="samsung">Samsung</button>
                        <button class="filter-btn" data-filter="xiaomi">Xiaomi</button>
                    </div>
                </section>
                <section id="products">
                    <h2>All Products</h2>
                    <div class="product-grid" id="productGrid"></div>
                </section>
            `;
            displayProducts(products);
            initializeFilters();
            break;

        case 'about':
            main.innerHTML = `
                <section class="about-section">
                    <h2>About Us</h2>
                    <div class="about-content">
                        <p>Welcome to PhoneStore, your number one source for all things smartphones.
                           We're dedicated to providing you the very best of mobile devices, with an
                           emphasis on quality, service, and customer satisfaction.</p>
                        <p>Founded in 2024, PhoneStore has come a long way from its beginnings.
                           We now serve customers all over the country, and are thrilled to be a
                           part of the eco-friendly, fair trade wing of the mobile industry.</p>
                    </div>
                </section>
            `;
            break;

        case 'contact':
            main.innerHTML = `
                <section class="contact-section">
                    <div class="contact-form">
                        <h2>Contact Us</h2>
                        <form id="contactForm">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" id="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Message:</label>
                                <textarea id="message" required></textarea>
                            </div>
                            <button type="submit" class="submit-btn">Send Message</button>
                        </form>
                    </div>
                    <div class="contact-info">
                        <h3>Our Information</h3>
                        <p><i class="fas fa-map-marker-alt"></i> 123 Phone Street, Tech City</p>
                        <p><i class="fas fa-phone"></i> +1 234 567 890</p>
                        <p><i class="fas fa-envelope"></i> contact@phonestore.com</p>
                    </div>
                </section>
            `;
            initializeContactForm();
            break;
    }
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your contact form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
}

// Load home page by default on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
});
