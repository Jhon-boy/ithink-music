import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonsComponent } from '@shared/buttons/buttons.component';
import { DiologService } from './service/dialog.service';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css'
})
export class DialogsComponent {
  widget = inject(DiologService);
  dialog = this.widget.dialogo$;

  /**
   * Maneja el clic en el fondo del dialogo
   */
  onBackdropClick(): void {
    if (this.dialog()?.dismissible) {
      this.widget.close();
    }
  }
  /**
   * Callback para el botón Aceptar (arrow function para conservar this)
   */
  onAccept = (): void => {
    this.widget.accept();
  };

  /**
   * Callback para el botón Cancelar (arrow function para conservar this)
   */
  onCancel = (): void => {
    this.widget.cancel();
  };
}
