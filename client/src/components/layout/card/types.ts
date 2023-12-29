import content from './content.json';

export type Card = {
  // Comentario que indica definir los tipos básicos
  autoreference: boolean;
};

export interface CardProps extends Card {
  // Comentario que indica extender los tipos en la interfaz
}

