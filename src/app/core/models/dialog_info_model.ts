export interface DialogInfoModel {
    message: string;
    onAccept?: () => void;
    dismissible?: boolean;
}