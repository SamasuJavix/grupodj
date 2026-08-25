# 📘 Guía Completa: Prisma ORM, Hostinger MySQL y Comandos en Astro

Esta guía explica en detalle la infraestructura de datos que hemos configurado para el proyecto **Grupo DJ**, cómo se conecta con tu base de datos **MySQL en Hostinger Business**, cómo funciona la sintaxis de **Prisma ORM** y cómo utilizar los comandos de `npm`.

---

## 📑 Tabla de Contenidos

1. [Resumen de lo que Logramos](#1-resumen-de-lo-que-logramos)
2. [¿Cómo funciona Prisma ORM?](#2-cómo-funciona-prisma-orm)
3. [Configuración e Integración con Hostinger MySQL](#3-configuración-e-integración-con-hostinger-mysql)
4. [Explicación de la Sintaxis en `prisma/schema.prisma`](#4-explicación-de-la-sintaxis-en-prismaschemaprisma)
5. [Explicación de Comandos de NPM](#5-explicación-de-comandos-de-npm)
6. [Guía de Sintaxis de Prisma en TypeScript / Astro](#6-guía-de-sintaxis-de-prisma-en-typescript--astro)
7. [Uso de Prisma Studio (Panel de Administración Visual)](#7-uso-de-prisma-studio-panel-de-administración-visual)

---

## 1. Resumen de lo que Logramos

En esta sesión logramos transformar un catálogo estático almacenado en código a una **base de datos relacional MySQL real hospedada en la nube con Hostinger**:

1. **Definición del Modelo de Datos**: Diseñamos esquemas relacionales completos para Productos, Categorías, Subcategorías, Imágenes, Usuarios Administradores y Órdenes de compra.
2. **Sincronización Cloud**: Sincronizamos mediante `npm run db:push` la estructura hacia la base de datos `u165399624_grupo_dj` en el servidor `srv2141.hstgr.io`.
3. **Migración de Datos (Seed)**: Ejecutamos el script `npm run db:seed` que migró los **33 productos reales**, sus fotos, especificaciones técnicas y categorías estáticas a tu base de datos MySQL en Hostinger.
4. **Entorno de Administración (Prisma Studio)**: Levantamos el servidor gráfico de administración `npm run db:studio` que te permite gestionar el catálogo visualmente en `http://localhost:5555`.

---

## 2. ¿Cómo funciona Prisma ORM?

Un **ORM (Object-Relational Mapping)** es una herramienta que traduce el código TypeScript/JavaScript a consultas SQL complejas de forma automática.

```text
[ Tu Código Astro / TS ]  <--->  [ Cliente de Prisma ]  <--->  [ Base de Datos MySQL (Hostinger) ]
 (prisma.product.findMany)        (Genera SQL SELECT)          (Servidor en la Nube srv2141.hstgr.io)
```

### Componentes Clave:
1. **`prisma/schema.prisma`**: El plano arquitectónico de tu base de datos. Define los modelos, tipos de datos y relaciones.
2. **`@prisma/client`**: La librería de TypeScript que utilizas en tu código para consultar datos (`prisma.product.findMany()`).
3. **`Prisma CLI`**: El conjunto de comandos (`npx prisma ...`) para sincronizar, migrar o ver tu base de datos.
4. **`src/lib/prisma.ts`**: La conexión global reutilizable creada en el proyecto para evitar saturar el límite de conexiones de MySQL durante el desarrollo.

---

## 3. Configuración e Integración con Hostinger MySQL

### El archivo `.env`
Para conectar de forma segura sin exponer credenciales en el código fuente, la cadena de conexión se guarda en `.env`:

```env
DATABASE_URL="mysql://u165399624_dba_admin:Gaboomc40%40@srv2141.hstgr.io:3306/u165399624_grupo_dj"
```

### Desglose de la URL de conexión:
- **`mysql://`**: Protocolo de base de datos.
- **`u165399624_dba_admin`**: Nombre del usuario MySQL creado en Hostinger.
- **`:Gaboomc40%40`**: Contraseña del usuario. *(Nota: El carácter `@` se codifica como `%40` para evitar romper la sintaxis de la URL)*.
- **`@srv2141.hstgr.io:3306`**: Servidor (Host) y puerto estándar de MySQL.
- **`/u165399624_grupo_dj`**: Nombre exacto de la base de datos en Hostinger.

### MySQL Remoto en Hostinger
Para que tu computadora local (o Vercel en producción) pueda consultar la base de datos de Hostinger, activaste la regla de **Access Host: `%`** en hPanel, lo cual permite conexiones entrantes autenticadas.

---

## 4. Explicación de la Sintaxis en `prisma/schema.prisma`

Veamos cómo está estructurado tu archivo `prisma/schema.prisma`:

### Bloque de Configuración
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```
- `provider = "mysql"`: Indica a Prisma que genere sintaxis SQL compatible con MySQL 8 / MariaDB.
- `url = env("DATABASE_URL")`: Lee la URL secreta desde el archivo `.env`.

### Ejemplo de Modelo: `Product`
```prisma
model Product {
  id                 String         @id @default(uuid())
  sku                String         @unique
  name               String
  slug               String         @unique
  description        String?        @db.Text
  categoryId         String?
  category           Category?      @relation(fields: [categoryId], references: [id])
  price              Decimal        @db.Decimal(10, 2)
  stock              Int            @default(0)
  isFeatured         Boolean        @default(false)
  specs              Json?          
  images             ProductImage[]
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt

  @@index([categoryId])
}
```

### Explicación de los Modificadores:
- `@id`: Indica que el campo es la Llave Primaria (Primary Key).
- `@default(uuid())`: Genera un identificador único universal automáticamente (ej: `123e4567-e89b-12d3-a456-426614174000`).
- `@unique`: Garantiza que no existan dos productos con el mismo `slug` o `sku`.
- `String?`: El símbolo `?` indica que el campo es **opcional (puede ser NULL)**.
- `@db.Text`: Permite almacenar descripciones largas sin límite de 255 caracteres.
- `Decimal @db.Decimal(10, 2)`: Almacena números decimales precisos para precios (ej: `14999.00`), evitando errores de redondeo de punto flotante.
- `Json?`: Permite guardar estructuras flexibles de datos dentro de MySQL (usado para la lista de especificaciones técnicas).
- `images ProductImage[]`: Define una relación **1 a Muchos** (un producto puede tener múltiples imágenes).
- `@@index([categoryId])`: Crea un índice en MySQL para que buscar productos por categoría sea ultrarrápido.

---

## 5. Explicación de Comandos de NPM

En el archivo `package.json` configuramos 4 comandos especiales:

### 1. `npm run db:push`
```bash
npx prisma db push
```
- **¿Qué hace?**: Compara tu archivo `prisma/schema.prisma` con tu base de datos en Hostinger. Si creaste una nueva tabla o agregaste un nuevo campo, modifica la base de datos en la nube sin borrar los datos existentes.
- **¿Cuándo usarlo?**: Cada vez que agregues o modifiques modelos en `schema.prisma`.

### 2. `npm run db:seed`
```bash
npx tsx src/scripts/seed.ts
```
- **¿Qué hace?**: Ejecuta el script TypeScript `src/scripts/seed.ts` para insertar datos iniciales en la base de datos.
- **¿Cuándo usarlo?**: Cuando quieras restaurar los 33 productos iniciales o registrar datos por defecto en un entorno nuevo.

### 3. `npm run db:studio`
```bash
npx prisma studio
```
- **¿Qué hace?**: Inicia un servidor web local en `http://localhost:5555` que te muestra una interfaz gráfica (panel de administración) para editar tus tablas de MySQL directamente con un clic.
- **¿Cuándo usarlo?**: Cuando quieras revisar o modificar datos visualmente sin escribir código.

### 4. `npm run db:generate`
```bash
npx prisma generate
```
- **¿Qué hace?**: Actualiza las definiciones de TypeScript de `@prisma/client` para que tu editor (VS Code) reconozca los nuevos campos y te dé autocompletado.

---

## 6. Guía de Sintaxis de Prisma en TypeScript / Astro

Para consultar datos en tus páginas de Astro, simplemente importas el cliente de Prisma desde `src/lib/prisma.ts`:

```typescript
import prisma from '../lib/prisma';
```

### Ejemplos de Consultas Comunes:

#### A. Obtener todos los productos activos con sus imágenes
```typescript
const products = await prisma.product.findMany({
  where: {
    isActive: true,
  },
  include: {
    category: true,
    images: {
      orderBy: { displayOrder: 'asc' },
    },
  },
});
```

#### B. Obtener un producto por su Slug (Página de detalle)
```typescript
const product = await prisma.product.findUnique({
  where: {
    slug: 'macbook-pro-16-m3-max',
  },
  include: {
    category: true,
    images: true,
  },
});
```

#### C. Crear un nuevo producto (Desde el futuro módulo Admin)
```typescript
const newProduct = await prisma.product.create({
  data: {
    sku: 'SKU-MACBOOK-M3',
    name: 'MacBook Pro 16 M3 Max',
    slug: 'macbook-pro-16-m3-max',
    price: 14999.00,
    stock: 10,
    categoryId: 'id-de-la-categoria',
    images: {
      create: [
        { imageUrl: 'https://ejemplo.com/foto1.jpg', isCover: true },
        { imageUrl: 'https://ejemplo.com/foto2.jpg', isCover: false },
      ],
    },
  },
});
```

#### D. Actualizar stock tras una venta
```typescript
await prisma.product.update({
  where: { id: productId },
  data: {
    stock: {
      decrement: 1, // Resta 1 unidad del stock actual de forma atómica
    },
  },
});
```

---

## 7. Uso de Prisma Studio (Panel de Administración Visual)

Cuando ejecutas:
```bash
npm run db:studio
```
Se abre en tu navegador la aplicación visual:

1. **Pestañas de Tablas**: Puedes cambiar entre `Product`, `Category`, `ProductImage`, `Order` y `AdminUser`.
2. **Agregar Registros**: Botón **"Add record"** arriba a la derecha.
3. **Filtros y Búsqueda**: Puedes filtrar productos por precio o buscar por nombre.
4. **Guardar Cambios**: Tras modificar un dato directamente en la celda, presiona el botón verde **"Save 1 change"** para impactar el cambio directamente en la base de datos de Hostinger.

---

### 🎉 Conclusión
Tu proyecto ahora cuenta con una arquitectura de datos **profesional, limpia, segura y 100% escalable**, conectada a tu servidor de Hostinger y lista para soportar pasarelas de pago y el panel de administración personalizado.
