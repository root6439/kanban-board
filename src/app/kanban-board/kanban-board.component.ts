import { Card } from './../shared/models/Card';
import { Subscription } from 'rxjs';
import { KanbanBoardService } from './kanban-board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { List } from '../shared/enums/List.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  cardsToDo: Card[] = [];
  cardsDoing: Card[] = [];
  cardsDone: Card[] = [];

  service$: Subscription = new Subscription();

  formCard: FormGroup = new FormGroup({
    titulo: new FormControl<string>(null, Validators.required),
    conteudo: new FormControl<string>(null, Validators.required),
  });

  loadingNewCard: boolean = false;
  showNewCard: boolean = false;
  loadingCard: boolean = false;

  constructor(private service: KanbanBoardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  disaggregateCards(cards: Card[]): void {
    this.cardsToDo = cards.filter((card: Card) => card.lista == List.TODO);
    this.cardsDoing = cards.filter((card: Card) => card.lista == List.DOING);
    this.cardsDone = cards.filter((card: Card) => card.lista == List.DONE);
  }

  getCards(): void {
    this.service.getCards().subscribe((cards: Card[]) => {
      this.disaggregateCards(cards);
    });
  }

  createCard(): void {
    let card: Card = {
      ...this.formCard.value,
      lista: List.TODO,
    };
    this.service$ = this.service.postCards(card).subscribe((resp: Card) => {
      this.getCards();
      this.showNewCard = false;
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
