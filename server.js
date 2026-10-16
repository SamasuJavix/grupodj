// Cargar variables de entorno desde .env si existe en el entorno de ejecución
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch {
  // Ignorar si no existe el archivo .env físico (se usarán las variables del panel de Hostinger)
}

// Restricción de hilos para entornos CloudLinux LVE (Hostinger)
process.env.PRISMA_QUERY_ENGINE_NUM_THREADS = process.env.PRISMA_QUERY_ENGINE_NUM_THREADS || '1';
process.env.TOKIO_WORKER_THREADS = process.env.TOKIO_WORKER_THREADS || '1';

// Cargar el servidor de Astro después de configurar el entorno
await import('./dist/server/entry.mjs');

