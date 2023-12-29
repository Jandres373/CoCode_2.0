import React from 'react';
import { CardProps } from '.';

import content from './content.json';

const Card: React.FC<CardProps> = () => {
  return (
    <div>
      Card component.
      Autoreferencia: {content.autoreference}
    </div>
  );
}

export default Card;

