import { PrismaClient } from '@prisma/client';
import { products } from '../data/products.js';
import { categories as homeCategories } from '../data/home.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la siembra de la base de datos PostgreSQL en Hostinger...');

  // 1. Limpiar datos existentes (opcional en desarrollo)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log('🧹 Base de datos limpiada.');

  // 2. Crear Administrador por defecto
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@grupodj.com',
      passwordHash: 'admin123', // En producción se recomienda usar bcrypt
      name: 'Administrador Grupo DJ',
    },
  });
  console.log(`👤 Usuario Admin creado: ${admin.email}`);

  // 3. Crear Categorías desde home.ts y productos
  const categoryMap = new Map<string, string>(); // Nombre -> ID

  for (const cat of homeCategories) {
    const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
    const createdCategory = await prisma.category.upsert({
      where: { slug },
      update: { name: cat.name, imageUrl: cat.image },
      create: {
        name: cat.name,
        slug,
        imageUrl: cat.image,
      },
    });
    categoryMap.set(cat.name.toLowerCase(), createdCategory.id);
  }

  // Asegurar que todas las categorías únicas de productos estén registradas
  for (const prod of products) {
    const catNameLower = prod.category.toLowerCase();
    if (!categoryMap.has(catNameLower)) {
      const slug = prod.category.toLowerCase().replace(/\s+/g, '-');
      const createdCategory = await prisma.category.create({
        data: {
          name: prod.category,
          slug,
        },
      });
      categoryMap.set(catNameLower, createdCategory.id);
    }
  }

  console.log(`📂 ${categoryMap.size} categorías registradas.`);

  // 4. Sembrar Productos
  let count = 0;
  for (const prod of products) {
    const categoryId = categoryMap.get(prod.category.toLowerCase());

    const createdProduct = await prisma.product.create({
      data: {
        sku: `SKU-${prod.id}-${prod.slug.substring(0, 5).toUpperCase()}`,
        name: prod.name || prod.title,
        slug: prod.slug,
        description: prod.description,
        categoryId: categoryId,
        price: prod.price,
        originalPrice: prod.discount ? prod.price / (1 - prod.discount / 100) : prod.price,
        discountPercentage: prod.discount || 0,
        stock: prod.stock,
        badge: prod.badge || null,
        isFeatured: prod.badge === 'Más Vendido' || prod.badge === 'Premium' || count < 4,
        specs: prod.specs || [],
        images: {
          create: prod.images.map((imgUrl, index) => ({
            imageUrl: imgUrl,
            displayOrder: index,
            isCover: index === 0,
          })),
        },
      },
    });
    count++;
    console.log(`✅ Producto [${count}/${products.length}] sembrado: ${createdProduct.name}`);
  }

  console.log('🎉 ¡Siembra completada con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la siembra:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
