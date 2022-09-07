import { Card } from './../shared/models/Card';
import { Subscription } from 'rxjs';
import { KanbanBoardService } from './kanban-board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { List } from '../shared/enums/List.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
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
  editTodo: boolean[] = [];
  editDoing: boolean[] = [];
  editDone: boolean[] = [];

  constructor(private service: KanbanBoardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  ngOnDestroy(): void {
    this.service$.unsubscribe();
  }

  disaggregateCards(cards: Card[]): void {
    this.cardsToDo = cards.filter((card: Card) => card.lista == List.TODO);
    this.cardsDoing = cards.filter((card: Card) => card.lista == List.DOING);
    this.cardsDone = cards.filter((card: Card) => card.lista == List.DONE);

    this.editTodo = this.cardsToDo.map(() => false);
    this.editDoing = this.cardsDoing.map(() => false);
    this.editDone = this.cardsDone.map(() => false);
  }

  getCards(): void {
    this.service$ = this.service.getCards().subscribe((cards: Card[]) => {
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

  updateCard(card: Card): void {
    this.service$ = this.service.putCards(card).subscribe((cards: Card) => {
      this.getCards();
    });
  }

  deleteCard(cardId: string): void {
    this.service$ = this.service
      .deleteCards(cardId)
      .subscribe((resp: Card[]) => {
        this.disaggregateCards(resp);
      });
  }

  drop(event: CdkDragDrop<Card[]>, target: number) {
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

      let card: Card = event.container.data[event.currentIndex];

      let aux: { [key: number]: List } = {
        1: List.TODO,
        2: List.DOING,
        3: List.DONE,
      };

      card.lista = aux[target];

      this.updateCard(card);
    }
  }

  onCickEdit(title: string, content: string): void {
    this.formCard.patchValue({ titulo: title, conteudo: content });
  }

  handleEdit(id: string, list: List): void {
    let card: Card = {
      id: id,
      ...this.formCard.value,
      lista: list,
    };

    this.updateCard(card);
  }
}
