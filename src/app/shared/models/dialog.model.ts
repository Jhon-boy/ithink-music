import { DialogType } from "./dialog.types";

export interface DialogBase {
    type: DialogType;
    title?: string;
    message: string;
    dismissible?: boolean;
}

export interface DialogOk extends DialogBase {
    type: 'ok' | 'info' | 'error';
    onAccept?: () => void;
}

export interface DialogConfirm extends DialogBase {
    type: 'confirm';
    onAccept: () => void;
    onCancel?: () => void;
}

export type DialogConfig = DialogOk | DialogConfirm;