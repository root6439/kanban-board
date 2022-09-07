import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './kanban-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanBoardRoutingModule } from './kanban-board-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [KanbanBoardComponent],
  imports: [
    CommonModule,
    KanbanBoardRoutingModule,
    RouterModule,
    DragDropModule,
  ],
})
export class KanbanBoardModule {}
