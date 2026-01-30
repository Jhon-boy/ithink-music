import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroments';

/**
 * Servicio de logs. Solo escribe en consola cuando NO es producción
 * (environment.production === false, es decir, en desarrollo).
 * En producción no se verá ningún log.
 */
@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly isDev = !environment.production; // true en desarrollo, false en producción

  log(...args: unknown[]): void {
    if (this.isDev) {
      console.log(...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.isDev) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.isDev) {
      console.error(...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.isDev) {
      console.info(...args);
    }
  }

  debug(...args: unknown[]): void {
    if (this.isDev) {
      console.debug(...args);
    }
  }
}
