export type CardColor =  
| "red"
| "blue"
| "green"
| "yellow"
| "wild";

export type CardType =
  | "number"
  | "skip"
  | "reverse"
  | "draw2"
  | "wild"
  | "wildDraw4";

  export interface Card {
  id: string;
  color: CardColor;
  type: CardType;
  value?: number;
}

export interface Player {
  id: string;
  name: string;
  cards: Card[];
}

export type GameStatus =
  | "waiting"
  | "playing"
  | "finished";

export type TurnStatus =
  | "player"
  | "opponent";






  