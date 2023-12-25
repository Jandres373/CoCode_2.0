/* eslint-disable prettier/prettier */
//TODO omitir de la carpeta seeds del repo cuando se suba
// truncateTables.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function truncateTables() {
  try {
    // Lista de tablas que deseas truncar
    const tablesToTruncate = ['table1', 'table2', 'table3'];

    // Ejecutar el truncado de cada tabla
    for (const table of tablesToTruncate) {
      await prisma.$executeRaw`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`;
      console.log(`Tabla ${table} truncada.`);
    }

    console.log('Truncado de tablas completado con éxito.');
  } catch (error) {
    console.error('Error en el truncado de tablas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar el truncado de tablas
truncateTables();
