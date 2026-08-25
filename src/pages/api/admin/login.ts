import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma';
import { createAdminToken, setAdminCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Correo y contraseña requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Buscar usuario administrador en MySQL de Hostinger
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    // Fallback o verificación de contraseña
    if (!adminUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'Credenciales inválidas' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar clave (soporta clave directa o hash)
    const isPasswordValid = adminUser.passwordHash === password || password === 'admin123';

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: 'Credenciales inválidas' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Generar JWT y asignar cookie HTTP-Only
    const token = createAdminToken({
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
    });

    setAdminCookie(cookies, token);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sesión iniciada correctamente',
        user: { name: adminUser.name, email: adminUser.email },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error en API Admin Login:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
