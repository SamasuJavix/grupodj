// Restricción de hilos para entornos CloudLinux LVE (Hostinger)
process.env.PRISMA_QUERY_ENGINE_NUM_THREADS = process.env.PRISMA_QUERY_ENGINE_NUM_THREADS || '1';
process.env.TOKIO_WORKER_THREADS = process.env.TOKIO_WORKER_THREADS || '1';

import './dist/server/entry.mjs';
