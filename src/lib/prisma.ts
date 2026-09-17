import { PrismaClient } from '@prisma/client';

// Forzar límites de hilos en el runtime de Tokio y Prisma para no saturar el NPROC de Hostinger
process.env.PRISMA_QUERY_ENGINE_NUM_THREADS = process.env.PRISMA_QUERY_ENGINE_NUM_THREADS || '1';
process.env.TOKIO_WORKER_THREADS = process.env.TOKIO_WORKER_THREADS || '1';

// Instancia singleton para evitar múltiples clientes entre chunks de Astro SSR y recargas
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Asignar SIEMPRE a globalThis (tanto en producción como en desarrollo)
globalForPrisma.prisma = prisma;

export default prisma;
