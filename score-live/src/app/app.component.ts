import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ScoreService } from './services/score.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, AsyncPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private scoreService = inject(ScoreService);
  public gameScore$ = this.scoreService.scores$;

  public stop(): void {
    this.scoreService.stop();
  }
  public start(): void {
    this.scoreService.start();
  }
}
