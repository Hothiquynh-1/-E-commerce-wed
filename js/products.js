const PRODUCTS = [
  {
    id: 1,
    name: "MacBook Pro 14 M3 Pro",
    category: "laptop",
    categoryLabel: "Laptop",
    price: 45990000,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Chip Apple M3 Pro 11-core, RAM 18GB, SSD 512GB, màn hình Liquid Retina XDR 14.2 inch siêu sắc nét dành cho lập trình và đồ họa."
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max 256GB",
    category: "phone",
    categoryLabel: "Điện thoại",
    price: 29490000,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    description: "Khung viền Titan chuẩn hàng không vũ trụ, chip A17 Pro mạnh mẽ, hệ thống camera Pro zoom quang học 5x."
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless",
    category: "audio",
    categoryLabel: "Âm thanh",
    price: 7490000,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80",
    description: "Tai nghe chống ồn chủ động hàng đầu với 8 micro, thời lượng pin lên đến 30 giờ và chất âm Hi-Res Audio."
  },
  {
    id: 4,
    name: "Bàn phím cơ Keychron Q1 Pro",
    category: "accessory",
    categoryLabel: "Phụ kiện",
    price: 4290000,
    rating: 4.7,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
    description: "Bàn phím cơ khung nhôm CNC nguyên khối, hỗ trợ QMK/VIA, kết nối không dây Bluetooth 5.1 và Hot-swap."
  },
  {
    id: 5,
    name: "Dell XPS 13 Plus 9320",
    category: "laptop",
    categoryLabel: "Laptop",
    price: 34500000,
    rating: 4.6,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    description: "Thiết kế tối giản hiện đại, Intel Core i7 Gen 13, màn hình cảm ứng OLED 3.5K viền siêu mỏng InfinityEdge."
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    category: "phone",
    categoryLabel: "Điện thoại",
    price: 27990000,
    rating: 4.8,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80",
    description: "Tích hợp Galaxy AI thông minh, bút S-Pen tiện lợi, camera 200MP sắc nét và màn hình phẳng Dynamic AMOLED 2X."
  },
  {
    id: 7,
    name: "Chuột Logitech MX Master 3S",
    category: "accessory",
    categoryLabel: "Phụ kiện",
    price: 2390000,
    rating: 4.9,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    description: "Cảm biến 8000 DPI hoạt động trên cả mặt kính, cuộn điện từ MagSpeed siêu êm và thiết kế công thái học."
  },
  {
    id: 8,
    name: "Loa Bluetooth Marshall Emberton II",
    category: "audio",
    categoryLabel: "Âm thanh",
    price: 3890000,
    rating: 4.7,
    reviews: 163,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Âm thanh đa hướng 360° True Stereophonic đặc trưng, chuẩn chống nước bụi IP67 và pin 30+ giờ."
  },
  {
    id: 9,
    name: "Cáp sạc nhanh Anker 765 USB-C 140W",
    category: "accessory",
    categoryLabel: "Phụ kiện",
    price: 590000,
    rating: 4.5,
    reviews: 185,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    description: "Bọc dù siêu bền chịu lực uốn cong 35.000 lần, hỗ trợ sạc nhanh công suất tối đa 140W cho laptop và điện thoại."
  },
  {
    id: 10,
    name: "ASUS ROG Zephyrus G14",
    category: "laptop",
    categoryLabel: "Laptop",
    price: 38900000,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    description: "Laptop gaming mỏng nhẹ 1.65kg, AMD Ryzen 9, card đồ họa RTX 4060, màn hình Nebula 165Hz chuẩn màu."
  },
  {
    id: 11,
    name: "Apple AirPods Pro Gen 2 (USB-C)",
    category: "audio",
    categoryLabel: "Âm thanh",
    price: 5790000,
    rating: 4.8,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    description: "Chip H2 khử tiếng ồn chủ động gấp 2 lần, chế độ xuyên âm thích ứng và hộp sạc chuẩn chống bụi nước IP54."
  },
  {
    id: 12,
    name: "Đế tản nhiệt Laptop nhôm nguyên khối",
    category: "accessory",
    categoryLabel: "Phụ kiện",
    price: 850000,
    rating: 4.3,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    description: "Hợp kim nhôm tản nhiệt thụ động hiệu quả, điều chỉnh độ cao linh hoạt giúp bảo vệ cột sống cổ khi làm việc."
  }
];
