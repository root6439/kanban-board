import { List } from '../enums/List.enum';
import { Card } from '../models/Card';

export const MOCKED_CARDS: Card[] = [
  { conteudo: '123', lista: List.DOING, titulo: 'Teste', id: '1' },
  { conteudo: '123', lista: List.TODO, titulo: 'Teste', id: '2' },
  { conteudo: '123', lista: List.DONE, titulo: 'Teste', id: '3' },
  { conteudo: '123', lista: List.DONE, titulo: 'Teste', id: '4' },
  { conteudo: '123', lista: List.DONE, titulo: 'Teste', id: '5' },
  { conteudo: '123', lista: List.TODO, titulo: 'Teste', id: '6' },
  { conteudo: '123', lista: List.DOING, titulo: 'Teste', id: '7' },
  { conteudo: '123', lista: List.TODO, titulo: 'Teste', id: '8' },
];
