// State Management
const state = {
  products: [...PRODUCTS],
  cart: JSON.parse(localStorage.getItem("technova_cart")) || [],
  filters: {
    search: "",
    category: "all",
    price: "all",
    rating: 0,
    sort: "featured"
  }
};

// DOM Elements
const productGrid = document.getElementById("productGrid");
const productCountText = document.getElementById("productCountText");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const emptyResetBtn = document.getElementById("emptyResetBtn");

const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartBadge = document.getElementById("cartBadge");
const drawerCartCount = document.getElementById("drawerCartCount");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartFooter = document.getElementById("cartFooter");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const proceedCheckoutBtn = document.getElementById("proceedCheckoutBtn");

const productModal = document.getElementById("productModal");
const closeProductModal = document.getElementById("closeProductModal");
const productModalBody = document.getElementById("productModalBody");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutItemsList = document.getElementById("checkoutItemsList");
const checkoutTotalAmount = document.getElementById("checkoutTotalAmount");

const orderSuccessModal = document.getElementById("orderSuccessModal");
const orderReceiptBox = document.getElementById("orderReceiptBox");
const closeSuccessModalBtn = document.getElementById("closeSuccessModalBtn");

const toastContainer = document.getElementById("toastContainer");

// Utility: Format VND Currency
function formatCurrency(amount) {
  return amount.toLocaleString("vi-VN") + "₫";
}

// Utility: Show Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2600);
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("technova_cart", JSON.stringify(state.cart));
}

// Filter & Sort Logic
function getFilteredProducts() {
  const { search, category, price, rating, sort } = state.filters;
  const keyword = search.trim().toLowerCase();

  let filtered = state.products.filter((item) => {
    // Search match
    const matchesSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.categoryLabel.toLowerCase().includes(keyword);

    // Category match
    const matchesCategory = category === "all" || item.category === category;

    // Price range match
    let matchesPrice = true;
    if (price === "under-2m") matchesPrice = item.price < 2000000;
    else if (price === "2m-15m") matchesPrice = item.price >= 2000000 && item.price <= 15000000;
    else if (price === "15m-30m") matchesPrice = item.price > 15000000 && item.price <= 30000000;
    else if (price === "above-30m") matchesPrice = item.price > 30000000;

    // Rating match
    const matchesRating = item.rating >= Number(rating);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

// Render Products
function renderProducts() {
  const list = getFilteredProducts();
  productCountText.innerHTML = `Đang hiển thị <strong>${list.length}</strong> sản phẩm`;

  if (list.length === 0) {
    productGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  productGrid.innerHTML = list
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-img-wrap" onclick="openProductDetail(${product.id})">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-category-tag">${product.categoryLabel}</span>
        </div>
        <div class="product-body">
          <h3 class="product-title" onclick="openProductDetail(${product.id})">${product.name}</h3>
          <div class="product-rating">★ ${product.rating} <span>(${product.reviews} đánh giá)</span></div>
          <p class="product-desc">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">${formatCurrency(product.price)}</span>
            <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
              + Thêm vào giỏ
            </button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

// Product Quick View Modal
function openProductDetail(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  productModalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <div>
      <span class="badge-promo" style="background:#eff6ff;color:#2563eb;">${product.categoryLabel}</span>
      <h2 style="margin-bottom:8px;">${product.name}</h2>
      <div class="product-rating" style="margin-bottom:12px;">★ ${product.rating} <span>(${product.reviews} đánh giá từ khách hàng)</span></div>
      <p style="font-size:1.35rem;font-weight:700;color:var(--primary);margin-bottom:14px;">
        ${formatCurrency(product.price)}
      </p>
      <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:20px;">
        ${product.description}
      </p>
      <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); closeModal(productModal);">
        Thêm vào giỏ hàng
      </button>
    </div>
  `;

  productModal.classList.remove("hidden");
}

// Cart Operations
function addToCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng`);
}

function updateCartQuantity(productId, delta) {
  const index = state.cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  showToast("Đã xóa sản phẩm khỏi giỏ hàng");
}

function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  saveCart();
  renderCart();
  showToast("Đã làm trống giỏ hàng");
}

function getCartTotals() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalCount, totalPrice };
}

