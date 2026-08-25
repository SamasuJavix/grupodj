import prisma from './prisma';

export interface ProductItem {
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

/**
 * Obtener todos los productos activos desde MySQL (Hostinger)
 */
export async function getAllProducts(): Promise<ProductItem[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        subcategory: true,
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      title: p.name,
      price: Number(p.price),
      description: p.description || '',
      category: p.category?.name || 'General',
      subcategory: p.subcategory?.slug || undefined,
      stock: p.stock,
      images: p.images.length > 0 ? p.images.map((img) => img.imageUrl) : ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800'],
      slug: p.slug,
      badge: p.badge || undefined,
      discount: p.discountPercentage || undefined,
      specs: (p.specs as any) || [],
    }));
  } catch (error) {
    console.error('⚠️ Error al consultar MySQL de Hostinger:', error);
    return [];
  }
}

/**
 * Obtener un producto por su Slug desde MySQL
 */
export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { displayOrder: 'asc' } },
      },
    });

    if (!p) return null;

    return {
      id: p.id,
      name: p.name,
      title: p.name,
      price: Number(p.price),
      description: p.description || '',
      category: p.category?.name || 'General',
      subcategory: p.subcategory?.slug || undefined,
      stock: p.stock,
      images: p.images.length > 0 ? p.images.map((img) => img.imageUrl) : ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800'],
      slug: p.slug,
      badge: p.badge || undefined,
      discount: p.discountPercentage || undefined,
      specs: (p.specs as any) || [],
    };
  } catch (error) {
    console.error(`⚠️ Error buscando el producto con slug "${slug}":`, error);
    return null;
  }
}

/**
 * Obtener productos relacionados por categoría
 */
export async function getRelatedProducts(categoryName: string, currentSlug: string): Promise<ProductItem[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        slug: { not: currentSlug },
        category: { name: categoryName },
      },
      include: {
        category: true,
        images: { orderBy: { displayOrder: 'asc' } },
      },
      take: 4,
    });

    return dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      title: p.name,
      price: Number(p.price),
      description: p.description || '',
      category: p.category?.name || 'General',
      subcategory: p.subcategory?.slug || undefined,
      stock: p.stock,
      images: p.images.length > 0 ? p.images.map((img) => img.imageUrl) : ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800'],
      slug: p.slug,
      badge: p.badge || undefined,
      discount: p.discountPercentage || undefined,
      specs: (p.specs as any) || [],
    }));
  } catch (error) {
    console.error('⚠️ Error al obtener productos relacionados:', error);
    return [];
  }
}

/**
 * Obtener todas las categorías dinámicas desde MySQL
 */
export async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        subcategories: true,
      },
    });
  } catch (error) {
    console.error('⚠️ Error cargando categorías:', error);
    return [];
  }
}
