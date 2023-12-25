/* eslint-disable prettier/prettier */
// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUsers(quantity: number, tx?: any) {
  try {
    // Verificar si se está ejecutando dentro de una transacción y usarla si está disponible
    if (process.env.NODE_ENV === 'production' && !tx) {
      throw new Error('No se puede ejecutar en producción sin una transacción.');
    }

    // Ejecutar la semilla solo si no está dentro de una transacción o si es desarrollo
    if (!tx || process.env.NODE_ENV !== 'production') {
      for (let i = 0; i < quantity; i++) {
        await prisma.user.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            hashedPassword:
              '$argon2id$v=19$m=65536,t=3,p=4$d3KAQEMmS4j3+Q2t8Bi8dw$YzW9+HUirCOiRCUwXzFOxLzkcmG47GoJTbUowq22sOM', // admin123
            avatar: faker.image.avatar(),
            country: faker.location.country(),
            githubUser: faker.internet.userName(),
            ranking: faker.number.int({ min: 1, max: 100 }),
            points: faker.number.int({ min: 10, max: 800 }),
            tag: faker.helpers.arrayElement([
              'newbie',
              'jr',
              'semiSenior',
              'senior',
              'SME',
            ]),
            openToWork: faker.datatype.boolean(),
            rol: faker.helpers.arrayElement([
              'user',
              'admin',
              'recruiter',
              'organization',
            ]),
          },
        });
      }

      console.log(`Semilla de usuarios completada. Se generaron ${quantity} usuarios.`);
    } else {
      console.log('La semilla de usuarios no se ejecutó en producción.');
    }
  } catch (error) {
    console.error('Error en la semilla de usuarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exportar la función de semilla para poder usarla selectivamente desde el script principal
export default seedUsers;
