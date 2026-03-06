// Products Database
// Aap yahan naya product asani se add kar sakte hain.
// Har product ke liye niche wala format follow karein.

export const PRODUCTS = [
    {
        id: '1',
        name: 'Hot 60 Pro',
        brand: 'Infinix',
        price: 45999,
        image: '/public/images/infinixhot60pro.png',
        description: 'The Infinix Hot 60 Pro is designed for power users who demand high performance and stunning visuals.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '108MP Main', battery: '5000mAh', processor: 'Helio G99', display: '6.78" AMOLED' },
        variants: [
            { color: 'Golden', image: '/public/images/infinixhot60pro.png' },
            { color: 'Black', image: '/public/images/infinixhot60pro2.png' },
            { color: 'Golden', image: '/public/images/infinixhot60pro1.png' },
        ]
    },
    {
        id: '2',
        name: 'iPhone 15 Pro',
        brand: 'Apple',
        price: 345000,
        image: '/public/images/iPhone-15-Pro.png',
        description: 'Titanium design, A17 Pro chip, and the most powerful iPhone camera system ever.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '48MP Main', battery: '3274mAh', processor: 'A17 Pro', display: '6.1" Super Retina' },
        variants: [
            { color: 'Natural Titanium', image: '/public/images/iPhone-15-Pro.png' },
            { color: 'Blue Titanium', image: 'https://images.unsplash.com/photo-1697284958332-93444aeb4efb?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            { color: 'White Titanium', image: 'https://images.unsplash.com/photo-1703133431079-8477009d42b2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: '3',
        name: 'Galaxy S24 Ultra',
        brand: 'Samsung',
        price: 399999,
        image: 'https://images.unsplash.com/photo-1675285776817-632fb95aff51?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The ultimate Galaxy Ultra experience with Galaxy AI, S Pen, and 200MP camera.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '512GB', camera: '200MP Quad', battery: '5000mAh', processor: 'Snapdragon 8 Gen 3', display: '6.8" QHD+' },
        variants: [{ color: 'Titanium Gray', image: 'https://images.unsplash.com/photo-1675285776817-632fb95aff51?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '4',
        name: 'Pixel 8 Pro',
        brand: 'Google',
        price: 215000,
        image: 'https://images.unsplash.com/photo-1697355360151-2866de32ad4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and has the best Pixel camera yet.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '128GB', camera: '50MP Triple', battery: '5050mAh', processor: 'Google Tensor G3', display: '6.7" LTPO OLED' },
        variants: [{ color: 'Bay', image: 'https://images.unsplash.com/photo-1697355360151-2866de32ad4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '5',
        name: 'OnePlus 12',
        brand: 'OnePlus',
        price: 185000,
        image: 'https://images.unsplash.com/photo-1614796740292-50ae67262ff0?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Smooth Beyond Belief. Powered by Snapdragon 8 Gen 3 and 4th Gen Hasselblad Camera.',
        stockStatus: 'In Stock',
        specs: { ram: '16GB', storage: '512GB', camera: '50MP Triple', battery: '5400mAh', processor: 'Snapdragon 8 Gen 3', display: '6.82" AMOLED' },
        variants: [{ color: 'Flowy Emerald', image: 'https://images.unsplash.com/photo-1614796740292-50ae67262ff0?q=80&w=1039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '6',
        name: 'Redmi Note 13 Pro',
        brand: 'Xiaomi',
        price: 74999,
        image: 'https://images.unsplash.com/photo-1701696255815-14a98bc1afcd?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Every shot iconic. 200MP camera with OIS, 120Hz AMOLED curved display.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '200MP Main', battery: '5000mAh', processor: 'Helio G99-Ultra', display: '6.67" AMOLED' },
        variants: [{ color: 'Midnight Black', image: 'https://images.unsplash.com/photo-1701696255815-14a98bc1afcd?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '7',
        name: 'V30 Pro',
        brand: 'Vivo',
        price: 159999,
        image: 'https://images.unsplash.com/photo-1746366782635-aabca81d2719?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Co-engineered with ZEISS. Professional portrait photography in your pocket.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '512GB', camera: '50MP Triple', battery: '5000mAh', processor: 'Dimensity 8200', display: '6.78" AMOLED' },
        variants: [{ color: 'Bloom White', image: 'https://images.unsplash.com/photo-1746366782635-aabca81d2719?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '8',
        name: 'Reno 11',
        brand: 'Oppo',
        price: 124999,
        image: 'https://images.unsplash.com/photo-1699796990081-f8eade0b84d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The Portrait Expert. Ultra-clear portrait camera system and 67W SUPERVOOC flash charge.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '256GB', camera: '50MP Triple', battery: '5000mAh', processor: 'Dimensity 7050', display: '6.7" OLED' },
        variants: [{ color: 'Wave Green', image: 'https://images.unsplash.com/photo-1699796990081-f8eade0b84d9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '9',
        name: 'Spark 20 Pro+',
        brand: 'Tecno',
        price: 54999,
        image: 'https://images.unsplash.com/photo-1727513372253-5e7e260d918d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Double curved design, 108MP ultra-sensing main camera, and Helio G99 Ultimate processor.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '108MP Main', battery: '5000mAh', processor: 'Helio G99 Ultimate', display: '6.78" AMOLED' },
        variants: [{ color: 'Temporal Orbits', image: 'https://images.unsplash.com/photo-1727513372253-5e7e260d918d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '10',
        name: 'Poco X6 Pro',
        brand: 'Poco',
        price: 129999,
        image: 'https://images.unsplash.com/photo-1615215271533-eab8c3d9cb34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A new speed-legend. Dimensity 8300-Ultra, CrystalRes 120Hz FIow AMOLED.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '512GB', camera: '64MP Triple', battery: '5000mAh', processor: 'Dimensity 8300-Ultra', display: '6.67" AMOLED' },
        variants: [{ color: 'Poco Yellow', image: 'https://images.unsplash.com/photo-1615215271533-eab8c3d9cb34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '11',
        name: 'iPhone 14',
        brand: 'Apple',
        price: 245000,
        image: 'https://images.unsplash.com/photo-1663314326576-13b6ab7fd5d4?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A total powerhouse. Impressive all-day battery life and high-speed performance.',
        stockStatus: 'In Stock',
        specs: { ram: '6GB', storage: '128GB', camera: '12MP Dual', battery: '3279mAh', processor: 'A15 Bionic', display: '6.1" Super Retina' },
        variants: [{ color: 'Blue', image: 'https://images.unsplash.com/photo-1663314326576-13b6ab7fd5d4?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '12',
        name: 'Galaxy A54',
        brand: 'Samsung',
        price: 135000,
        image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Awesome 5G speed, awesome camera, and awesome battery life.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '50MP Triple', battery: '5000mAh', processor: 'Exynos 1380', display: '6.4" Super AMOLED' },
        variants: [{ color: 'Awesome Graphite', image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '13',
        name: 'Nothing Phone (2)',
        brand: 'Nothing',
        price: 165000,
        image: 'https://images.unsplash.com/photo-1661962399580-80301d32d791?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'A new way to interact. Glyph Interface, Nothing OS 2.0, and premium performance.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '256GB', camera: '50MP Dual', battery: '4700mAh', processor: 'Snapdragon 8+ Gen 1', display: '6.7" LTPO OLED' },
        variants: [{ color: 'Dark Gray', image: 'https://images.unsplash.com/photo-1661962399580-80301d32d791?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '14',
        name: 'Realme GT 5',
        brand: 'Realme',
        price: 145000,
        image: 'https://images.unsplash.com/photo-1695499405433-63b7d42e7326?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Leap-forward performance. 240W charging and Snapdragon 8 Gen 2.',
        stockStatus: 'In Stock',
        specs: { ram: '16GB', storage: '512GB', camera: '50MP Triple', battery: '4600mAh', processor: 'Snapdragon 8 Gen 2', display: '6.74" AMOLED' },
        variants: [{ color: 'Silver', image: 'https://images.unsplash.com/photo-1695499405433-63b7d42e7326?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '15',
        name: 'Sony Xperia 1 V',
        brand: 'Sony',
        price: 285000,
        image: 'https://images.unsplash.com/photo-1518379106190-c4cfbcab0e39?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Unprecedented image quality. Next-generation sensor and professional audio features.',
        stockStatus: 'Low Stock',
        specs: { ram: '12GB', storage: '256GB', camera: '48MP Triple', battery: '5000mAh', processor: 'Snapdragon 8 Gen 2', display: '6.5" 4K OLED' },
        variants: [{ color: 'Black', image: 'https://images.unsplash.com/photo-1518379106190-c4cfbcab0e39?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '16',
        name: 'Zenfone 10',
        brand: 'ASUS',
        price: 175000,
        image: 'https://images.unsplash.com/photo-1732020884042-11dfad2ad029?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Mighty On Hand. Compact size, massive power, and incredible camera stabilization.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '50MP Dual', battery: '4300mAh', processor: 'Snapdragon 8 Gen 2', display: '5.9" AMOLED' },
        variants: [{ color: 'Midnight Black', image: 'https://images.unsplash.com/photo-1732020884042-11dfad2ad029?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '17',
        name: 'Motorola Edge 40',
        brand: 'Motorola',
        price: 115000,
        image: 'https://images.unsplash.com/photo-1716930686282-ea19761e78a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Designed to delight. Slim, curved design and powerful performance.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '50MP Dual', battery: '4400mAh', processor: 'Dimensity 8020', display: '6.55" pOLED' },
        variants: [{ color: 'Eclipse Black', image: 'https://images.unsplash.com/photo-1716930686282-ea19761e78a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '18',
        name: 'Honor 90',
        brand: 'Honor',
        price: 125000,
        image: 'https://images.unsplash.com/photo-1760708368766-1d36cd72591e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Share your vibe. 200MP ultra-clear camera and risk-free dimming display.',
        stockStatus: 'In Stock',
        specs: { ram: '12GB', storage: '512GB', camera: '200MP Triple', battery: '5000mAh', processor: 'Snapdragon 7 Gen 1', display: '6.7" AMOLED' },
        variants: [{ color: 'Emerald Green', image: 'https://images.unsplash.com/photo-1760708368766-1d36cd72591e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '19',
        name: 'Huawei P60 Pro',
        brand: 'Huawei',
        price: 265000,
        image: 'https://images.unsplash.com/photo-1728897444991-c8f157c43494?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'The master of light. Ultra lighting XMAGE camera and durable Kunlun glass.',
        stockStatus: 'In Stock',
        specs: { ram: '8GB', storage: '256GB', camera: '48MP Triple', battery: '4815mAh', processor: 'Snapdragon 8+ Gen 1', display: '6.67" LTPO OLED' },
        variants: [{ color: 'Rococo Pearl', image: 'https://images.unsplash.com/photo-1728897444991-c8f157c43494?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    },
    {
        id: '20',
        name: 'Nokia G42',
        brand: 'Nokia',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1705023291051-8413d5e91f94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'So fast, so much battery, so easy to fix. The first repairable 5G Nokia phone.',
        stockStatus: 'In Stock',
        specs: { ram: '6GB', storage: '128GB', camera: '50MP Triple', battery: '5000mAh', processor: 'Snapdragon 480+', display: '6.56" HD+' },
        variants: [{ color: 'So Purple', image: 'https://images.unsplash.com/photo-1705023291051-8413d5e91f94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }]
    }
];

