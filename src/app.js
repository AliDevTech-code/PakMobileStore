import { PRODUCTS } from './products.js';

// Product Data
const WHATSAPP_NUMBER = "923063159899";

const MOCK_REVIEWS = [
    { id: 'r1', user: 'Ali Khan', rating: 5, comment: 'Zabardast mobile hai, delivery bhi fast thi!', date: '2 days ago' },
    { id: 'r2', user: 'Sara Ahmed', rating: 4, comment: 'Camera quality is amazing for this price.', date: '1 week ago' },
    { id: 'r3', user: 'Usman Sheikh', rating: 5, comment: 'Original product mili, PTA approved hai.', date: '3 days ago' }
];

// State
let cart = [];
let activeBrand = 'All';
let searchQuery = '';
let currentSlide = 0;
const totalSlides = 3;
let sliderInterval;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartFooter = document.getElementById('cart-footer');
const cartCountDesktop = document.getElementById('cart-count-desktop');
const cartCountMobile = document.getElementById('cart-count-mobile');
const productModal = document.getElementById('product-modal');

// Render Brand Filters Dynamically
function renderBrandFilters() {
    const brandFiltersContainer = document.getElementById('brand-filters');
    const brands = ['All', ...new Set(PRODUCTS.map(p => p.brand))];
    
    brandFiltersContainer.innerHTML = brands.map((brand, index) => `
        <button data-brand="${brand}" 
                class="filter-btn animate-fade-in ${brand === activeBrand ? 'active bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'} px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap"
                style="animation-delay: ${index * 100}ms">
            ${brand}
        </button>
    `).join('');

    // Re-attach event listeners to new buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeBrand = btn.dataset.brand;
            renderBrandFilters();
            renderProducts();
        });
    });
}

// Initialize
function init() {
    renderBrandFilters();
    renderProducts();
    setupEventListeners();
    setupScrollReveal();
    lucide.createIcons();
}

// Scroll Reveal Observer
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Render Products
function renderProducts() {
    // Show skeletons first
    showGridSkeletons();

    // Simulate a small delay for perceived performance
    setTimeout(() => {
        let filtered = activeBrand === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.brand === activeBrand);
        
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
        }
        
        if (filtered.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-span-full py-20 text-center animate-fade-in">
                    <div class="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i data-lucide="search-x" class="w-10 h-10 text-slate-400"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">No mobiles found</h3>
                    <p class="text-slate-500">Try searching for something else or change the filter.</p>
                </div>
            `;
        } else {
            productsGrid.innerHTML = filtered.map((product, index) => `
            <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group reveal reveal-up active" 
                 style="transition-delay: ${index * 50}ms"
                 onclick="openProductDetail('${product.id}')">
                <div class="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span class="bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-indigo-600 shadow-sm">${product.brand}</span>
                    </div>
                </div>
                <div class="p-3 sm:p-5 flex-1 flex flex-col">
                    <h3 class="text-sm sm:text-lg font-display font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">${product.name}</h3>
                    <p class="hidden sm:block text-sm text-slate-500 line-clamp-2 mb-4">${product.description}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div class="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                            <i data-lucide="cpu" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500"></i>
                            <span class="text-[10px] sm:text-xs font-medium">${product.specs.ram} / ${product.specs.storage}</span>
                        </div>
                        <div class="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                            <i data-lucide="battery" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500"></i>
                            <span class="text-[10px] sm:text-xs font-medium">${product.specs.battery}</span>
                        </div>
                    </div>
                    <div class="mt-auto flex items-center justify-between gap-2 sm:gap-4">
                        <div>
                            <span class="text-[8px] sm:text-xs text-slate-400 block uppercase font-bold tracking-tighter">Price</span>
                            <span class="text-base sm:text-xl font-display font-bold text-slate-900">Rs. ${product.price.toLocaleString()}</span>
                        </div>
                        <button onclick="event.stopPropagation(); addToCart('${product.id}')" class="bg-indigo-600 hover:bg-indigo-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors shadow-lg">
                            <i data-lucide="shopping-cart" class="w-4 h-4 sm:w-5 sm:h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        }
        lucide.createIcons();
        
        // Re-trigger scroll reveal for new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('#products-grid .reveal').forEach(el => observer.observe(el));
    }, 400);
}

