interface DialogContextData {
  close: (data?: any) => void;
}

interface DialogRef<T> {
  open: (v?: Omit<T, keyof DialogProps>) => void;
  close: (v?: unknown) => void;
}

interface DialogProps {
  close?: (v?: unknown) => void;
  onClose?: (v?: unknown) => void;
}

export type { DialogContextData, DialogRef, DialogProps };
