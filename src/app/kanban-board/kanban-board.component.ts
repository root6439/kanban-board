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
    title: new FormControl<string>(null, Validators.required),
    content: new FormControl<string>(null, Validators.required),
  });

  loadingNewCard: boolean = false;
  showNewCard: boolean = false;

  constructor(private service: KanbanBoardService) {}

  ngOnInit(): void {
    this.service.getCards().subscribe((cards: Card[]) => {
      this.disaggregateCards(cards);
    });
  }

  disaggregateCards(cards: Card[]): void {
    this.cardsToDo = cards.filter((card: Card) => card.lista == List.TODO);
    this.cardsDoing = cards.filter((card: Card) => card.lista == List.DOING);
    this.cardsDone = cards.filter((card: Card) => card.lista == List.DONE);
  }

  createCard(): void {}

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
