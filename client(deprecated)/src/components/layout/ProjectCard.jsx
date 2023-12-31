import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import { textBold } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
/**
 * Explore Component
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.project recibe la data de un proyecto devuelta por la API.
 * @param {boolean} props.like - Indica si el comentario ha sido marcado como "me gusta".

 * @example
 * // Ejemplo de uso del componente Explore
 * <ProjectCard
 *    name={project?.name}
      imagen={project?.imagenDePerfil}
      like={true}
      tecnologias={["Angular", "JavaScript", "Python"]} // debería ser la lista de tecnologías del proyecto
      description={project?.description}
 * />
 */
export const ProjectCard = ({ project, like, ...props }) => {
  // project debería ser la data de un proyecto devuelta por la API.
  const { id, name, image, description } = project
  const tecnologias = project?.tecnologias || ['tech', 'tech', 'tech']

  return (
    <section className={`h-full w-full p-6 max-w-[500px]`}>
      <h2 className={cn(textBold.className)}>{name}</h2>
      <div className='mt-2 h-full w-full'>
        <div className='flex justify-between relative rounded-xl overflow-hidden border-red-200'>
          {/* eslint-disable */}
          <Link href={`/projects/${project.id}`}>
            {image ? (
              <img
                src={image}
                width={500}
                height={500}
                alt={`Imagen ${name}`}
              />
            ) : (
              <div className='w-[500px] h-[313px] bg-gray-400 animate-pulse'></div>
            )}
          </Link>
          {/* eslint-enable */}
          <div className='absolute top-2 right-2 text-white'>
            {like === true ? (
              <FaHeart className=' w-[34px] h-[29.76px] ' />
            ) : (
              <FaRegHeart className=' w-[34px] h-[29.76px] ' />
            )}
          </div>
          <div className='absolute flex w-full justify-end gap-2 bottom-2 right-2'>
            {tecnologias.map((tecnologia, index) => (
              <Badge key={index} size={'sm'}>
                {tecnologia}
              </Badge>
            ))}
          </div>
        </div>
        <p className='mt-2'>{description}</p>
      </div>
    </section>
  )
}
