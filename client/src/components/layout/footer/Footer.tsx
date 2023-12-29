import React from 'react'
import { FooterProps } from '.'

import content from './content.json'

const Footer: React.FC<FooterProps> = () => {
  return <div>Footer component. Autoreferencia: {content.autoreference}</div>
}

export default Footer
