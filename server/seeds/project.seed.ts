/* eslint-disable prettier/prettier */
// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedProjects(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error('No se puede ejecutar en producción sin una transacción.');
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      for (let i = 0; i < quantity; i++) {
        const userId = i + 1;
        await prisma.project.create({
          data: {
            category: faker.helpers.arrayElement([
              'UX_UI',
              'WebDevelopment',
              'MobileDevelopment',
              'VideoGameCreation',
              'Animation3D',
            ]),
            name: faker.lorem.words(3),
            ownerId: userId, // Reemplaza con un ID de usuario válido
            description: faker.lorem.paragraph(),
            image: faker.image.avatar(),
            githubRepo: null,
            openToColaborations: faker.datatype.boolean(),
          },
        });
      }

      console.log(`Semilla de proyectos completada. Se generaron ${quantity} proyectos.`);
    } else {
      console.log('La semilla de proyectos no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de proyectos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedProjects;
