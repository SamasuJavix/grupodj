import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAdminSession } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = getAdminSession(cookies);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: 'No autorizado' }), { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || typeof file === 'string') {
      return new Response(
        JSON.stringify({ success: false, message: 'No se seleccionó ningún archivo de imagen' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar tipo MIME
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Tipo de archivo no permitido. Solo se aceptan imágenes (JPG, PNG, WEBP, GIF, AVIF)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar tamaño máximo (p. ej. 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return new Response(
        JSON.stringify({ success: false, message: 'La imagen supera el tamaño máximo permitido de 10MB' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Preparar nombre de archivo único
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = path.extname(file.name) || '.jpg';
    const rawFileName = path.basename(file.name, fileExt).toLowerCase().replace(/[^\w\-]+/g, '-');
    const uniqueFileName = `${Date.now()}-${rawFileName}${fileExt}`;

    // Ruta de destino dentro de public/images/products/
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');
    
    // Asegurar que la carpeta exista
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/products/${uniqueFileName}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Imagen subida exitosamente',
        url: publicUrl,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al guardar la imagen:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Error interno al guardar la imagen' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
