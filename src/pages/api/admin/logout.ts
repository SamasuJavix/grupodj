import type { APIRoute } from 'astro';
import { removeAdminCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  removeAdminCookie(cookies);
  return new Response(
    JSON.stringify({ success: true, message: 'Sesión cerrada correctamente' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
