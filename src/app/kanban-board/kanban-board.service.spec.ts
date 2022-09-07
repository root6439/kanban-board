import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { KanbanBoardService } from './kanban-board.service';

describe('KanbanBoardService', () => {
  let service: KanbanBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(KanbanBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
