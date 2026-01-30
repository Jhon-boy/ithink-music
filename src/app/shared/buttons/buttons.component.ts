import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  /** Título del botón (obligatorio) */
  @Input({ required: true }) title!: string;

  /** Función a ejecutar al hacer clic (obligatorio) */
  @Input({ required: true }) callback!: () => void;

  /** Si es true, deshabilita el botón (opcional) */
  @Input() loading = false;

  /** Color del texto (opcional) */
  @Input() colorText?: string;

  /** Color de fondo (opcional) */
  @Input() colorBackground?: string;

  /** Altura del botón, ej: "40px", "2.5rem" (opcional) */
  @Input() height?: string;

  /** Ancho del botón, ej: "120px", "100%" (opcional) */
  @Input() width?: string;

  onClick(): void {
    if (!this.loading && this.callback) {
      this.callback();
    }
  }
}
