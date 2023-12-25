/* eslint-disable prettier/prettier */
// TODO: Omitir la carpeta seeds en producción.

import { PrismaClient } from '@prisma/client';
import seedUsers from './user.seed';
import seedProjects from './project.seed';
import seedTeams from './team.seed';
import seedTasks from './task.seed';
import seedComments from './comment.seed';
import seedQueries from './query.seed';
import seedReports from './report.seed';

const prisma = new PrismaClient();
const cantidadDeDatos = 20;

// Function to seed all entities
async function seedAll() {
  try {
    await seedUsers(cantidadDeDatos, true); // Indicar que es una transacción
    await seedTeams(cantidadDeDatos, true); // Indicar que es una transacción
    await seedProjects(cantidadDeDatos, true); // Indicar que es una transacción
    await seedTasks(cantidadDeDatos, true); // Indicar que es una transacción
    await seedQueries(cantidadDeDatos, true); // Indicar que es una transacción
    await seedReports(cantidadDeDatos, true); // Indicar que es una transacción
    await seedComments(cantidadDeDatos, true); // Indicar que es una transacción
    // 
  } catch (error) {
    console.error('Error en la transacción de semillas:', error);
    // Realizar un rollback manual deshaciendo los cambios realizados en la transacción
    await prisma.$executeRaw`ROLLBACK`;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to run a specific seed
async function specificSeed(
  seedFunction: (quantity: number, tx?: any) => Promise<void>,
) {
  try {
    await prisma.$transaction(async (tx) => {
      await seedFunction(cantidadDeDatos, tx);
    });
  } catch (error) {
    console.error('Error en la semilla específica:', error);
    // Realizar un rollback manual deshaciendo los cambios realizados en la transacción
    await prisma.$executeRaw`ROLLBACK`;
  } finally {
    await prisma.$disconnect();
  }
}

// Check if a specific seed is provided as a command line argument
const specificSeedName = process.argv[2];

if (specificSeedName) {
  const seedFunctionMap: {
    [key: string]: (quantity: number, tx?: any) => Promise<void>;
  } = {
    user: seedUsers,
    project: seedProjects,
    // Agrega más funciones según sea necesario
  };

  const seedFunction = seedFunctionMap[specificSeedName];

  if (seedFunction) {
    specificSeed(seedFunction);
  } else {
    console.error(
      `No se encontró una función de semilla válida para "${specificSeedName}".`,
    );
  }
} else {
  // Si no se proporciona una semilla específica, ejecuta todas las semillas
  seedAll();
}
