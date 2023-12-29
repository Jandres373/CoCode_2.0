import React from 'react'

import { FormProps } from '.'
import content from './content.json'

// Default formulary
const Form: React.FC<FormProps> = () => {
  return <div>Form component. Autoreferencia: {content.autoreference}</div>
}
export default Form

// Other forms.
