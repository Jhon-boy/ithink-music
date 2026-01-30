import { computed, Injectable, signal } from "@angular/core";
import { SesionState } from "../model/sesion_state";
import { SesionService } from "./sesion_service";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private sesionSignal = signal<SesionState | null>(null);
    sesion$ = this.sesionSignal.asReadonly();

    isLoggedIn$ = computed(() => !!this.sesionSignal()?.isLoggedIn);

    user$ = computed(() => this.sesionSignal()?.user?.user ?? null);

    constructor(private sesionService: SesionService) {
        this.loadFromStorage();
    }

    private loadFromStorage() {
        const state = this.sesionService.get();
        this.sesionSignal.set(state);
    }

    login(state: SesionState) {
        this.sesionService.set(state);
        this.sesionSignal.set(state);
    }

    logout() {
        this.sesionService.clear();
        this.sesionSignal.set(null);
    }
}