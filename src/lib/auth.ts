import crypto from 'node:crypto';
import type { AstroCookies } from 'astro';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-grupodj-2026';
const COOKIE_NAME = 'admin_session_token';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  exp?: number;
}

/**
 * Generar Token JWT usando crypto nativo de Node.js (Sin dependencias externas)
 */
export function createAdminToken(payload: AdminPayload): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 días de validez
  const fullPayload = { ...payload, exp };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verificar y decodificar el token de sesión
 */
export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null;
    }

    const payload: AdminPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));

    // Verificar si el token ya expiró
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Obtener la sesión activa del usuario administrador desde las cookies
 */
export function getAdminSession(cookies: AstroCookies): AdminPayload | null {
  const tokenCookie = cookies.get(COOKIE_NAME);
  if (!tokenCookie || !tokenCookie.value) return null;
  return verifyAdminToken(tokenCookie.value);
}

/**
 * Establecer la cookie de sesión HTTP-Only en Astro
 */
export function setAdminCookie(cookies: AstroCookies, token: string) {
  cookies.set(COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

/**
 * Eliminar la cookie de sesión del administrador
 */
export function removeAdminCookie(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}
