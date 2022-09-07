import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../shared/models/Card';

@Injectable({
  providedIn: 'root',
})
export class KanbanBoardService {
  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.serverUrl}/cards`);
  }

  postCards(card: Card): Observable<Card> {
    return this.http.post<Card>(`${environment.serverUrl}/cards`, card);
  }

  putCards(card: Card): Observable<Card> {
    return this.http.put<Card>(`${environment.serverUrl}/cards/${card.id}`, card);
  }

  deleteCards(cardId: number): Observable<Card[]> {
    return this.http.delete<Card[]>(`${environment.serverUrl}/cards/${cardId}`);
  }
}
