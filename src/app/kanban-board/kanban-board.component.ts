import { Card } from './../shared/models/Card';
import { Subscription } from 'rxjs';
import { KanbanBoardService } from './kanban-board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardStatus } from '../shared/enums/CardStatus.enum';
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
    title: new FormControl<string>(null, Validators.required),
    content: new FormControl<string>(''),
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
    console.log(cards);

    this.cardsToDo = cards.filter(
      (card: Card) => card.status == CardStatus.TODO
    );
    this.cardsDoing = cards.filter(
      (card: Card) => card.status == CardStatus.DOING
    );
    this.cardsDone = cards.filter(
      (card: Card) => card.status == CardStatus.DONE
    );

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
      title: this.formCard.get('title').value,
      content: this.formCard.get('content').value ?? '',
      status: CardStatus.TODO,
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
        this.getCards();
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

      let aux: { [key: number]: CardStatus } = {
        1: CardStatus.TODO,
        2: CardStatus.DOING,
        3: CardStatus.DONE,
      };

      card.status = aux[target];

      this.updateCard(card);
    }
  }

  onClickEdit(title: string, content: string): void {
    this.formCard.patchValue({ titulo: title, conteudo: content });
  }

  handleEdit(id: string, status: CardStatus): void {
    let card: Card = {
      id: id,
      ...this.formCard.value,
      status: status,
    };

    this.updateCard(card);
  }

  get disableEditButton(): boolean {
    if (this.showNewCard) {
      return true;
    }

    return this.editDoing
      .concat(this.editDone.concat(this.editTodo))
      .some((value: boolean) => value);
  }
}
