declare module 'Footer'

import content from './content.json'

export type Footer = {
  // Comentario que indica definir los tipos básicos
  autoreference: boolean
}

export interface FooterProps extends Footer {
  // Comentario que indica extender los tipos en la interfaz
}