function renderCart() {
  const { totalCount, totalPrice } = getCartTotals();
  cartBadge.textContent = totalCount;
  drawerCartCount.textContent = totalCount;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-msg">
        <p style="font-size:2rem;margin-bottom:8px;">🛒</p>
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
    `;
    cartFooter.classList.add("hidden");
    return;
  }

  cartFooter.classList.remove("hidden");
  cartSubtotal.textContent = formatCurrency(totalPrice);
  cartTotal.textContent = formatCurrency(totalPrice);

  cartItemsContainer.innerHTML = state.cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Xóa</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Drawer & Modal Controls
function openCartDrawer() {
  cartOverlay.classList.remove("hidden");
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  cartOverlay.classList.add("hidden");
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function closeModal(modalEl) {
  modalEl.classList.add("hidden");
}

// Checkout Flow
function openCheckout() {
  if (state.cart.length === 0) return;
  closeCartDrawer();

  const { totalPrice } = getCartTotals();
  checkoutTotalAmount.textContent = formatCurrency(totalPrice);
  checkoutItemsList.innerHTML = state.cart
    .map(
      (item) => `
      <div class="checkout-summary-item">
        <span>${item.name} <strong>x${item.quantity}</strong></span>
        <span>${formatCurrency(item.price * item.quantity)}</span>
      </div>
    `
    )
    .join("");

  checkoutModal.classList.remove("hidden");
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const payment = document.getElementById("paymentMethod").value;

  const { totalCount, totalPrice } = getCartTotals();
  const orderCode = "TN-" + Math.floor(100000 + Math.random() * 900000);

  orderReceiptBox.innerHTML = `
    <p><strong>Mã đơn hàng:</strong> ${orderCode}</p>
    <p><strong>Khách hàng:</strong> ${name} (${phone})</p>
    ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
    <p><strong>Địa chỉ:</strong> ${address}</p>
    <p><strong>Thanh toán:</strong> ${payment}</p>
    <p><strong>Số lượng:</strong> ${totalCount} sản phẩm</p>
    <p><strong>Tổng tiền:</strong> <span style="color:var(--primary);font-weight:700;">${formatCurrency(totalPrice)}</span></p>
  `;

  // Clear cart and reset form
  state.cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();

  closeModal(checkoutModal);
  orderSuccessModal.classList.remove("hidden");
});

// Reset All Filters
function resetAllFilters() {
  state.filters = {
    search: "",
    category: "all",
    price: "all",
    rating: 0,
    sort: "featured"
  };

  searchInput.value = "";
  clearSearchBtn.classList.add("hidden");
  sortSelect.value = "featured";

  document.querySelector('input[name="category"][value="all"]').checked = true;
  document.querySelector('input[name="price"][value="all"]').checked = true;
  document.querySelector('input[name="rating"][value="0"]').checked = true;

  renderProducts();
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  state.filters.search = e.target.value;
  clearSearchBtn.classList.toggle("hidden", !e.target.value);
  renderProducts();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.filters.search = "";
  clearSearchBtn.classList.add("hidden");
  renderProducts();
  searchInput.focus();
});

document.querySelectorAll('input[name="category"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    state.filters.category = e.target.value;
    renderProducts();
  });
});

document.querySelectorAll('input[name="price"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    state.filters.price = e.target.value;
    renderProducts();
  });
});

document.querySelectorAll('input[name="rating"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    state.filters.rating = e.target.value;
    renderProducts();
  });
});

sortSelect.addEventListener("change", (e) => {
  state.filters.sort = e.target.value;
  renderProducts();
});

resetFiltersBtn.addEventListener("click", resetAllFilters);
emptyResetBtn.addEventListener("click", resetAllFilters);

openCartBtn.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
clearCartBtn.addEventListener("click", clearCart);
proceedCheckoutBtn.addEventListener("click", openCheckout);

closeProductModal.addEventListener("click", () => closeModal(productModal));
closeCheckoutModal.addEventListener("click", () => closeModal(checkoutModal));
closeSuccessModalBtn.addEventListener("click", () => closeModal(orderSuccessModal));

// Close modal on backdrop click
[productModal, checkoutModal, orderSuccessModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// Initialize App
renderProducts();
renderCart();
