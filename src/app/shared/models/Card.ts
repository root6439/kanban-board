import { CardStatus } from '../enums/CardStatus.enum';

export class Card {
  id?: string;
  title: string;
  content: string;
  status: CardStatus;
}
