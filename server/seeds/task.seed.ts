/* eslint-disable */

import { PrismaClient, TaskStatus, TaskCategory } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedTasks(quantity: number, tx?: any) {
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

      for (let i = 0; i < quantity; i++) {
        const project = faker.helpers.arrayElement(projects);

        await prisma.task.create({
          data: {
            name: faker.lorem.words(2),
            description: faker.lorem.sentence(), // Agregado para coincidir con el modelo de Prisma
            projectId: project.id,
            queryId: null, // Puedes ajustar según tus necesidades
            status: faker.helpers.arrayElement(Object.values(TaskStatus)), // Modificado para coincidir con el modelo de Prisma
            category: faker.helpers.arrayElement(Object.values(TaskCategory)), // Agregado para coincidir con el modelo de Prisma
            expiration: faker.date.future(), // Puedes ajustar según tus necesidades
          },
        });
      }

      console.log(
        `Semilla de tareas completada. Se generaron ${quantity} tareas.`,
      );
    } else {
      console.log('La semilla de tareas no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de tareas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Cantidad de datos a generar
const quantity = 20;

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedTasks;
