// Admin panel functionality
let products = JSON.parse(localStorage.getItem('products')) || [];

// DOM Elements
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const addProductBtn = document.getElementById('addProductBtn');
const closeBtn = document.querySelector('.close');
const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];

// Event Listeners
addProductBtn.addEventListener('click', () => {
    productForm.reset();
    document.getElementById('productId').value = '';
    productModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    productModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.style.display = 'none';
    }
});

productForm.addEventListener('submit', handleProductSubmit);

// Functions
function handleProductSubmit(e) {
    e.preventDefault();

    const productData = {
        id: document.getElementById('productId').value || Date.now().toString(),
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
    };

    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            productData.image = e.target.result;
            saveProduct(productData);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // If editing a product and no new image is selected, keep the existing image
        if (productData.id) {
            const existingProduct = products.find(p => p.id === productData.id);
            if (existingProduct && existingProduct.image) {
                productData.image = existingProduct.image;
                saveProduct(productData);
                return;
            }
        }

        // Default image if none exists
        productData.image = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        saveProduct(productData);
    }
}

function saveProduct(productData) {
    const existingIndex = products.findIndex(p => p.id === productData.id);

    if (existingIndex >= 0) {
        products[existingIndex] = productData;
    } else {
        products.push(productData);
    }

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
    productModal.style.display = 'none';
    productForm.reset();
}

function displayProducts() {
    productsTable.innerHTML = '';
    products.forEach(product => {
        const row = productsTable.insertRow();
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td class="action-buttons">
                <button onclick="editProduct('${product.id}')" class="edit-btn">Edit</button>
                <button onclick="deleteProduct('${product.id}')" class="delete-btn">Delete</button>
            </td>
        `;
    });
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        productModal.style.display = 'block';
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// Initial display
displayProducts();
