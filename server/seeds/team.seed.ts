/* eslint-disable prettier/prettier */
// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedTeams(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error(
        'No se puede ejecutar en producción sin una transacción.',
      );
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      for (let i = 0; i < quantity; i++) {
        const teamName = faker.company.name();

        // Obtén usuarios existentes de Prisma
        const users = await prisma.user.findMany();

        // Crea el equipo con un líder y algunos miembros aleatorios de la lista de usuarios existentes
        const team = await prisma.team.create({
          data: {
            name: teamName,
            status: 'open',
            leader: {
              connect: {
                id: faker.helpers.arrayElement(users).id,
              },
            },
            members: {
              connect: users
                .slice(0, faker.number.int({ min: 1, max: quantity }))
                .map((user) => ({
                  id: user.id,
                })),
            },
          },
        });

        console.log(`Equipo "${team.name}" creado con éxito.`);
      }
    } else {
      console.log('La semilla de equipos no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de equipos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exporta la función de semilla para poder usarla selectivamente desde el script principal
export default seedTeams;
