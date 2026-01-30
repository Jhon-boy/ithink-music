import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogsComponent } from '@shared/dialogs/dialogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DialogsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ithink-music';
}
