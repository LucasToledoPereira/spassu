'use client';

import classNames from 'classnames';
import { useEffect } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { Observable } from 'rxjs';
import styles from './alert.module.scss';

function alert(config: AlertConfig): Observable<boolean> {
  return new Observable<boolean>((subscriber) => {
    const container = document.createElement('div');
    document.body.append(container);
    const root = createRoot(container);
    const onClose = (confirm: boolean) => {
      subscriber.next(confirm);
      subscriber.complete();
    };
    const _config = { ...config, type: config.type ? config.type : 'info' };
    root.render(
      <Alert
        root={root}
        container={container}
        {..._config}
        onClose={(confirm: boolean) => onClose(confirm)}
      />
    );
  });
}

interface AlertConfig {
  title: string;
  message?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  type?: 'info' | 'warning' | 'danger';
}

interface AlertProps {
  root: Root;
  container: HTMLDivElement;
  title: string;
  message?: string;
  type: 'info' | 'warning' | 'danger';
  cancelButtonText?: string;
  confirmButtonText?: string;
  onClose: (confirm: boolean) => void;
}

const Alert = ({
  root,
  container,
  onClose,
  title,
  type,
  message,
  cancelButtonText,
  confirmButtonText,
}: AlertProps) => {
  const _cssClass = classNames(styles['ui-alert']);
  useEffect(() => {
    return () => {
      container.remove();
    };
  });

  const close = (confirm: boolean, e: any) => {
    onClose(confirm);
    e.preventDefault();
    root.unmount();
  };
  return (
    <div
      data-testid="ui-alert"
      className={_cssClass}
      onClick={(e) => close(false, e)}
    >
      <div className={styles['ui-alert__container']}>
        <div data-testid="ui-alert-title" className="text-2xl font-semibold">
          {title}
        </div>
        {message && <div className="text-base font-normal">{message}</div>}
        <div className="flex justify-center gap-2 pt-4">
          <button
            data-testid="ui-alert-cancel-button"
            className="text-gray-600 py-2 px-8 rounded-full w-fit bg-transparent border border-gray-600"
            onClick={(e) => close(false, e)}
          >
            {cancelButtonText || 'Cancel'}
          </button>
          <button
            data-testid="ui-alert-confirm-button"
            className={`text-white py-2 px-8 rounded-full w-fit bg-sky-700`}
            onClick={(e) => close(true, e)}
          >
            {confirmButtonText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export { alert };
export type { AlertConfig };
