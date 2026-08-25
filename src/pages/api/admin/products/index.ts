import type { APIRoute } from 'astro';
import prisma from '../../../../lib/prisma';
import { getAdminSession } from '../../../../lib/auth';

export const prerender = false;

// GET: Obtener lista de productos para la administración
export const GET: APIRoute = async ({ cookies, url }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const search = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || '';

    const products = await prisma.product.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { sku: { contains: search } },
                ],
              }
            : {},
          category ? { categoryId: category } : {},
        ],
      },
      include: {
        category: true,
        images: { orderBy: { displayOrder: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error obteniendo productos para Admin:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
};

// POST: Crear un nuevo producto en MySQL
export const POST: APIRoute = async ({ request, cookies }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      sku,
      name,
      slug,
      description,
      categoryId,
      price,
      originalPrice,
      discountPercentage,
      stock,
      badge,
      brand,
      isFeatured,
      isActive,
      images, // array de string URLs
      specs,  // array de { label, value }
    } = body;

    if (!name || !price || !sku) {
      return new Response(
        JSON.stringify({ success: false, message: 'Nombre, SKU y Precio son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const generatedSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    const newProduct = await prisma.product.create({
      data: {
        sku: sku.trim(),
        name: name.trim(),
        slug: generatedSlug,
        description: description || '',
        categoryId: categoryId || null,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
        discountPercentage: parseInt(discountPercentage || 0, 10),
        stock: parseInt(stock || 0, 10),
        badge: badge || null,
        brand: brand || null,
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        specs: specs || [],
        images: {
          create: (images || []).map((urlStr: string, index: number) => ({
            imageUrl: urlStr,
            displayOrder: index,
            isCover: index === 0,
          })),
        },
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Producto creado exitosamente', product: newProduct }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Error al guardar en base de datos' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
