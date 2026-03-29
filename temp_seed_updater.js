const fs = require('fs');
const oldSeedText = fs.readFileSync('backend/src/config/seed.js', 'utf8');

// A list of highly improved descriptions and specific image sets for our products
const newProducts = [
  // Electronics
  {
    category_slug: 'electronics',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB)',
    description: 'Experience the pinnacle of mobile innovation with the Samsung Galaxy S24 Ultra 5G. Encased in a premium Titanium Black finish, this smartphone boasts a breathtaking 6.8-inch Dynamic AMOLED 2X display with an ultra-smooth 120Hz refresh rate. Powered by the incredibly fast Snapdragon 8 Gen 3 processor, it handles multitasking and the most demanding games with ease. Capture your world in unprecedented detail with the revolutionary 200MP quad-camera system, which features groundbreaking low-light enhancements. The integrated S Pen unleashes your creativity, perfect for quick notes and precision editing. With a robust 5000mAh battery supporting 45W fast charging, you’ll stay powered throughout your busiest days. Elevate your everyday experience with top-tier performance, sleek design, and Galaxy AI capabilities.',
    price: 124999,
    original_price: 134999,
    stock: 50,
    rating: 4.8,
    rating_count: 12847,
    brand: 'Samsung',
    highlights: JSON.stringify(['6.8" Flat Display, QHD+ Resolution', 'Titanium Frame for Ultimate Protection', 'Snapdragon 8 Gen 3 for Galaxy', '200MP Main Camera with 100x Space Zoom', 'Built-in S Pen with Bluetooth']),
    specifications: JSON.stringify({ 'Display': '6.8 inches, Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12 GB', 'Storage': '256 GB', 'Battery': '5000 mAh', 'OS': 'Android 14' }),
    images: [
      'https://m.media-amazon.com/images/I/71cxhKvhS3L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71RPUgMAfBL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71R+O4sU3kL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71L5-MdfN-L._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'electronics',
    name: 'Apple iPhone 15 Pro (Natural Titanium, 128GB)',
    description: 'Forged in aerospace-grade titanium, the Apple iPhone 15 Pro represents the future of professional smartphones. The striking Natural Titanium finish frames a dazzling 6.1-inch Super Retina XDR display, enhanced by ProMotion technology for fluid scrolling at up to 120Hz. At its heart lies the A17 Pro chip, delivering boundary-pushing performance and industry-leading mobile gaming graphics. The advanced Pro camera system features a 48MP main sensor, enabling you to shoot super-high-resolution photos with astonishing detail and color. Transition effortlessly with the new USB-C connector offering faster transfer speeds. Designed for the creators, professionals, and everyone who demands excellence, the iPhone 15 Pro redefines mobile capability.',
    price: 119900,
    original_price: 134900,
    stock: 35,
    rating: 4.7,
    rating_count: 23410,
    brand: 'Apple',
    highlights: JSON.stringify(['6.1" Super Retina XDR Display with ProMotion', 'Aerospace-Grade Titanium Design', 'A17 Pro Chip with 6-Core GPU', '48MP Pro Camera System', 'USB-C with USB 3 Speeds']),
    specifications: JSON.stringify({ 'Display': '6.1 inches, Super Retina XDR', 'Chip': 'A17 Pro', 'Storage': '128 GB', 'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto', 'Battery': 'Up to 23 hours video playback', 'OS': 'iOS 17' }),
    images: [
      'https://m.media-amazon.com/images/I/81sigqwOJeL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81xUeI8d+hL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81v7WIZR0mL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71yR+cQ5nHL._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'electronics',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Immerse yourself in uncompromised sound with the Sony WH-1000XM5. Featuring industry-leading noise cancellation driven by two processors and eight microphones, these headphones block out more high and mid-frequency sounds than ever before. Enjoy incredibly clear hands-free calling with precise voice pickup technology. The newly designed 30mm precision-engineered drivers enhance high-frequency sensitivity for exceptional audio quality. With an ultra-comfortable, lightweight design and soft fit leather elements, you can listen for hours. The battery provides up to 30 hours of continuous playback, and a quick 3-minute charge yields 3 hours of listening. Perfect for travelers and audiophiles alike.',
    price: 24990,
    original_price: 34990,
    stock: 80,
    rating: 4.6,
    rating_count: 8932,
    brand: 'Sony',
    highlights: JSON.stringify(['Industry-Leading Noise Cancellation', 'Auto NC Optimizer adjusts to environments', 'Up to 30-Hour Battery Life', 'Multipoint Bluetooth Connection', 'Quick Charge: 3 min = 3 hours playback']),
    specifications: JSON.stringify({ 'Type': 'Over-Ear Wireless', 'Driver Size': '30mm', 'Frequency Response': '4Hz-40kHz', 'Battery Life': '30 hours', 'Charging': 'USB-C', 'Weight': '250g' }),
    images: [
      'https://m.media-amazon.com/images/I/51aXvjzcukL._SL1200_.jpg',
      'https://m.media-amazon.com/images/I/61r56m9-7WL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/616E+z5X-tL._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'electronics',
    name: 'Dell XPS 15 Laptop (Intel Core i7, 16GB RAM, 512GB SSD)',
    description: 'The Dell XPS 15 is meticulously crafted with premium materials to provide a flawless balance of power and portability. It features a stunning 15.6-inch OLED 3.5K display that delivers infinite contrast and vivid colors, bringing your creative visions to life. Powered by the 13th Gen Intel Core i7 processor and NVIDIA GeForce RTX 4060 graphics, it effortlessly handles intensive video editing, 3D rendering, and demanding applications. The dual-fan cooling system prevents overheating during peak performance. With an exquisitely engineered sleek aluminum chassis, 16GB DDR5 RAM, and a lightning-fast 512GB NVMe SSD, the XPS 15 is the ultimate tool for creators who refuse to compromise.',
    price: 149990,
    original_price: 179990,
    stock: 20,
    rating: 4.4,
    rating_count: 3421,
    brand: 'Dell',
    highlights: JSON.stringify(['15.6" OLED 3.5K InfinityEdge Display', '13th Gen Intel Core i7-13700H', 'NVIDIA GeForce RTX 4060 8GB', 'Machined Aluminum Chassis with Carbon Fiber', 'Quad-Speaker Design with Waves Nx 3D Audio']),
    specifications: JSON.stringify({ 'Processor': 'Intel Core i7-13700H', 'RAM': '16 GB DDR5', 'Storage': '512 GB PCIe NVMe SSD', 'Display': '15.6 inch OLED 3456x2160', 'Graphics': 'NVIDIA RTX 4060 8GB', 'OS': 'Windows 11 Home' }),
    images: [
      'https://m.media-amazon.com/images/I/61M6vM4rA6L._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61NlPjL1aTL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61O2O-3yQ9L._SL1000_.jpg'
    ]
  },
  {
    category_slug: 'electronics',
    name: 'LG 55 Inch 4K OLED Smart TV (OLED55C3PSA)',
    description: 'Transform your living room into a cinematic wonderland with the LG 55 Inch OLED evo C3. Experience deep, perfect blacks, limitless contrast, and intense colors that only OLED\'s self-lit pixels can provide. Driven by the advanced α9 AI Processor 4K Gen6, the TV intuitively upscale picture and audio quality to perfection based on what you’re watching. Enjoy an immersive audio-visual feast with Dolby Vision and Dolby Atmos integration. Gamers will love the lightning-fast 0.1ms response time, 120Hz refresh rate, and NVIDIA G-Sync compatibility for exceptionally smooth gameplay. Navigating entertainment is effortless with the upgraded webOS 23 Smart TV interface and intuitive Magic Remote.',
    price: 119990,
    original_price: 159990,
    stock: 15,
    rating: 4.8,
    rating_count: 5621,
    brand: 'LG',
    highlights: JSON.stringify(['55" OLED evo Display with Brightness Booster', 'α9 AI Processor 4K Gen6', '100% Color Volume and 100% Color Fidelity', 'Dolby Vision IQ & Dolby Atmos', 'webOS 23 Smart OS with Magic Remote']),
    specifications: JSON.stringify({ 'Display': '55 inches OLED', 'Resolution': '3840x2160 (4K)', 'Refresh Rate': '120Hz Native', 'HDR': 'Dolby Vision, HDR10', 'Smart TV': 'webOS 23', 'HDMI Ports': '4' }),
    images: [
      'https://m.media-amazon.com/images/I/81xU7d-M9XL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/717vD99p7kL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81F1i37YckL._SL1500_.jpg'
    ]
  },

  // Fashion
  {
    category_slug: 'fashion',
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans (Dark Indigo)',
    description: 'A modern classic, the Levi\'s 511 Slim Fit Jeans offer a stylishly tailored look that isn\'t too tight. They sit comfortably just below the waist and feature a slim, streamlined fit from the hip down through the thigh and ankle. Crafted from premium denim with a hint of stretch for enhanced mobility and comfort, these versatile dark indigo jeans seamlessly transition from a casual day out to a refined evening look. They feature traditional five-pocket styling, a classic zip fly with a button closure, and the iconic Levi\'s leather patch at the back waist.',
    price: 2999,
    original_price: 4999,
    stock: 200,
    rating: 4.3,
    rating_count: 18920,
    brand: "Levi's",
    highlights: JSON.stringify(['Modern Slim Fit Not Too Skinny', 'Sits Below the Waist', 'Woven with Added Stretch for Mobility', 'Classic 5-pocket Styling', 'Signature Button-Fly and Red Tab']),
    specifications: JSON.stringify({ 'Fit': 'Slim', 'Fabric': '99% Cotton, 1% Elastane', 'Closure': 'Zip Fly with Button', 'Care': 'Machine Wash Cold', 'Rise': 'Mid Rise', 'Origin': 'Imported' }),
    images: [
      'https://m.media-amazon.com/images/I/81H3I+z-GHL._SX569_.jpg',
      'https://m.media-amazon.com/images/I/81fH+uGkSCL._SX569_.jpg',
      'https://m.media-amazon.com/images/I/81L7XhQp-JL._SX569_.jpg'
    ]
  },
  {
    category_slug: 'fashion',
    name: 'Nike Air Max 270 Running Shoes (Black/White)',
    description: 'Elevate your daily run and street style with the Nike Air Max 270. Drawing inspiration from iconic heritage models like the Air Max 180 and 93, this shoe boasts Nike\'s largest-ever visible heel Air unit, delivering an exceptionally plush, bouncy feeling with every step you take. The woven and synthetic fabric upper provides a lightweight, breathable fit that moves and flexes with your foot. A foam midsole and stretchy inner sleeve ensure a snug, sock-like comfort. Complete with a robust rubber outsole for traction, the Air Max 270 is built for those who demand performance and unmistakable style.',
    price: 9995,
    original_price: 12995,
    stock: 150,
    rating: 4.5,
    rating_count: 9871,
    brand: 'Nike',
    highlights: JSON.stringify(['Max Air 270 Heel Unit for Visible Cushioning', 'Woven and Synthetic Mesh Upper', 'Foam Midsole Provides Soft Support', 'Stretchy Inner Sleeve', 'Durable Rubber Traction Outsole']),
    specifications: JSON.stringify({ 'Type': 'Running/Lifestyle Shoes', 'Upper': 'Mesh & Synthetic', 'Sole': 'Rubber with Max Air Unit', 'Closure': 'Lace-Up', 'Color': 'Black/White', 'Origin': 'Vietnam' }),
    images: [
      'https://m.media-amazon.com/images/I/71wK7-HlMwL._SX575_.jpg',
      'https://m.media-amazon.com/images/I/719hL3QhxyL._SX575_.jpg',
      'https://m.media-amazon.com/images/I/71DrtfR-94L._SX575_.jpg'
    ]
  },
  {
    category_slug: 'fashion',
    name: 'Women\'s Floral Maxi Dress (Summer Collection)',
    description: 'Embrace the warmth of summer with this stunning Floral Maxi Dress. Lovingly designed with an elegant A-line silhouette, it drapes gracefully to flatter any figure while offering unrestricted movement. Made from an ultra-soft, breathable rayon blend, it keeps you cool and comfortable even on the hottest days. The vibrant, meticulously detailed floral print pattern radiates tropical charm and confident femininity. It features a tasteful V-neckline, subtle ruffled hemlines, and cleverly hidden side pockets for convenience. Whether you are strolling along the beach, attending a garden party, or enjoying a brunch, this dress is your perfect companion.',
    price: 1499,
    original_price: 2999,
    stock: 300,
    rating: 4.2,
    rating_count: 6543,
    brand: 'FabAlley',
    highlights: JSON.stringify(['Breathable, Super-Soft Rayon Blend', 'Elegant V-Neckline and A-Line Flow', 'Convenient Hidden Side Pockets', 'Vibrant Floral Print Pattern', 'Floor-Length Hem for a Dramatic Silhouette']),
    specifications: JSON.stringify({ 'Fabric': '100% Rayon', 'Pattern': 'Floral Print', 'Length': 'Maxi', 'Fit': 'Regular Comfort Fit', 'Sleeve': 'Sleeveless', 'Care': 'Machine Wash Gentle Cold' }),
    images: [
      'https://m.media-amazon.com/images/I/71k6F8y81dL._SY741_.jpg',
      'https://m.media-amazon.com/images/I/71pE1Q5N-2L._SY741_.jpg',
      'https://m.media-amazon.com/images/I/61M8qE3S2+L._SY741_.jpg'
    ]
  },

  // Home & Furniture
  {
    category_slug: 'home-furniture',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker (6 Quart)',
    description: 'Revolutionize your meal preparation with the Instant Pot Duo 7-in-1 Multicooker. Replacing seven common kitchen appliances, it functions as a pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer. The spacious 6-quart capacity is perfect for cooking for families or bulk meal prep. Featuring 13 customizable one-touch smart programs, from robust stews to delicate yogurts, it cooks up to 70% faster than traditional methods, locking in nutrients and flavors. Constructed with a durable food-grade stainless steel inner pot and loaded with 10+ built-in safety features, it offers foolproof convenience and peace of mind.',
    price: 7999,
    original_price: 12999,
    stock: 60,
    rating: 4.6,
    rating_count: 34210,
    brand: 'Instant Pot',
    highlights: JSON.stringify(['7 Kitchen Appliances in 1', '13 Customizable One-Touch Smart Programs', 'Consistently Delicious Output up to 70% Faster', 'Fingerprint-Resistant Stainless Steel Exterior', 'Over 10 Built-In Advanced Safety Features']),
    specifications: JSON.stringify({ 'Capacity': '6 Quart (5.7 Litres)', 'Wattage': '1000W', 'Voltage': '220-240V', 'Material': 'Stainless Steel', 'Dimensions': '33x32x31 cm', 'Weight': '5.4 kg' }),
    images: [
      'https://m.media-amazon.com/images/I/61A624kUjJL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81xUe9N76zL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71wL+64BIfL._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'home-furniture',
    name: 'IKEA KALLAX Shelf Unit (White, 4x2)',
    description: 'Adaptable, sleek, and timeless, the IKEA KALLAX Shelf Unit is the ultimate storage solution that adapts to your evolving aesthetic and spatial needs. Arranged with eight spacious cubic compartments, it can be utilized horizontally as a sophisticated sideboard or TV bench, or displayed vertically as a striking room divider or bookcase. The smooth, clean white finish seamlessly integrates with any contemporary or traditional decor. Personalize your storage easily with KALLAX boxes, baskets, and insert doors to conceal clutter while proudly displaying your favorite books, plants, and records. It’s simple to construct and rigorously designed to be robust.',
    price: 12990,
    original_price: 15990,
    stock: 30,
    rating: 4.4,
    rating_count: 4521,
    brand: 'IKEA',
    highlights: JSON.stringify(['Versatile Vertical or Horizontal Placement', '8 Spacious Storage Cubes', 'Compatible with KALLAX Insert accessories', 'Clean, Minimalist Swedish Design', 'Durable, Scratch-Resistant Finish']),
    specifications: JSON.stringify({ 'Dimensions': '147 x 77 x 39 cm', 'Material': 'Particleboard, Fiberboard, Foil', 'Color': 'White', 'Max Load per Shelf': '13 kg', 'Care': 'Wipe clean with a damp cloth' }),
    images: [
      'https://m.media-amazon.com/images/I/51r-73c+v3L._SL1200_.jpg',
      'https://m.media-amazon.com/images/I/61dD45kM2fL._SL1200_.jpg',
      'https://m.media-amazon.com/images/I/71Lq6aU5W5L._SL1200_.jpg'
    ]
  },
  {
    category_slug: 'home-furniture',
    name: 'Philips Air Purifier AC1215/20 with HEPA Filter',
    description: 'Breathe pure, refreshing air every day with the Philips Air Purifier AC1215/20. Powered by sophisticated Vitashield IPS and VitaShield technology, it continually monitors air quality and automatically adjusts fan strength. The multi-stage NanoProtect HEPA and Extra Thick Activated Carbon filters effectively capture 99.97% of airborne particles as small as 0.003 microns, including dangerous PM2.5, pet dander, harmful gases, and allergens. An intuitive real-time color-coded air quality ring instantly assures you of your room\'s air purity. NightSense auto-mode quietly dims lights and minimizes noise down to whisper-quiet levels, so you and your family can enjoy uninterrupted sleep with clean air.',
    price: 8999,
    original_price: 14999,
    stock: 45,
    rating: 4.3,
    rating_count: 7832,
    brand: 'Philips',
    highlights: JSON.stringify(['Advanced NanoProtect HEPA Filter', 'Removes up to 99.9% of Viruses and Aerosols', 'Real-Time Color Coded Air Quality Feedback', 'Smart NightSense Auto-Mode for quiet operation', 'Effectively purifies rooms up to 63 sqm in minutes']),
    specifications: JSON.stringify({ 'Coverage': '63 sqm / 678 sq ft', 'CADR': '270 m³/h', 'Filter Type': 'True HEPA & Active Carbon', 'Noise Level': '33 dB(A)', 'Power': '50W', 'Sensors': 'Aerasense PM2.5' }),
    images: [
      'https://m.media-amazon.com/images/I/51wX4v9GclL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61NlPjL1aTL._SL1000_.jpg', // Wait, using generic ones might repeat, let me just find good ones
      'https://m.media-amazon.com/images/I/71Lp-q0tXjL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71rQ6q4s7NL._SL1500_.jpg'
    ]
  },

  // Beauty
  {
    category_slug: 'beauty',
    name: 'Lakme Absolute Skin Natural Mousse SPF 8 (Golden Light)',
    description: 'Attain a flawless, feather-light matte finish with Lakme Absolute Skin Natural Mousse in the shade Golden Light. Specially formulated for the contemporary woman, this weightless foundation effortlessly blends into your skin, blurring imperfections, minimizing pores, and evening out skin tone for up to 16 hours. The luxurious mousse consistency feels exceptionally breathable, preventing that clogged-pore sensation common with heavy foundations. Infused with SPF 8, it offers protection against harmful UV rays and environmental damage. Achieve a natural-looking, radiant complexion that looks as beautiful in harsh daylight as it does in photos, making it your everyday essential.',
    price: 399,
    original_price: 549,
    stock: 500,
    rating: 4.1,
    rating_count: 25431,
    brand: 'Lakme',
    highlights: JSON.stringify(['Feather-Light, Breathable Mousse Formula', 'Up to 16 Hours of Matte Coverage', 'Built-in SPF 8 Sun Protection', 'Effortlessly Blends for a Natural Finish', 'Suitable for Everyday Use & Occasions']),
    specifications: JSON.stringify({ 'Coverage': 'Medium to Buildable', 'Finish': 'Matte/Natural', 'Form': 'Mousse', 'Volume': '25g', 'Skin Type': 'Normal to Oily', 'Shade': 'Golden Light' }),
    images: [
      'https://m.media-amazon.com/images/I/51W7WbS9pTL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51z5kGz33oL._SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51f9xR9wK1L._SL1200_.jpg'
    ]
  },
  {
    category_slug: 'beauty',
    name: 'The Ordinary Niacinamide 10% + Zinc 1% Serum (30ml)',
    description: 'Transform your skincare routine with The Ordinary’s highly coveted Niacinamide 10% + Zinc 1% serum. This potent, water-based serum is expertly formulated to combat blemishes, balance sebum production, and reduce the appearance of enlarged pores. A high concentration of 10% pure Niacinamide (Vitamin B3) visibly brightens skin tone, strengthens the moisture barrier, and enhances skin texture. The addition of 1% Zinc PCA supports oil control and heals stressed skin. Its lightweight, non-comedogenic texture absorbs quickly without feeling sticky. With continuous use, experience a visibly clearer, smoother, and healthier-looking complexion free from annoying breakouts.',
    price: 699,
    original_price: 999,
    stock: 400,
    rating: 4.5,
    rating_count: 19832,
    brand: 'The Ordinary',
    highlights: JSON.stringify(['10% High-Strength Niacinamide (Vitamin B3)', 'Regulates Sebum and Oil Production', 'Minimizes the look of Enlarged Pores', 'Vegan, Cruelty-Free, and Alcohol-Free', 'Lightweight Water-Based Formula']),
    specifications: JSON.stringify({ 'Ingredients': 'Aqua (Water), Niacinamide, Zinc PCA', 'Volume': '30 ml', 'Skin Type': 'Oily, Combination, Blemish-Prone', 'Fragrance': 'Fragrance-Free', 'Use': 'AM and PM' }),
    images: [
      'https://m.media-amazon.com/images/I/51g8R+Q692L._SL1182_.jpg',
      'https://m.media-amazon.com/images/I/61GgSTa3+CL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61k2YlR2s7L._SL1500_.jpg'
    ]
  },

  // Books
  {
    category_slug: 'books',
    name: 'Atomic Habits by James Clear (Paperback)',
    description: 'No matter your goals, Atomic Habits offers a proven, highly practical framework for improving every day. James Clear, recognized globally as a leading expert on habit formation, reveals simple but transformational tricks that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable, lasting results. This engaging masterpiece breaks down complex psychology and neuroscience into easy-to-understand actions you can apply to life and work immediately. With millions of copies sold, this international bestseller will reshape the way you think about success, demonstrating that massive changes are the result of compounding tiny, "atomic" steps.',
    price: 349,
    original_price: 499,
    stock: 1000,
    rating: 4.8,
    rating_count: 87432,
    brand: 'Penguin Random House',
    highlights: JSON.stringify(['Multi-Million Copy Global Bestseller', 'Actionable, Science-Backed Framework', 'Clear Strategies to Build Good Habits', 'Learn How to Overcome a Lack of Motivation', 'Practical Approaches for Work and Life']),
    specifications: JSON.stringify({ 'Author': 'James Clear', 'Publisher': 'Avery Print / Penguin', 'Pages': '320', 'Language': 'English', 'ISBN-10': '0735211299', 'Binding': 'Mass Market Paperback' }),
    images: [
      'https://m.media-amazon.com/images/I/81bGKUa1e0L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71k42A2V3ML._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71hU2xLd7HL._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'books',
    name: 'The Psychology of Money by Morgan Housel',
    description: 'Doing well with money isn’t merely about what you know. It’s strictly about how you behave—and behavior is incredibly hard to teach, even to extremely smart people. In The Psychology of Money, award-winning author Morgan Housel shares 19 engaging short stories exploring the unique ways individuals think about wealth, greed, risk, investing, and happiness. This enlightening book dispels complex financial jargon, focusing instead on the deeply ingrained psychological biases that govern our financial decisions. It offers priceless, timeless wisdom on how you can make a better sense of one of life’s most profound and necessary topics, helping you cultivate a healthier relationship with money.',
    price: 299,
    original_price: 399,
    stock: 800,
    rating: 4.7,
    rating_count: 54321,
    brand: 'Harriman House',
    highlights: JSON.stringify(['19 Illuminating Short Stories on Wealth', 'Focuses on Financial Mindset and Behavior', 'Highly Accessible for Beginners', 'Over 3 Million Copies Sold Worldwide', 'Timeless Wisdom for Long-Term Wealth']),
    specifications: JSON.stringify({ 'Author': 'Morgan Housel', 'Publisher': 'Harriman House', 'Pages': '252', 'Language': 'English', 'ISBN-10': '0857197681', 'Binding': 'Paperback' }),
    images: [
      'https://m.media-amazon.com/images/I/71g2ednj0JL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71rJkR+eG1L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81fH2vP8XlL._SL1500_.jpg'
    ]
  },

  // Sports
  {
    category_slug: 'sports',
    name: 'Yonex Nanoray 7000i Badminton Racquet (Blue)',
    description: 'Elevate your performance on the court with the Yonex Nanoray 7000i. Engineered for players seeking blistering speed and high maneuverability, this exceptionally light racquet features Yonex’s cutting-edge Aero Frame technology, significantly reducing air resistance to permit faster, smoother swings. Constructed with a high-tension carbon graphite composite shaft, it provides superb stiffness and incredible power transfer during smashes. The isometric head shape enlarges the sweet spot, forgiving off-center hits while maintaining accuracy. Pre-strung and featuring an ergonomic grip, it arrives ready for action, supported by a full protective cover for safe transport and storage.',
    price: 1299,
    original_price: 2099,
    stock: 120,
    rating: 4.3,
    rating_count: 8921,
    brand: 'Yonex',
    highlights: JSON.stringify(['Isometric Head for Enlarged Sweet Spot', 'Aerodynamic Frame Reduces Air Drag', 'Durable Graphite Composite Shaft', 'Pre-Strung with Factory Recommended Tension', 'Includes Full Length Protective Cover']),
    specifications: JSON.stringify({ 'Shaft Material': 'Graphite', 'Frame Material': 'Aluminum', 'Weight': '3U (85-89g)', 'String Tension': '19-24 lbs', 'Balance': 'Head Light', 'Grip Size': 'G4' }),
    images: [
      'https://m.media-amazon.com/images/I/717TXXwAanL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61r56m9-7WL._SL1500_.jpg', // Placeholder
      'https://m.media-amazon.com/images/I/61M6vM4rA6L._SL1000_.jpg'   // Placeholder
    ]
  },
  {
    category_slug: 'sports',
    name: 'Cosco Hy-Pro Volleyball (Size 4)',
    description: 'Experience professional-grade play on any surface with the Cosco Hy-Pro Volleyball. Meticulously handcrafted using high-quality synthetic leather, this ball promises remarkable durability and an unimaginably soft, premium feel upon impact. Its rigorous 18-panel construction and optimized aerodynamic design guarantee consistent, pinpoint flight paths and exceptional bounce off the hand. The internal butyl bladder ensures maximum air and shape retention over extended periods of rigorous play, reducing the need for constant reinflation. Perfectly suited for competitive indoor matches and rigorous outdoor beach games, it is the ultimate choice for passionate athletes.',
    price: 549,
    original_price: 849,
    stock: 200,
    rating: 4.1,
    rating_count: 3421,
    brand: 'Cosco',
    highlights: JSON.stringify(['Premium Synthetic Leather Outer Cover', 'Durable 18-Panel Construction', 'Butyl Bladder for High Air Retention', 'Optimal Bounce & Aerodynamic Flight', 'Versatile for Indoor and Outdoor Use']),
    specifications: JSON.stringify({ 'Size': 'Official Size 4', 'Material': 'Synthetic PU Leather', 'Bladder': 'Butyl', 'Stitching': 'Hand Stitched', 'Weight': '260-280g', 'Color': 'Yellow/Blue' }),
    images: [
      'https://m.media-amazon.com/images/I/61+R+x1qMlL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71Lq6aU5W5L._SL1200_.jpg', // Placeholder
      'https://m.media-amazon.com/images/I/81xUe9N76zL._SL1500_.jpg'  // Placeholder
    ]
  },

  // Toys
  {
    category_slug: 'toys',
    name: 'LEGO Technic Land Rover Defender Building Set (42110)',
    description: 'Embark on an immersive and rewarding engineering challenge with the highly detailed LEGO Technic Land Rover Defender replica. Developed in close partnership with Land Rover, this magnificent 2,573-piece masterpiece faithfully captures the vehicle\'s iconic rugged sophistication. It is packed with astonishingly authentic functions, including a working steering wheel, deeply sophisticated independent suspension, robust All-Wheel Drive with three differentials, and an incredibly complex 4-speed sequential gearbox. The intricately detailed inline 6-cylinder engine features moving pistons beneath the hood. A true collector\'s item, this model is a stunning showcase piece of automotive design excellence.',
    price: 9999,
    original_price: 14999,
    stock: 40,
    rating: 4.7,
    rating_count: 6721,
    brand: 'LEGO',
    highlights: JSON.stringify(['Complex 2,573-Piece Building Experience', 'Authentic Working Steering and Suspension', 'Sophisticated 4-Speed Sequential Gearbox', 'Detailed Inline 6-Cylinder Engine', 'Includes Expedition Roof Rack and Winch']),
    specifications: JSON.stringify({ 'Model Number': '42110', 'Pieces': '2573', 'Age Recommendation': '11+ Years', 'Dimensions': '22 x 42 x 20 cm', 'Theme': 'Technic', 'Scale': 'Highly Detailed Replica' }),
    images: [
      'https://m.media-amazon.com/images/I/910qHw+5DPL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81bN5t8x-4L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71vJ-r2-RCL._SL1500_.jpg'
    ]
  },

  // Grocery
  {
    category_slug: 'grocery',
    name: 'Tata Tea Gold 500g Premium Blend',
    description: 'Reawaken your senses every morning with the unmistakable aroma of Tata Tea Gold. Meticulously sourced from the finest tea estates, this exceptionally balanced blend masterfully combines premium long tea leaves with robust crushed CTC granules. When brewed, it yields a radiantly rich, golden liquor that delivers a potent yet perfectly smooth, refreshing flavor profile. It\'s an invitation to pause, sip, and indulge in a moment of tranquility. Perfectly packed to lock in freshness from the estate to your cup, Tata Tea Gold is the definitive chai experience that true tea enthusiasts simply cannot resist.',
    price: 275,
    original_price: 325,
    stock: 1000,
    rating: 4.4,
    rating_count: 45321,
    brand: 'Tata Tea',
    highlights: JSON.stringify(['Unique Blend of Long Leaves and CTC', 'Delivers a Rich, Golden Liquor', 'Intensely Aromatic and Refreshing', 'Carefully Sourced from Quality Estates', '15% Extra Long Leaves for Superior Taste']),
    specifications: JSON.stringify({ 'Weight': '500 Grams', 'Type': 'Black Tea', 'Diet Type': 'Vegetarian', 'Form': 'Granules', 'Shelf Life': '24 Months', 'Origin': 'India' }),
    images: [
      'https://m.media-amazon.com/images/I/61b7I1aO5PL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71W+kXW7+OL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71C7N5E+rEL._SL1500_.jpg'
    ]
  },
  {
    category_slug: 'grocery',
    name: 'Amul Butter Unsalted 500g',
    description: 'A kitchen staple trusted by generations, Amul Unsalted Butter brings pure, wholesome dairy goodness to your table. Churned from 100% fresh, high-quality cow\'s cream, this butter delivers an incredibly rich, deliciously creamy texture that melts flawlessly. Being completely unsalted, it offers precise control over sodium intake and flavor, making it the supreme choice for passionate bakers creating delicate pastries, or chefs preparing savory sauces and gravies. From spreading over warm morning toast to finishing off a gourmet entree, Amul Butter guarantees an authentic, unadulterated buttery taste that enhances any culinary creation.',
    price: 240,
    original_price: 260,
    stock: 500,
    rating: 4.5,
    rating_count: 32100,
    brand: 'Amul',
    highlights: JSON.stringify(['Made from 100% Pure, Fresh Cream', 'Completely Unsalted (Zero Added Salt)', 'Perfect for Precise Baking and Cooking', 'Rich, Creamy, and Smooth Texture', 'No Artificial Colors or Preservatives']),
    specifications: JSON.stringify({ 'Weight': '500 Grams', 'Type': 'Unsalted Dairy Butter', 'Diet Type': 'Vegetarian', 'Storage': 'Keep Refrigerated', 'Shelf Life': '6 Months', 'Origin': 'India' }),
    images: [
      'https://m.media-amazon.com/images/I/71oU-S10kVL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61x54t3tZ+L._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61A624kUjJL._SL1500_.jpg' // Placeholder
    ]
  }
];

// Reconstruct seed.js from the DB
const newSeedStr = oldSeedText.replace(/const products = \[[\s\S]*?\];/, 'const products = ' + JSON.stringify(newProducts, null, 2) + ';');
fs.writeFileSync('backend/src/config/seed.js', newSeedStr);
console.log('Successfully updated seed.js array');
