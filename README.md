# TechNova Store - Website E-Commerce (HTML, CSS & JavaScript)

Dự án website thương mại điện tử (E-Commerce) hoàn chỉnh xây dựng bằng HTML5, CSS3 và Vanilla JavaScript (không phụ thuộc framework).

## Cấu trúc thư mục
```
ecommerce-website/
├── index.html       # Giao diện chính, bộ lọc, modal chi tiết, ngăn kéo giỏ hàng & form đặt hàng
├── css/
│   └── style.css    # Thiết kế Responsive, Grid/Flexbox, Modal & Drawer
├── js/
│   ├── products.js  # Dữ liệu danh sách sản phẩm mẫu
│   └── app.js       # Xử lý tìm kiếm, lọc, sắp xếp, giỏ hàng (LocalStorage) và đặt hàng
└── README.md        # Hướng dẫn sử dụng
```

## Các tính năng chính
1. **Hiển thị sản phẩm**: Lưới sản phẩm trực quan kèm hình ảnh, danh mục, đánh giá sao, giá tiền và cửa sổ xem chi tiết nhanh (Quick View).
2. **Tìm kiếm sản phẩm**: Tìm kiếm tức thì theo tên sản phẩm, mô tả hoặc danh mục.
3. **Lọc & Sắp xếp sản phẩm**: Lọc kết hợp theo Danh mục, Khoảng giá, Mức đánh giá tối thiểu và sắp xếp theo giá/đánh giá.
4. **Thêm & Quản lý giỏ hàng**: Ngăn kéo giỏ hàng trượt ngang (Slide-over Drawer), tăng/giảm số lượng, xóa từng món hoặc xóa toàn bộ, tự động lưu vào `localStorage`.
5. **Đặt hàng (Checkout)**: Form nhập thông tin giao hàng, tóm tắt đơn hàng, chọn phương thức thanh toán và xuất hóa đơn xác nhận kèm mã đơn hàng.

## Cách chạy dự án
Chỉ cần giải nén file ZIP và mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Edge, Firefox, Safari).
