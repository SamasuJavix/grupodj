import type { APIRoute } from 'astro';
import prisma from '../../../../lib/prisma';
import { getAdminSession } from '../../../../lib/auth';

export const prerender = false;

// PUT: Actualizar un producto existente
export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ message: 'ID no provisto' }), { status: 400 });

  try {
    const body = await request.json();
    const {
      name,
      price,
      stock,
      isActive,
      isFeatured,
      description,
      categoryId,
      brand,
      badge,
      images,
      specs,
    } = body;

    // Actualizar producto e imágenes asociadas
    const updatedProduct = await prisma.$transaction(async (tx) => {
      if (images && Array.isArray(images)) {
        await tx.productImage.deleteMany({ where: { productId: id } });
        await tx.productImage.createMany({
          data: images.map((urlStr: string, index: number) => ({
            productId: id,
            imageUrl: urlStr,
            displayOrder: index,
            isCover: index === 0,
          })),
        });
      }

      return await tx.product.update({
        where: { id },
        data: {
          name: name ? name.trim() : undefined,
          price: price !== undefined ? parseFloat(price) : undefined,
          stock: stock !== undefined ? parseInt(stock, 10) : undefined,
          isActive: isActive !== undefined ? Boolean(isActive) : undefined,
          isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
          description: description !== undefined ? description : undefined,
          categoryId: categoryId || undefined,
          brand: brand !== undefined ? brand : undefined,
          badge: badge !== undefined ? badge : undefined,
          specs: specs !== undefined ? specs : undefined,
        },
      });
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Producto actualizado', product: updatedProduct }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// PATCH: Cambiar estado activo o actualizar stock de forma rápida
export const PATCH: APIRoute = async ({ params, request, cookies }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ message: 'ID no provisto' }), { status: 400 });

  try {
    const body = await request.json();
    const updateData: any = {};

    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock, 10);
    if (body.price !== undefined) updateData.price = parseFloat(body.price);

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Producto actualizado rápidamente', product }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// DELETE: Eliminar producto
export const DELETE: APIRoute = async ({ params, cookies }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
  }

  const { id } = params;
  if (!id) return new Response(JSON.stringify({ message: 'ID no provisto' }), { status: 400 });

  try {
    await prisma.product.delete({ where: { id } });
    return new Response(
      JSON.stringify({ success: true, message: 'Producto eliminado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
