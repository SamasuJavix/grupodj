export interface Product {
    id: string;
    name: string;
    title: string;
    price: number;
    description: string;
    category: string;
    subcategory?: string;
    stock: number;
    images: string[];
    slug: string;
    badge?: string;
    discount?: number;
    specs?: { label: string; value: string }[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "MacBook Pro 16 M3 Max",
        title: "MacBook Pro 16 M3 Max",
        price: 14999,
        description: "La MacBook Pro más potente de la historia. Con el chip M3 Max ultrarrápido, una arquitectura térmica avanzada y una impresionante pantalla Liquid Retina XDR, está diseñada para quienes exigen lo mejor en rendimiento y portabilidad.",
        category: "Computo",
        subcategory: "laptops",
        stock: 5,
        images: [
            "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "macbook-pro-16-m3-max",
        badge: "Premium",
        discount: 5,
        specs: [
            { label: "Procesador", value: "Apple M3 Max" },
            { label: "Memoria", value: "32GB Unificada" },
            { label: "Almacenamiento", value: "1TB SSD" },
            { label: "Pantalla", value: "16.2 pulgadas XDR" }
        ]
    },
    {
        id: "2",
        name: "Audífonos Sony WH-1000XM5",
        title: "Audífonos Sony WH-1000XM5",
        price: 1599,
        description: "Cancelación de ruido líder en la industria, calidad de sonido excepcional y llamadas manos libres nítidas. Los audífonos WH-1000XM5 redefinen las reglas para una escucha sin distracciones.",
        category: "Audio",
        stock: 12,
        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "sony-wh-1000xm5",
        badge: "Más Vendido",
        discount: 10,
        specs: [
            { label: "Batería", value: "Hasta 30 horas" },
            { label: "Cancelación de Ruido", value: "Líder en la industria" },
            { label: "Bluetooth", value: "v5.2" },
            { label: "Peso", value: "250g" }
        ]
    },
    {
        id: "3",
        name: "iPhone 15 Pro Max",
        title: "iPhone 15 Pro Max",
        price: 5499,
        description: "Forjado en titanio. Con el revolucionario chip A17 Pro, un botón de Acción personalizable y el sistema de cámaras para iPhone más potente hasta la fecha. Experimenta el siguiente nivel de tecnología móvil.",
        category: "Celulares",
        subcategory: "iphone",
        stock: 0,
        images: [
            "https://i.blogs.es/f15f0b/img_2033/650_1200.jpeg",
            "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "iphone-15-pro-max",
        badge: "Nuevo",
        discount: 0,
        specs: [
            { label: "Chip", value: "A17 Pro" },
            { label: "Cámara Principal", value: "48MP" },
            { label: "Material", value: "Titanio" },
            { label: "Pantalla", value: "6.7 pulgadas" }
        ]
    },
    {
        id: "4",
        name: "Mouse Logitech MX Master 3S",
        title: "Mouse Logitech MX Master 3S",
        price: 399,
        description: "Un ícono, remasterizado. Conoce el MX Master 3S, un mouse icónico remasterizado para máxima sensibilidad, rendimiento y fluidez. Siente cada momento de tu flujo de trabajo con aún más precisión y rendimiento.",
        category: "Accesorios",
        stock: 50,
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
            "https://www.mastecnologia.com.ar/images/productos/17101.png"
        ],
        slug: "logitech-mx-master-3s",
        badge: "Esencial",
        specs: [
            { label: "DPI", value: "8000" },
            { label: "Botones", value: "7 Programables" },
            { label: "Batería", value: "Recargable" },
            { label: "Conectividad", value: "Logi Bolt / BT" }
        ]
    },
    {
        id: "5",
        name: "iPad Pro M2",
        title: "iPad Pro M2",
        price: 3199,
        description: "Rendimiento asombroso. Pantallas increíblemente avanzadas. Conectividad inalámbrica ultrarrápida. Funciones de Apple Pencil de nivel superior. Potentes novedades en iPadOS. La experiencia iPad definitiva.",
        category: "Computo",
        subcategory: "tablets",
        stock: 15,
        images: [
            "https://i.guim.co.uk/img/media/23b25aa93e573bc0b016c0e6e9233bc51da92c54/0_240_5261_3156/master/5261.jpg?width=1200&quality=85&auto=format&fit=max&s=5f0115e164644ebfdbc3c86ee86c163b",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQonjUvhTVx33qjjjCrRp68MDRAlt_1uqA9YA&s"
        ],
        slug: "ipad-pro-m2",
        badge: "Pro",
        specs: [
            { label: "Chip", value: "Apple M2" },
            { label: "Pantalla", value: "Liquid Retina" },
            { label: "Cámara", value: "12MP Ultra Gran Angular" },
            { label: "Almacenamiento", value: "256GB" }
        ]
    },
    {
        id: "6",
        name: "Laptop Dell XPS 15",
        title: "Laptop Dell XPS 15",
        price: 7599,
        description: "Laptop de alto rendimiento con una impresionante pantalla 4K OLED y una calidad de construcción premium.",
        category: "Computo",
        subcategory: "laptops",
        stock: 10,
        images: [
            "https://images-cdn.ubuy.qa/634ea45745ed0860dc58d75b-dell-xps-15-9510-laptop-2021.jpg",
        ],
        slug: "dell-xps-15",
        specs: [
            { label: "Procesador", value: "Intel Core i9" },
            { label: "RAM", value: "32GB" },
            { label: "Pantalla", value: "15.6 pulgadas OLED" }
        ]
    },
    {
        id: "7",
        name: "MacBook Air 15",
        title: "MacBook Air 15",
        price: 5199,
        description: "Imposiblemente delgada e increíblemente rápida. La MacBook Air de 15 pulgadas te da más espacio para lo que amas con una espaciosa pantalla Liquid Retina.",
        category: "Computo",
        subcategory: "laptops",
        stock: 25,
        images: [
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "macbook-air-15",
        badge: "Nuevo",
        specs: [
            { label: "Chip", value: "M2" },
            { label: "Batería", value: "18 Horas" },
            { label: "Peso", value: "1.5 kg" }
        ]
    },
    {
        id: "8",
        name: "Laptop ASUS ROG Zephyrus G14",
        title: "ASUS ROG Zephyrus G14",
        price: 6499,
        description: "Potente rendimiento para juegos en un chasis compacto. Cuenta con los últimos procesadores Ryzen y gráficos RTX para jugar en cualquier lugar.",
        category: "Computo",
        subcategory: "laptops",
        stock: 8,
        images: [
            "https://www.cnet.com/a/img/resize/69c350f19a0bd245ab8f60a98e456fa9dc67ee42/hub/2024/02/05/e716f8f8-a7a4-418c-9b14-0b210d9dfc72/asus-rog-zephyrus-g14-2024-5409.jpg?auto=webp&fit=crop&height=1200&width=1200",
        ],
        slug: "asus-rog-zephyrus-g14",
        badge: "Gaming",
        specs: [
            { label: "GPU", value: "NVIDIA RTX 4060" },
            { label: "CPU", value: "AMD Ryzen 9" },
            { label: "Pantalla", value: "120Hz" }
        ]
    },
    {
        id: "9",
        name: "Samsung Galaxy S24 Ultra",
        title: "Samsung Galaxy S24 Ultra",
        price: 5299,
        description: "Desata tu creatividad, productividad y posibilidades. Con un S Pen integrado y el procesador más potente hasta la fecha.",
        category: "Celulares",
        subcategory: "android",
        stock: 20,
        images: [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "samsung-galaxy-s24-ultra",
        badge: "IA Avanzada",
        specs: [
            { label: "Cámara", value: "200MP" },
            { label: "Zoom Espacial", value: "100x" },
            { label: "S Pen", value: "Incluido" }
        ]
    },
    {
        id: "10",
        name: "Google Pixel 8 Pro",
        title: "Google Pixel 8 Pro",
        price: 4099,
        description: "El teléfono todo-profesional diseñado por Google. Tiene un marco de aluminio pulido y un vidrio trasero mate, y viene en colores elegantes.",
        category: "Celulares",
        subcategory: "android",
        stock: 15,
        images: [
            "https://lh3.googleusercontent.com/22AC6Qcb5-4qN6QJTkBzGK2N5kS5AZyuss9AcAQzAuxjHqGz3VfI5-MSXsKDzuUuePoqHAmyAFyewt9CdNyw3oQikUDY7dTSmyDsVPo=rw-e365-w842-v1",
            "https://tecnopolis.com.bo/cdn/shop/files/8-PRO.png?v=1763581431"
        ],
        slug: "google-pixel-8-pro",
        badge: "El más listo",
        specs: [
            { label: "Chip", value: "Tensor G3" },
            { label: "SO", value: "Android 14" },
            { label: "IA", value: "Gemini Nano" }
        ]
    },
    {
        id: "11",
        name: "iPhone 14",
        title: "iPhone 14",
        price: 3299,
        description: "Un verdadero portento. Duración de batería impresionante, construcción duradera y un sistema de cámaras que toma fotos asombrosas con cualquier luz.",
        category: "Celulares",
        subcategory: "iphone",
        stock: 30,
        images: [
            "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80",
        ],
        slug: "iphone-14",
        specs: [
            { label: "Chip", value: "A15 Bionic" },
            { label: "Pantalla", value: "6.1 Super Retina" },
            { label: "Seguridad", value: "Detección de Choques" }
        ]
    },
    {
        id: "12",
        name: "AirPods Max",
        title: "AirPods Max",
        price: 2499,
        description: "Un equilibrio perfecto entre audio de alta fidelidad y la magia sin esfuerzo de los AirPods.",
        category: "Audio",
        stock: 10,
        images: [
            "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "airpods-max",
        badge: "Audio Premium",
        specs: [
            { label: "Driver", value: "Dinámico" },
            { label: "ANC", value: "Activa" },
            { label: "Audio Espacial", value: "Seguimiento de cabeza" }
        ]
    },
    {
        id: "13",
        name: "Bose QuietComfort Ultra",
        title: "Bose QuietComfort Ultra",
        price: 1899,
        description: "Cancelación de ruido de clase mundial, más silenciosa que nunca. Audio espacial revolucionario para una escucha más inmersiva.",
        category: "Audio",
        stock: 18,
        images: [
            "https://m.media-amazon.com/images/I/51ZR4lyxBHL.jpg",
        ],
        slug: "bose-qc-ultra",
        specs: [
            { label: "Batería", value: "24 Horas" },
            { label: "Modos", value: "Silencioso/Atento" },
            { label: "Comodidad", value: "Superior" }
        ]
    },
    {
        id: "14",
        name: "Parlante Sonos Era 100",
        title: "Parlante Sonos Era 100",
        price: 1099,
        description: "Acústica de última generación y nuevos niveles de conectividad transforman cualquier habitación con un sonido estéreo afinado y bajos ricos.",
        category: "Audio",
        stock: 22,
        images: [
            "https://culturageek.com.ar/wp-content/uploads/2024/12/566898-Era-100-Pro_Mount-Ceiling_Black-309023-original-1733603775_11zon.webp",
        ],
        slug: "sonos-era-100",
        specs: [
            { label: "Tipo", value: "Parlante Inteligente" },
            { label: "Asistente de Voz", value: "Alexa Integrado" },
            { label: "Conectividad", value: "WiFi/BT" }
        ]
    },
    {
        id: "15",
        name: "Teclado Keychron Q1 Pro",
        title: "Teclado Keychron Q1 Pro",
        price: 899,
        description: "Un teclado mecánico totalmente personalizable con soporte QMK/VIA y un cuerpo de aluminio premium.",
        category: "Computo",
        subcategory: "teclados",
        stock: 30,
        images: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
            "https://i.ytimg.com/vi/URjj7-QghHs/maxresdefault.jpg"
        ],
        slug: "keychron-q1-pro",
        badge: "Mecánico",
        specs: [
            { label: "Formato", value: "75%" },
            { label: "Cuerpo", value: "Aluminio" },
            { label: "Switches", value: "Intercambiables" }
        ]
    },
    {
        id: "16",
        name: "Apple Magic Trackpad",
        title: "Apple Magic Trackpad",
        price: 549,
        description: "Inalámbrico y recargable, incluye la gama completa de gestos Multi-Touch y la tecnología Force Touch.",
        category: "Accesorios",
        stock: 40,
        images: [
            "https://images.unsplash.com/photo-1522204538344-922f76ecc041?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "magic-trackpad",
        specs: [
            { label: "Superficie", value: "Vidrio" },
            { label: "Conexión", value: "Bluetooth" },
            { label: "Color", value: "Blanco/Negro" }
        ]
    },
    {
        id: "17",
        name: "SSD Samsung T7 Shield 2TB",
        title: "SSD Samsung T7 Shield 2TB",
        price: 679,
        description: "Durabilidad robusta. Velocidades rápidas. El T7 Shield te brinda un rendimiento superior sobre la marcha, incluso en condiciones ambientales desafiantes.",
        category: "Accesorios",
        stock: 100,
        images: [
            "https://http2.mlstatic.com/D_NQ_NP_646728-CBT96610611509_102025-O.webp",
        ],
        slug: "samsung-t7-shield",
        specs: [
            { label: "Velocidad Lectura", value: "1050MB/s" },
            { label: "Resistencia", value: "IP65 Agua/Polvo" },
            { label: "Puerto", value: "USB-C 3.2 Gen 2" }
        ]
    },
    {
        id: "18",
        name: "Monitor Dell UltraSharp 27",
        title: "Monitor Dell UltraSharp 27",
        price: 2199,
        description: "Experimenta detalles cautivadores y colores realistas en este monitor QHD de 27 pulgadas con InfinityEdge.",
        category: "Monitores",
        stock: 12,
        images: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        ],
        slug: "dell-ultrasharp-27",
        specs: [
            { label: "Resolución", value: "2560x1440 QHD" },
            { label: "Panel", value: "IPS Black" },
            { label: "Puertos", value: "Hub USB-C" }
        ]
    },
    {
        id: "19",
        name: "Cámara Fujifilm X100V",
        title: "Cámara Fujifilm X100V",
        price: 6499,
        description: "La quinta iteración de la serie X100 de Fujifilm, que combina un diseño clásico basado en diales con la tecnología más avanzada.",
        category: "Accesorios",
        stock: 3,
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        ],
        slug: "fujifilm-x100v",
        badge: "Limitado",
        specs: [
            { label: "Sensor", value: "APS-C X-Trans 4" },
            { label: "Lente", value: "23mm F2 (Equiv. 35mm)" },
            { label: "Video", value: "4K/30p" }
        ]
    },
    {
        id: "20",
        name: "TV LG C3 OLED 42",
        title: "TV LG C3 OLED 42",
        price: 4399,
        description: "El avanzado LG OLED evo Serie C es mejor que nunca. Potenciado por el procesador a9 AI Gen6 de última generación.",
        category: "Monitores",
        stock: 6,
        images: [
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
        ],
        slug: "lg-c3-oled-42",
        badge: "OLED evo",
        specs: [
            { label: "Tipo de Panel", value: "OLED" },
            { label: "Tasa de Refresco", value: "120Hz" },
            { label: "HDR", value: "Dolby Vision, HDR10" }
        ]
    },
    {
        id: "21",
        name: "Procesador Intel Core i9-13900K",
        title: "Procesador Intel Core i9-13900K",
        price: 2899,
        description: "El procesador para computadoras de escritorio más rápido del mundo. Para gaming y creación de contenido de élite.",
        category: "Componentes",
        subcategory: "procesadores",
        stock: 15,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_31976.webp"],
        slug: "intel-core-i9-13900k",
        badge: "Extremo",
        specs: [
            { label: "Núcleos", value: "24 (8 P-cores + 16 E-cores)" },
            { label: "Hilos", value: "32" },
            { label: "Frecuencia Turbo", value: "Hasta 5.8 GHz" },
            { label: "Socket", value: "LGA 1700" }
        ]
    },
    {
        id: "22",
        name: "Procesador AMD Ryzen 9 7950X",
        title: "Procesador AMD Ryzen 9 7950X",
        price: 2799,
        description: "El procesador de escritorio definitivo para jugadores y creadores. 16 núcleos y 32 hilos de puro rendimiento.",
        category: "Componentes",
        subcategory: "procesadores",
        stock: 18,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_31362.webp"],
        slug: "amd-ryzen-9-7950x",
        badge: "Alto Rendimiento",
        specs: [
            { label: "Núcleos", value: "16" },
            { label: "Hilos", value: "32" },
            { label: "Frecuencia Boost", value: "Hasta 5.7 GHz" },
            { label: "Socket", value: "AM5" }
        ]
    },
    {
        id: "23",
        name: "Tarjeta de Video NVIDIA GeForce RTX 4090",
        title: "Tarjeta de Video NVIDIA GeForce RTX 4090",
        price: 9999,
        description: "El máximo rendimiento para gaming y creación. Potenciada por la arquitectura Ada Lovelace con DLSS 3.",
        category: "Componentes",
        subcategory: "tarjetas-de-video",
        stock: 4,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_32876.webp"],
        slug: "nvidia-geforce-rtx-4090",
        badge: "Insuperable",
        specs: [
            { label: "Memoria", value: "24GB GDDR6X" },
            { label: "Núcleos CUDA", value: "16384" },
            { label: "Interfaz", value: "PCIe 4.0" },
            { label: "Consumo", value: "450W" }
        ]
    },
    {
        id: "24",
        name: "Tarjeta de Video AMD Radeon RX 7900 XTX",
        title: "Tarjeta de Video AMD Radeon RX 7900 XTX",
        price: 5499,
        description: "Rendimiento 4K y más allá, construida sobre la revolucionaria arquitectura AMD RDNA 3.",
        category: "Componentes",
        subcategory: "tarjetas-de-video",
        stock: 7,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_32039.webp"],
        slug: "amd-radeon-rx-7900-xtx",
        specs: [
            { label: "Memoria", value: "24GB GDDR6" },
            { label: "Unidades de Cómputo", value: "96" },
            { label: "Interfaz", value: "PCIe 4.0" },
            { label: "Consumo", value: "355W" }
        ]
    },
    {
        id: "25",
        name: "Placa Madre ASUS ROG MAXIMUS Z790 HERO",
        title: "Placa Madre ASUS ROG MAXIMUS Z790 HERO",
        price: 3499,
        description: "Diseñada para los entusiastas que buscan lo mejor. Potencia, refrigeración y conectividad de última generación para procesadores Intel Core de 13ª Gen.",
        category: "Componentes",
        subcategory: "placas-madre",
        stock: 9,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_31575.webp"],
        slug: "asus-rog-maximus-z790-hero",
        badge: "Entusiasta",
        specs: [
            { label: "Socket", value: "LGA 1700" },
            { label: "Chipset", value: "Intel Z790" },
            { label: "Formato", value: "ATX" },
            { label: "Memoria", value: "DDR5" }
        ]
    },
    {
        id: "26",
        name: "Memoria RAM Corsair Vengeance DDR5 32GB (2x16GB) 6000MHz",
        title: "Memoria RAM Corsair Vengeance DDR5 32GB 6000MHz",
        price: 799,
        description: "Optimiza tu sistema con la velocidad y el rendimiento de la memoria DDR5. Perfecta para gaming y aplicaciones exigentes.",
        category: "Componentes",
        subcategory: "memorias-ram",
        stock: 25,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_29891.webp"],
        slug: "corsair-vengeance-ddr5-32gb",
        specs: [
            { label: "Capacidad", value: "32GB (2 x 16GB)" },
            { label: "Tipo", value: "DDR5" },
            { label: "Velocidad", value: "6000MHz" },
            { label: "Latencia", value: "CL36" }
        ]
    },
    {
        id: "27",
        name: "SSD NVMe Samsung 980 Pro 2TB",
        title: "SSD NVMe Samsung 980 Pro 2TB",
        price: 1299,
        description: "Experimenta velocidades de lectura/escritura de nivel profesional para gaming, edición de video y más. Interfaz PCIe 4.0.",
        category: "Componentes",
        subcategory: "almacenamiento",
        stock: 30,
        images: ["https://www.deltron.com.pe/modulos/productos/items/postsql/foto_1_25409.webp"],
        slug: "samsung-980-pro-2tb",
        badge: "Ultra Rápido",
        specs: [
            { label: "Capacidad", value: "2TB" },
            { label: "Interfaz", value: "NVMe PCIe 4.0" },
            { label: "Vel. Lectura", value: "Hasta 7,000 MB/s" },
            { label: "Formato", value: "M.2 2280" }
        ]
    }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getRelatedProducts = (category: string, currentSlug: string) =>
    products.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 4);
