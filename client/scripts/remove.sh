#!/bin/bash

# Verificar si se proporciona una ruta como argumento
if [ -z "$1" ]; then
  echo "Por favor, proporciona la ruta del componente."
  exit 1
fi

# Obtener la ruta del componente como argumento
rutaCompleta="src/components/$1"

# Verificar si la carpeta base existe
if [ -d "$rutaCompleta" ]; then
    # Eliminar la carpeta y sus archivos
    rm -rf "$rutaCompleta"

    echo "Carpeta y archivos del componente en '$rutaCompleta' eliminados exitosamente."
    echo "®️ CoCode 2.0 - autoremove ®️"
    exit 0
fi

echo "La carpeta '$rutaCompleta' no existe. No hay nada que eliminar."
echo "®️ CoCode 2.0 ®️"
exit 1
