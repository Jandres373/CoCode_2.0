declare module 'Navbar'
import { User } from '@/entity'
import content from './content.json'

export type Navbar = {
  user?: any
}

export interface ClientButtonProps extends Navbar {
  button: typeof content.button
}

export interface NavbarProps extends Navbar {}
