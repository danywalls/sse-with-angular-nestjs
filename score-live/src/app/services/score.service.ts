import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, startWith } from 'rxjs';
export type GameScore = {
  lakers: number;
  denver: number;
};
const initialState = {
  lakers: 0,
  denver: 0,
};
@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private API = 'http://localhost:3000/api/games';
  private sseSource = new EventSource(`${this.API}/scores`);
  private http = inject(HttpClient);
  private scoreSubject$ = new Subject<GameScore>();
  public scores$ = this.scoreSubject$.asObservable().pipe(
    startWith({
      lakers: 0,
      denver: 0,
    })
  );

  private getFeed(): void {
    this.sseSource.addEventListener('message', (e: MessageEvent) => {
      const { game } = JSON.parse(e.data);

      this.scoreSubject$.next(game);
    });

    this.sseSource.onerror = () => {
      console.error('😭 sse error');
    };
  }

  public start(): void {
    this.getFeed();
  }

  public stop(): void {
    this.sseSource.close();
      
    this.http.post(`${this.API}/stop`, {}).subscribe(() => {
      console.log('✋🏼');
      this.scoreSubject$.next(initialState);
      this.scoreSubject$.complete();
    });
  }
}
