import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { List } from '../shared/enums/CardStatus.enum';
import { MOCKED_CARDS } from '../shared/mocks/Cards';
import { KanbanBoardRoutingModule } from './kanban-board-routing.module';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanBoardService } from './kanban-board.service';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  let service: KanbanBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KanbanBoardComponent],
      imports: [
        KanbanBoardRoutingModule,
        RouterModule,
        DragDropModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        HttpClientTestingModule,
      ],
      providers: [KanbanBoardService],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    service = TestBed.inject(KanbanBoardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set respective cards', () => {
    component.disaggregateCards(MOCKED_CARDS);

    expect(component.cardsDoing.length).toBe(2);
    expect(component.cardsDone.length).toBe(3);
    expect(component.cardsToDo.length).toBe(3);
  });

  it('should call disaggregateCards with cards array', fakeAsync(() => {
    spyOn(component, 'disaggregateCards');
    spyOn(service, 'getCards').and.returnValue(of(MOCKED_CARDS));

    component.getCards();
    tick();

    expect(component.disaggregateCards).toHaveBeenCalledWith(MOCKED_CARDS);
  }));

  it('should call getCards and set showNewCard to false', fakeAsync(() => {
    spyOn(component, 'getCards');
    spyOn(service, 'postCards').and.returnValue(of(MOCKED_CARDS[1]));

    component.createCard();
    tick();

    expect(component.getCards).toHaveBeenCalled();
    expect(component.showNewCard).toBeFalsy();
  }));

  it('should call getCards', fakeAsync(() => {
    spyOn(component, 'getCards');
    spyOn(service, 'putCards').and.returnValue(of(MOCKED_CARDS[1]));

    component.updateCard(MOCKED_CARDS[1]);
    tick();

    expect(component.getCards).toHaveBeenCalled();
  }));

  it('should call disaggregateCards with cards array', fakeAsync(() => {
    spyOn(component, 'disaggregateCards');
    spyOn(service, 'deleteCards').and.returnValue(of(MOCKED_CARDS));

    component.deleteCard('1');
    tick();

    expect(component.disaggregateCards).toHaveBeenCalledWith(MOCKED_CARDS);
  }));

  it('should formCard.patchValue', () => {
    spyOn(component.formCard, 'patchValue');

    component.onClickEdit('123', '123');

    expect(component.formCard.patchValue).toHaveBeenCalledWith({
      titulo: '123',
      conteudo: '123',
    });
  });

  it('should call updateCard', () => {
    spyOn(component, 'updateCard');
    component.formCard.patchValue({ titulo: 'titulo', conteudo: 'conteudo' });

    component.handleEdit('1', List.DONE);

    expect(component.updateCard).toHaveBeenCalledWith({
      id: '1',
      lista: List.DONE,
      conteudo: 'conteudo',
      titulo: 'titulo',
    });
  });

  it('should return correct value when call disableEditButton', () => {
    component.showNewCard = true;

    expect(component.disableEditButton).toBeTruthy();

    component.showNewCard = false;

    expect(component.disableEditButton).toBeFalsy();

    component.editDoing = [true, false, true, true];

    expect(component.disableEditButton).toBeTruthy();
  });

  it('should call updateCard', () => {
    spyOn(component, 'updateCard');
    let fakeEventDrop: any = {
      previousContainer: {
        data: 1,
      },
      container: {
        data: {
          2: {
            id: '123',
            titulo: 'titulo',
            conteudo: 'conteudo',
            lista: List.DOING,
          },
        },
      },
      previousIndex: 1,
      currentIndex: 2,
    };

    component.drop(fakeEventDrop, 1);

    expect(component.updateCard).toHaveBeenCalledWith({
      id: '123',
      titulo: 'titulo',
      conteudo: 'conteudo',
      lista: List.TODO,
    });
  });
});
