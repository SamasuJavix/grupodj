import { defineMiddleware } from 'astro:middleware';
import { getAdminSession } from './lib/auth';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Proteger todas las rutas bajo /admin (excepto /admin/login y la API de login)
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const session = getAdminSession(context.cookies);

    if (!session) {
      return context.redirect('/admin/login');
    }
  }

  // Si ya tiene sesión iniciada y trata de ir a /admin/login, redirigir al Dashboard
  if (url.pathname === '/admin/login') {
    const session = getAdminSession(context.cookies);
    if (session) {
      return context.redirect('/admin');
    }
  }

  return next();
});
