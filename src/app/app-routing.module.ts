import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'kanban-board',
    loadChildren: () =>
      import('./kanban-board/kanban-board.module').then(
        (m) => m.KanbanBoardModule
      ),
  },
  { path: '**', redirectTo: 'kanban-board' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
