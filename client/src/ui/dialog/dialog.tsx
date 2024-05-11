/* eslint-disable react/display-name */
'use client';

import classNames from 'classnames';
import {
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
} from 'react';
import { Observable } from 'rxjs';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';

import styles from './dialog.module.scss';
import { DialogContext } from './dialog.context';
import { DialogProps } from './dialog.models';

/**
 * Creates a new React Root inside html body
 * PROBLEM: We can`t use context that were provided inside the initial Root
 * Try to use asDialog method instead
 * @param node
 * @returns
 * @deprecated
 */
function dialog(node: ReactNode | JSX.Element): Observable<any> {
  return new Observable<any>((subscriber) => {
    const container = document.createElement('div');
    document.body.append(container);
    const root = createRoot(container);

    const close = (data?: any) => {
      root.unmount();
      container.remove();
      subscriber.next(data);
      subscriber.complete();
    };

    root.render(
      <DialogContext.Provider value={{ close }}>
        <Dialog>{node}</Dialog>
      </DialogContext.Provider>
    );
  });
}

const Dialog = ({ children }: PropsWithChildren) => {
  const _cssClass = classNames(styles['ui-dialog']);
  return (
    <div className={_cssClass}>
      <div className={styles['ui-dialog__container']}>{children}</div>
    </div>
  );
};

//It is necessary to test this feature
function asDialog<T extends DialogProps>(
  Component: (props: T) => JSX.Element
) {
  return forwardRef((props: T, ref) => {
    const container = document.getElementById('ui-dialog-root');
    const [open, setOpen] = useState(false);
    const [customProps, setCustomProps] =
      useState<Omit<T, keyof DialogProps>>();

    const _close = (v: unknown) => {
      setOpen(false);
      props.onClose && props.onClose(v);
    };

    const _open = (v: Omit<T, keyof DialogProps>) => {
      setOpen(true);
      setCustomProps(v);
    };

    useImperativeHandle(ref, () => {
      return {
        open: _open,
        close: _close,
      };
    });

    const _props = { ...props };
    delete _props.onClose;

    return open && container
      ? createPortal(
          <Dialog>
            <Component
              {..._props}
              {...customProps}
              close={(v: unknown) => _close(v)}
            />
          </Dialog>,
          container
        )
      : null;
  });
}

export { dialog, asDialog };
