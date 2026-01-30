import { Injectable, signal } from "@angular/core";
import { DialogConfig } from "@shared/models/dialog.model";

/**
 * Servicio central para la receptciopn de dialogos
 */
@Injectable({
    providedIn: 'root'
})
export class DiologService {
    // Señal para el dialogo
    private dialogLogSignal = signal<DialogConfig | null>(null);
    // Señal para el dialogo observable
    dialogo$ = this.dialogLogSignal.asReadonly();

    /**
     * Abre el dialogo de información
     * @param message - El mensaje del dialogo
     * @param onAccept - La función a ejecutar cuando se acepta el dialogo
     * @param dismissible - Indica si el dialogo es desechable
     * @param title - Título del dialogo (opcional; por defecto "Información")
     */
    info(message: string, onAccept?: () => void, dismissible = false, title = 'Información') {
        this.open({ type: 'info', title, message, onAccept, dismissible });
    }

    /**
     * Abre el dialogo de ok
     */
    ok(message: string, onAccept?: () => void, dismissible = false, title = 'Aceptar') {
        this.open({ type: 'ok', title, message, onAccept, dismissible });
    }

    /**
     * Abre el dialogo de error
     */
    error(message: string, onAccept?: () => void, dismissible = false, title = 'Error') {
        this.open({ type: 'error', title, message, onAccept, dismissible });
    }

    /**
     * Abre el dialogo de confirmación
     */
    confirm(
        message: string,
        onAccept: () => void,
        onCancel?: () => void,
        dismissible = false,
        title = 'Confirmar'
    ) {
        this.open({ type: 'confirm', title, message, onAccept, onCancel, dismissible });
    }

    /**
     * Abre el dialogo
     * @param dialog - El dialogo a abrir
     */
    private open(dialog: DialogConfig) {
        this.dialogLogSignal.set(dialog);
    }

    /**
     * Cierra el dialogo
     */
    close() {
        this.dialogLogSignal.set(null);
    }
    /**
     * Acepta el dialogo
     */
    accept() {
        const dialog = this.dialogLogSignal();
        dialog?.onAccept?.();
        this.close();
    }
    /**
     * Cancela el dialogo
     */

    cancel() {
        const dialog = this.dialogLogSignal();
        if (dialog?.type === 'confirm') {
            dialog.onCancel?.();
        }
        this.close();
    }
}