function showGridSkeletons() {
    const skeletonCount = 8;
    productsGrid.innerHTML = Array.from({ length: skeletonCount }).map(() => `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            <div class="aspect-[4/5] skeleton"></div>
            <div class="p-3 sm:p-5 flex-1 flex flex-col space-y-3">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text w-1/2"></div>
                <div class="flex justify-between items-center mt-auto pt-4">
                    <div class="space-y-2">
                        <div class="skeleton skeleton-text w-12"></div>
                        <div class="skeleton skeleton-title w-24"></div>
                    </div>
                    <div class="w-10 h-10 rounded-xl skeleton"></div>
                </div>
            </div>
        </div>
    `).join('');
}


// Cart Functions
window.addToCart = function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true);
};

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update counts
    [cartCountDesktop, cartCountMobile].forEach(el => {
        el.innerText = count;
        el.classList.toggle('hidden', count === 0);
    });

    // Update Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                <div class="bg-slate-50 p-6 rounded-full"><i data-lucide="shopping-cart" class="w-12 h-12 text-slate-300"></i></div>
                <p class="text-lg font-medium text-slate-900">Your cart is empty</p>
            </div>
        `;
        cartFooter.classList.add('hidden');
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex gap-4 group animate-fade-in">
                <div class="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="font-bold text-slate-900">${item.name}</h3>
                        <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-red-500 transition-colors">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <p class="text-xs text-slate-500 mb-3">${item.brand}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center border border-slate-200 rounded-lg">
                            <button onclick="updateQty('${item.id}', -1)" class="p-1 hover:bg-slate-50 text-slate-600"><i data-lucide="minus" class="w-4 h-4"></i></button>
                            <span class="w-8 text-center text-sm font-bold">${item.quantity}</span>
                            <button onclick="updateQty('${item.id}', 1)" class="p-1 hover:bg-slate-50 text-slate-600"><i data-lucide="plus" class="w-4 h-4"></i></button>
                        </div>
                        <span class="font-bold text-indigo-600">Rs. ${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
        cartTotalEl.innerText = `Rs. ${total.toLocaleString()}`;
        cartFooter.classList.remove('hidden');
    }
    lucide.createIcons();
}

window.updateQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        updateCartUI();
    }
};

window.removeFromCart = function(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
};

function toggleCart(show) {
    if (show) {
        cartDrawer.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    } else {
        cartDrawer.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    }
}

// Product Detail
window.openProductDetail = function(id) {
    // Show modal and skeleton first
    productModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    showModalSkeleton();

    setTimeout(() => {
        const product = PRODUCTS.find(p => p.id === id);
        // Get 12 products from any category (excluding current)
        const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 12);
        
        // Fallback for missing data
        const variants = product.variants || [];
        const reviews = product.reviews || MOCK_REVIEWS;

        productModal.innerHTML = `
            <div class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
                <button onclick="closeProductDetail()" class="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-bold">
                    <i data-lucide="arrow-left" class="w-5 h-5"></i><span>Back to Shop</span>
                </button>
                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-600">${product.stockStatus}</span>
            </div>
            <div class="bg-white">
                <div class="max-w-6xl mx-auto px-4 pt-6 pb-2 animate-fade-in-up w-full">
                    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div class="aspect-square max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                            <img id="detail-main-image" src="${product.image}" alt="${product.name}" class="w-full h-full object-contain p-4">
                        </div>
                        <div class="space-y-4">
                            <div>
                                <h1 class="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-1">${product.name}</h1>
                                <div class="text-2xl font-display font-bold text-indigo-600">Rs. ${product.price.toLocaleString()}</div>
                            </div>
                            
                            <!-- Color Variants -->
                            <div class="${variants.length === 0 ? 'hidden' : ''}">
                                <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Available Colors</h3>
                                <div class="flex gap-3">
                                    ${variants.map(v => `
                                        <button onclick="changeDetailImage('${v.image}')" class="w-14 h-14 rounded-xl border-2 border-slate-100 overflow-hidden hover:border-indigo-600 transition-all focus:border-indigo-600 shadow-sm">
                                            <img src="${v.image}" class="w-full h-full object-cover">
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <p class="text-slate-600 leading-relaxed text-sm">${product.description}</p>
                            
                            <div class="grid grid-cols-3 gap-3">
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span class="text-[8px] text-slate-400 uppercase font-bold block">CPU</span>
                                    <span class="text-[10px] font-bold text-slate-900 truncate block">${product.specs.processor}</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span class="text-[8px] text-slate-400 uppercase font-bold block">Display</span>
                                    <span class="text-[10px] font-bold text-slate-900 truncate block">${product.specs.display}</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                                    <span class="text-[8px] text-slate-400 uppercase font-bold block">RAM/ROM</span>
                                    <span class="text-[10px] font-bold text-slate-900 truncate block">${product.specs.ram}/${product.specs.storage}</span>
                                </div>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-3">
                                <button onclick="buyNow('${product.id}')" class="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg text-base">
                                    <i data-lucide="message-circle" class="w-5 h-5"></i>Buy on WhatsApp
                                </button>
                                <div class="flex gap-3">
                                    <button onclick="addToCart('${product.id}')" class="flex-1 sm:w-32 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-base">
                                        <i data-lucide="shopping-cart" class="w-5 h-5"></i>Cart
                                    </button>
                                    <button onclick="shareProduct('${product.id}')" class="w-14 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold flex items-center justify-center hover:bg-slate-200 transition-colors">
                                        <i data-lucide="share-2" class="w-5 h-5"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Recommended Products (Moved Inside Column) -->
                            <div class="mt-4 pt-4 border-t border-slate-100 hidden lg:block">
                                <div class="flex items-center justify-between mb-4">
                                    <h2 class="text-sm font-display font-bold text-slate-900">Recommended for You</h2>
                                </div>
                                <div class="grid grid-cols-3 gap-2">
                                    ${related.slice(0, 3).map(p => `
                                        <div class="group cursor-pointer bg-white p-2 rounded-lg border border-slate-100 hover:border-indigo-500 transition-all shadow-sm" onclick="openProductDetail('${p.id}')">
                                            <div class="aspect-square rounded-md overflow-hidden bg-slate-50 mb-1">
                                                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500">
                                            </div>
                                            <h4 class="font-bold text-slate-900 text-[8px] truncate">${p.name}</h4>
                                            <p class="text-[8px] font-bold text-indigo-600">Rs. ${p.price.toLocaleString()}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recommended Products (Mobile/Full Width) -->
                    <div class="mt-4 pt-4 border-t border-slate-100 lg:hidden">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-display font-bold text-slate-900">Recommended for You</h2>
                            <button onclick="closeProductDetail()" class="text-indigo-600 text-xs font-bold hover:underline">View All</button>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            ${related.map(p => `
                                <div class="group cursor-pointer bg-white p-2.5 rounded-xl border border-slate-100 hover:border-indigo-500 transition-all shadow-sm" onclick="openProductDetail('${p.id}')">
                                    <div class="aspect-square rounded-lg overflow-hidden bg-slate-50 mb-2">
                                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500">
                                    </div>
                                    <h4 class="font-bold text-slate-900 text-[10px] truncate">${p.name}</h4>
                                    <p class="text-[10px] font-bold text-indigo-600 mt-0.5">Rs. ${p.price.toLocaleString()}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Full Width Recommended (Desktop - below grid) -->
                    <div class="mt-8 pt-8 border-t border-slate-100 hidden lg:block">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-xl font-display font-bold text-slate-900">More Recommendations</h2>
                        </div>
                        <div class="grid grid-cols-6 gap-4">
                            ${related.slice(3, 20).map(p => `
                                <div class="group cursor-pointer bg-white p-3 rounded-2xl border border-slate-100 hover:border-indigo-500 transition-all shadow-sm" onclick="openProductDetail('${p.id}')">
                                    <div class="aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3">
                                        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500">
                                    </div>
                                    <h4 class="font-bold text-slate-900 text-xs truncate">${p.name}</h4>
                                    <p class="text-xs font-bold text-indigo-600 mt-1">Rs. ${p.price.toLocaleString()}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Reviews Section -->
                    <div class="mt-8 pt-8 border-t border-slate-100 reveal reveal-up">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 class="text-xl font-display font-bold text-slate-900 mb-1">Customer Reviews</h2>
                                <div class="flex items-center gap-3">
                                    <div class="flex items-center gap-0.5 text-orange-400">
                                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                        <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                                    </div>
                                    <span class="text-slate-900 font-bold text-xs">4.9/5</span>
                                </div>
                            </div>
                            <button class="px-4 py-1.5 border-2 border-slate-900 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white transition-all">Write a Review</button>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            ${reviews.map(review => `
                                <div class="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                ${review.user.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-slate-900 text-sm">${review.user}</h4>
                                                <div class="flex items-center gap-0.5 text-orange-400 mt-0.5">
                                                    ${Array.from({ length: 5 }).map((_, i) => `
                                                        <i data-lucide="star" class="w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-slate-200'}"></i>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>
                                        <span class="text-[8px] font-bold uppercase tracking-widest text-slate-400">${review.date}</span>
                                    </div>
                                    <p class="text-slate-600 text-xs leading-relaxed italic">"${review.comment}"</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Modal Footer (Same as Main Site) -->
                <footer class="bg-indigo-600 text-white pt-12 pb-8 mt-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <!-- Logo & Links -->
                            <div>
                                <div class="flex items-center gap-2 mb-8">
                                    <div class="bg-white p-1.5 rounded-lg">
                                        <i data-lucide="smartphone" class="w-6 h-6 text-indigo-600"></i>
                                    </div>
                                    <span class="text-2xl font-display font-bold tracking-tight text-white">MobileStore</span>
                                </div>
                                <ul class="space-y-3 text-sm font-medium">
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">About Us</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">FAQs</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Contact Us</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Careers</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Press & Blog</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Terms & Condition</a></li>
                                </ul>
                            </div>

                            <!-- Customer Service -->
                            <div>
                                <h3 class="text-lg font-bold mb-8">Customer Service</h3>
                                <ul class="space-y-3 text-sm font-medium">
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Help Center</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Privacy Policy</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">E-Warranty Activation</a></li>
                                    <li><a href="#" class="hover:opacity-70 transition-opacity">Sell on MobileStore</a></li>
                                </ul>
                            </div>

                            <!-- Secure Payments -->
                            <div class="md:col-span-2">
                                <h3 class="text-lg font-bold mb-8">Secure Payments Methods</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                        <i data-lucide="credit-card" class="w-5 h-5"></i>
                                        <span class="text-sm font-bold uppercase tracking-wider">Visa / Master</span>
                                    </div>
                                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                        <i data-lucide="landmark" class="w-5 h-5"></i>
                                        <span class="text-sm font-bold uppercase tracking-wider">Bank Transfer</span>
                                    </div>
                                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                        <i data-lucide="truck" class="w-5 h-5"></i>
                                        <span class="text-sm font-bold uppercase tracking-wider">Cash on Delivery</span>
                                    </div>
                                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                        <i data-lucide="shield-check" class="w-5 h-5"></i>
                                        <span class="text-sm font-bold uppercase tracking-wider">Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="border-t border-white/20 pt-12">
                            <div class="flex flex-col items-center">
                                <div class="flex gap-6 mb-10">
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><i data-lucide="youtube" class="w-5 h-5"></i></a>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><i data-lucide="twitter" class="w-5 h-5"></i></a>
                                    <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><i data-lucide="linkedin" class="w-5 h-5"></i></a>
                                </div>
                                
                                <p class="text-sm text-center max-w-4xl opacity-80 leading-relaxed mb-10">
                                    Smartphones today come packed with a variety of innovative features and a range of cool new designs. Finding a mobile phone that is right for you can be hard with so many options. Thankfully, MobileStore is here to make things easy! Browse our collection and buy phones that meet your unique requirements. Sort mobile phones by price, brand, memory, camera, and more to save time searching. MobileStore hosts a range of popular mobile brands such as Apple, Samsung, Huawei, Sony, and Xiaomi as well as some lesser-known brands.
                                </p>
                                
                                <div class="flex flex-col md:flex-row justify-between items-center w-full gap-4 text-xs font-bold opacity-60 uppercase tracking-widest">
                                    <span>Copyright © 2024 MobileStore.pk</span>
                                    <div class="flex gap-6">
                                        <a href="#" class="hover:underline">Privacy</a>
                                        <a href="#" class="hover:underline">Terms</a>
                                        <a href="#" class="hover:underline">Sitemap</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        `;
        lucide.createIcons();
    }, 600);
};

function showModalSkeleton() {
    productModal.innerHTML = `
        <div class="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-4 flex items-center justify-between">
            <div class="skeleton skeleton-text w-32"></div>
            <div class="skeleton skeleton-text w-20"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 py-8 lg:py-12">
            <div class="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <div class="aspect-[4/5] rounded-[2.5rem] skeleton"></div>
                <div class="space-y-6">
                    <div class="skeleton skeleton-title h-12 w-3/4"></div>
                    <div class="skeleton skeleton-title h-10 w-1/2"></div>
                    <div class="space-y-3">
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text w-2/3"></div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-24 skeleton rounded-2xl"></div>
                        <div class="h-24 skeleton rounded-2xl"></div>
                        <div class="h-24 skeleton rounded-2xl"></div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex-1 h-16 skeleton rounded-2xl"></div>
                        <div class="flex-1 h-16 skeleton rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


window.closeProductDetail = function() {
    productModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.changeDetailImage = function(src) {
    const mainImg = document.getElementById('detail-main-image');
    if (mainImg) {
        mainImg.src = src;
    }
};

window.shareProduct = async function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const shareData = {
        title: product.name,
        text: `Check out the ${product.name} at MobileStore! Price: Rs. ${product.price.toLocaleString()}`,
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            // Temporary visual feedback could be added here
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
};

window.buyNow = function(id) {
    const product = PRODUCTS.find(p => p.id === id);

    const message = `Hello,

I am interested in this mobile:

📱 ${product.name}
💰 Price: Rs. ${product.price.toLocaleString()}
🏷 Brand: ${product.brand}

Is this mobile available? Please share more details.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
};

// Events
function setupEventListeners() {
    // Search Input
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Cart Toggle
    [document.getElementById('cart-btn-desktop'), document.getElementById('cart-btn-mobile')].forEach(btn => {
        btn.addEventListener('click', () => toggleCart(true));
    });
    document.getElementById('close-cart').addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const menuDrawer = document.getElementById('menu-drawer');
    const menuOverlay = document.getElementById('menu-drawer-overlay');
    const closeMenu = document.getElementById('close-menu');

    function toggleMenu(show) {
        if (show) {
            menuDrawer.classList.remove('-translate-x-full');
            menuOverlay.classList.remove('hidden');
        } else {
            menuDrawer.classList.add('-translate-x-full');
            menuOverlay.classList.add('hidden');
        }
    }

    menuToggle.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));
    menuOverlay.addEventListener('click', () => toggleMenu(false));
    
    // Close menu when clicking links
    menuDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // WhatsApp Order
    document.getElementById('whatsapp-order-btn').addEventListener('click', () => {
        let message = `*New Order from PakMobile Store*\n\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (${item.brand})\n`;
            message += `   Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n\n`;
        });
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `*Total Amount: Rs. ${total.toLocaleString()}*`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Slider Logic
    initSlider();
}

function initSlider() {
    const track = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSliderTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSliderTimer();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
            resetSliderTimer();
        });
    });

    function startSliderTimer() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function resetSliderTimer() {
        clearInterval(sliderInterval);
        startSliderTimer();
    }

    startSliderTimer();
}

window.scrollToProducts = function() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
};

// Start
document.addEventListener('DOMContentLoaded', init);
