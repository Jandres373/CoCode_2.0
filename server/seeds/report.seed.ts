// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedReports(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error('No se puede ejecutar en producción sin una transacción.');
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      const projects = await prisma.project.findMany();

      for (let i = 0; i < quantity; i++) {
        const project = faker.helpers.arrayElement(projects);

        await prisma.report.create({
          data: {
            type: faker.helpers.arrayElement([
              'contribution',
              'bug',
              'alteration',
              'rollback',
              'taskStatus',
              'projectStatus',
            ]),
            reportId: project.id,
          },
        });
      }

      console.log(`Semilla de informes completada. Se generaron ${quantity} informes.`);
    } else {
      console.log('La semilla de informes no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de informes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedReports;
