# Grupo DJ - E-commerce de Tecnología 🚀

Plataforma de comercio electrónico moderna, rápida y adaptable construida con **Astro 6**, **React 19**, **Tailwind CSS v4** y **DaisyUI v5**. Diseñada para ofrecer una experiencia de usuario fluida, elegante y optimizada.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue y Optimización en Hostinger (NPROC y Prisma)](#-despliegue-y-optimización-en-hostinger-nproc-y-prisma)
- [Puntos de Mejora y Estado del Proyecto](#-puntos-de-mejora-y-estado-del-proyecto)

---

## ✨ Características

- 🛒 **Carrito de Compras Persistente**: Gestión de carrito mediante `Nanostores` almacenado en `localStorage`, con control dinámico de stock y cálculo de descuentos.
- ❤️ **Lista de Favoritos**: Guardado de productos preferidos de forma persistente.
- 📱 **Diseño 100% Responsivo**: Adaptado para móviles, tablets y computadoras de escritorio.
- 🎨 **Estilizado Moderno**: Basado en Tailwind CSS v4, DaisyUI v5 y paleta personalizada (`javicho`).
- 🖼️ **Carrusel de Imágenes**: Presentación de productos con slider interactivo utilizando `Swiper`.
- 🔔 **Notificaciones en Tiempo Real**: Notificaciones dinámicas e integradas con `Sonner`.
- 🔍 **Filtros por Categoría y Subcategoría**: Navegación por productos según categorías (Cómputo, Celulares, Audio, Accesorios, Monitores).

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología |
| :--- | :--- |
| **Framework Principal** | [Astro v6.0](https://astro.build/) |
| **UI / Componentes** | [React v19](https://react.dev/) |
| **Estilos CSS** | [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI v5](https://daisyui.com/) |
| **Estado Global** | [Nanostores](https://github.com/nanostores/nanostores) (`@nanostores/persistent`) |
| **Iconos** | [Iconify / Astro-Icon](https://github.com/natemoo-re/astro-icon) (`lucide`, `mdi`) |
| **Notificaciones** | [Sonner](https://sonner.emilkowal.ski/) |
| **Sliders / Carruseles** | [Swiper v12](https://swiperjs.com/) |
| **Adaptador de Despliegue** | `@astrojs/vercel` |

---

## 📁 Estructura del Proyecto

```text
grupodj/
├── public/                # Archivos estáticos e imágenes públicas
├── src/
│   ├── components/        # Componentes Astro y React organizados por dominio
│   │   ├── about/         # Componentes de la página Nosotros
│   │   ├── blog/          # Componentes del módulo de Blog
│   │   ├── cart/          # Drawer del carrito de compras
│   │   ├── categories/    # Cabeceras y filtros de categorías
│   │   ├── checkout/      # Formulario y resumen de compra
│   │   ├── contact/       # Formulario e información de contacto
│   │   ├── favorites/     # Lista interactiva de favoritos
│   │   ├── footer/        # Pie de página
│   │   ├── home/          # Banner principal y secciones destacadas
│   │   ├── navbar/        # Navegación principal y enlaces
│   │   ├── products/      # Tarjetas, galerías e información de producto
│   │   └── ui/            # Componentes UI reutilizables (Breadcrumbs, Toaster, etc.)
│   ├── data/              # Datos estáticos (productos, categorías, blog)
│   ├── layouts/           # Plantillas base (Layout.astro)
│   ├── pages/             # Rutas y páginas de la aplicación
│   ├── store/             # Tiendas de estado global (cartStore, favoriteStore)
│   └── styles/            # Estilos globales y configuración de Tailwind/DaisyUI
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias y scripts
└── tsconfig.json          # Configuración de TypeScript
```

---

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/SamasuJavix/grupodj.git
   cd grupodj
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

---

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor local de desarrollo con hot-reloading.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Vista previa local del build de producción.
- `npm run astro`: Ejecuta comandos de la CLI de Astro.

---

## ☁️ Despliegue y Optimización en Hostinger (NPROC y Prisma)

El proyecto está configurado para ejecutarse en modo SSR sobre **Hostinger Business** utilizando el adaptador `@astrojs/node` en modo `standalone` con el punto de entrada [server.js](file:///C:/Users/Javier/Downloads/PROYECTOS%20TRABAJO/GRUPO%20DJ/PAGINA/grupodj-ultimo/grupodj/server.js).

### ⚙️ Configuración en hPanel (Hostinger Node.js)
1. **Punto de inicio (Startup file):** `server.js`
2. **Directorio raíz de la aplicación:** Raíz del repositorio donde se encuentra `package.json`.
3. **Versión de Node.js:** Node.js 20.x o superior.
4. **Comando de compilación:** `npm run build`

### 🛡️ Mitigación de Límites de Recursos (NPROC en CloudLinux)
Los planes compartidos de Hostinger aplican una jaula de recursos (CloudLinux LVE) con un límite estricto de **120 procesos/hilos (NPROC)**. Para evitar pánicos del motor de consultas de Prisma (`Query engine exited with code 101 / timer has gone away`) y la acumulación de workers:

1. **Restricción de Hilos de Prisma y Tokio:**
   Se fija la concurrencia a 1 hilo de trabajo por worker mediante las variables:
   ```env
   PRISMA_QUERY_ENGINE_NUM_THREADS=1
   TOKIO_WORKER_THREADS=1
   ```
   (Inyectadas en `server.js`, `src/lib/prisma.ts` y `.env`).

2. **Límite en el Connection Pool de MySQL:**
   En la cadena `DATABASE_URL`, se limita el pool a un máximo de 3 conexiones con timeout de 10s:
   ```env
   DATABASE_URL="mysql://usuario:password@localhost:3306/nombre_db?connection_limit=3&pool_timeout=10"
   ```

3. **Instancia Singleton de Prisma Blindada:**
   En [src/lib/prisma.ts](file:///C:/Users/Javier/Downloads/PROYECTOS%20TRABAJO/GRUPO%20DJ/PAGINA/grupodj-ultimo/grupodj/src/lib/prisma.ts), se garantiza la persistencia en `globalThis` tanto en desarrollo como en producción para evitar la duplicación del motor binario entre chunks de Astro.

---

## 📌 Puntos de Mejora y Estado del Proyecto

Actualmente, el proyecto se encuentra totalmente operativo a nivel visual e interactivo, pero se recomiendan los siguientes ajustes:

1. **Precios de Productos**: Habilitar la visibilidad de precios en `CardProduct.astro` y `ProductInfo.astro`.
2. **SEO Meta Tags**: Mejorar la inyección dinámica de `<title>` y `<meta description>` en `Layout.astro`.
3. **Enlaces del Footer**: Conectar las anclas del pie de página a sus respectivas rutas en lugar de `#`.
4. **Modulo de Blog**: Reactivar las pestañas y accesos al Blog cuando el contenido esté listo.
