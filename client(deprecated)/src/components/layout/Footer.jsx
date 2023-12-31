import WomanLaptop from '../../../public/WomanLaptop.png'
import { textBold } from '@/styles/fonts'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

const Footer = () => {
  return (
    <div className='relative bg-gradient-to-t from-[#2D213F] to-[#784AB7] w-full h-[250px] md:w-[99vw] md:h-[75px] rounded-t-[38px] md:rounded-t-[24px] flex'>
      <section
        className='w-full text-center text-white m-5 px-4 flex flex-col md:flex-row  gap-5 md:justify-between md:w-5/6 lg:gap-24 md:px-6
       items-center'
      >
        <h2 className={cn(textBold.className, 'text-[2.0rem]')}>CoCode</h2>
        <p className='md:w-38 lg:w-72 md:flex'>Desarrollada para No Country</p>
        <Link
          href={'/team'}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          Ver equípo
        </Link>
        <p className='text-[12px] text-gray-400'>CoCode © 2023</p>
      </section>
      <section className='w-full md:w-1/6'>
        <Image
          quality={1}
          loading='lazy'
          src={WomanLaptop.src}
          alt='WomanLaptop'
          width={224}
          height={172}
          className='absolute bottom-0 right-0 md:bottom-5 md:block '
        />
      </section>
    </div>
  )
}

export default Footer
