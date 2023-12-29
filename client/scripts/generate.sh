#!/bin/bash

# Obtener la ruta completa del componente como argumento
ruta_completa=$1

# Verificar si se proporcionó una ruta
if [ -z "$ruta_completa" ]; then
  echo "Por favor, proporciona la ruta completa para el componente."
  exit 1
fi

# Verificar si la ruta ya existe
if [ -d "$ruta_completa" ]; then
  echo "La ruta '$ruta_completa' ya existe."
  exit 1
fi

# Directorio base para los componentes
directorio_base="./src/components/"

# Crear el directorio base si no existe
mkdir -p "$directorio_base"

# Crear directorios recursivamente
mkdir -p "$directorio_base$ruta_completa/client"

# Crear subcarpeta 'client'
touch "$directorio_base$ruta_completa/client/.gitkeep"

# Crear archivo de definicios de tipo sin contenido
touch "$directorio_base$ruta_completa/client/types.ts"

# Crear archivo index.ts dentro de la carpeta client
touch "$directorio_base$ruta_completa/client/index.ts"

# Extraer el nombre del componente de la última parte de la ruta
nombre_componente=$(basename "$ruta_completa")

# Convertir la primera letra del nombre a mayúscula
nombre_componente_mayuscula="$(tr '[:lower:]' '[:upper:]' <<< ${nombre_componente:0:1})${nombre_componente:1}"

# Crear archivos del componente con contenido
echo -e "import React from 'react';" > "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "import { ${nombre_componente_mayuscula}Props } from '.';\n" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "import content from './content.json';\n" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "const ${nombre_componente_mayuscula}: React.FC<${nombre_componente_mayuscula}Props> = () => {" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "  return (" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "    <div>" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "      ${nombre_componente_mayuscula} component." >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "      Autoreferencia: {content.autoreference}" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "    </div>" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "  );" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "}\n" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"
echo -e "export default ${nombre_componente_mayuscula};\n" >> "$directorio_base$ruta_completa/$nombre_componente_mayuscula.tsx"

# Crear archivos del componente con contenido
echo -e "import content from './content.json';\n" >> "$directorio_base$ruta_completa/types.ts"
echo -e "export type ${nombre_componente_mayuscula} = {\n  // Comentario que indica definir los tipos básicos\n  autoreference: boolean;\n};\n" >> "$directorio_base$ruta_completa/types.ts"
echo -e "export interface ${nombre_componente_mayuscula}Props extends ${nombre_componente_mayuscula} {\n  // Comentario que indica extender los tipos en la interfaz\n}\n" >> "$directorio_base$ruta_completa/types.ts"

# Crear archivo index.ts
echo -e "export * from './$nombre_componente_mayuscula';" > "$directorio_base$ruta_completa/index.ts"
echo -e "export * from './types';" >> "$directorio_base$ruta_completa/index.ts"

# Crear archivo content.json
echo -e "{\n  \"autoreference\": true\n}" > "$directorio_base$ruta_completa/content.json"

echo "Componente en la ruta '$ruta_completa' creado exitosamente."
echo "®️ CoCode 2.0 - autogenerator ®️"
