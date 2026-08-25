import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Actualizando todos los badges a "Nuevo"...');
  const result = await prisma.product.updateMany({
    data: {
      badge: 'Nuevo',
    },
  });
  console.log(`Se actualizaron ${result.count} productos exitosamente.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
