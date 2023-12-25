// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedQueries(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error(
        'No se puede ejecutar en producción sin una transacción.',
      );
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      const tasks = await prisma.task.findMany();

      for (let i = 0; i < quantity; i++) {
        const task = faker.helpers.arrayElement(tasks);
        const userIdValue = i + 1; // Reemplaza con un ID de usuario válido

        await prisma.query.create({
          data: {
            scheduledFor: faker.date.future(),
            name: faker.lorem.words(3),
            status: faker.helpers.arrayElement([
              'open',
              'pendingApproval',
              'closed',
            ]),
            type: faker.helpers.arrayElement([
              'assignment',
              'unassignment',
              'markAsCompleted',
              'modifyTask',
              'requestColaboration',
              'link',
            ]),
            taskId: task.id,
            createdBy: userIdValue, // Reemplaza con un ID de usuario válido
            assignedTo: faker.number.int({ min: 1, max: 20 }), // Reemplaza con un ID de usuario válido
            description: faker.lorem.sentence(),
            approvalDeadline: faker.date.future(),
          },
        });
      }

      console.log(
        `Semilla de consultas completada. Se generaron ${quantity} consultas.`,
      );
    } else {
      console.log('La semilla de consultas no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de consultas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedQueries;
