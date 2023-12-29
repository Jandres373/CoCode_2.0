import React from 'react'
import { NavbarProps } from '.'
import { cn } from '@/lib/utils'
import { TITLE } from '@/styles/fonts'
import content from './content.json'
import { ClientButton } from './client'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { AvatarArea } from './client/avatar'

//? Nombre de la pagina.
const BrandArea = () => {
  return (
    <h1 id="brand_name" className={cn(TITLE.className)}>
      {content.brandName.first}
      <span className="text-violet-500">{content.brandName.second}</span>
    </h1>
  )
}

//? Links a otras rutas
const LinksArea: React.FC<{ links: typeof content.links; user: any }> = ({
  links,
  user,
}) => {
  const renderLinks = user ? links.onlineLinks : links.offlineLinks
  return (
    <div id="navbar_links_container" className="hidden md:flex gap-5">
      {renderLinks.map((link, index: number) => (
        <Link
          key={index}
          href={link.url}
          className={cn(buttonVariants({ variant: 'link' }))}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

//? Componente principal
const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav
      id="navbar_container"
      className="flex justify-between items-center py-5 px-5"
    >
      <section
        id="brand_&_links"
        className="flex gap-10 justify-center items-center"
      >
        <BrandArea />
        <LinksArea links={content.links} user={user} />
      </section>
      <section
        id="avatar_&_button"
        className="flex gap-10 justify-center items-center"
      >
        {user && <AvatarArea user={user} />}
        <ClientButton button={content.button} user={user} />
      </section>
    </nav>
  )
}

export default Navbar
