/* eslint-disable prettier/prettier */
// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedComments(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error(
        'No se puede ejecutar en producción sin una transacción.',
      );
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      const projects = await prisma.project.findMany();
      const tasks = await prisma.task.findMany();
      const queries = await prisma.query.findMany();
      const reports = await prisma.report.findMany();

      for (let i = 0; i < quantity; i++) {
        const userIdValue = i + 1;
        const project = faker.helpers.arrayElement(projects);
        const task = faker.helpers.arrayElement(tasks);
        const query = faker.helpers.arrayElement(queries);
        const report = faker.helpers.arrayElement(reports);

        await prisma.comment.create({
          data: {
            text: faker.lorem.sentence(),
            userId: userIdValue, // Reemplaza con un ID de usuario válido
            projectId: project.id,
            taskId: task.id,
            queryId: query.id,
            reportId: report.id,
          },
        });
      }

      console.log(
        `Semilla de comentarios completada. Se generaron ${quantity} comentarios.`,
      );
    } else {
      console.log('La semilla de comentarios no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de comentarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedComments;
