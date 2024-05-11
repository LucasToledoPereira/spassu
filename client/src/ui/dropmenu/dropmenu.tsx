'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, PopoverContent, PopoverRef } from '../popover';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import React, {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from 'react';
import classNames from 'classnames';
import styles from './dropmenu.module.scss';
import { UIDropmenuItemProps } from './dropmenu.props';

const DropmenuItem = ({
  icon,
  label,
  disabled = false,
  onClick,
  onAfterClick,
  color,
}: UIDropmenuItemProps) => {
  const _css = classNames(
    styles['ui-dropmenu__item'],
    disabled ? styles['ui-dropmenu__item--disabled'] : '',
    'd-flex gap-2 align-items-center py-1 px-2'
  );

  const _style = color ? { color: `${color}` } : {};

  const _click = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!disabled) {
      onClick();
      onAfterClick && onAfterClick();
      e.stopPropagation();
    }
  };
  return (
    <div className={_css} style={_style} onClick={(e) => _click(e)}>
      {icon && (
        <div>
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className="fs-6 fw-normal">{label}</div>
    </div>
  );
};

const Dropmenu = ({ children }: PropsWithChildren) => {
  const ref = useRef<any>(null);
  const _css = classNames(styles['ui-dropmenu'], 'w-full h-full');

  const _items = React.Children.toArray(children).map((el) =>
    cloneElement(el as ReactElement<any, string | JSXElementConstructor<any>>, {
      onAfterClick: () => (ref?.current?.hide ? ref.current.hide() : null),
    })
  );

  return (
    <div className={_css}>
      <Popover trigger="click" placement="bottom-end" ref={ref}>
        <PopoverRef>
          <div className="flex justify-end align-center h-full cursor-pointer">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </PopoverRef>
        <PopoverContent>
          <div className="flex flex-col p-1">{_items}</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { Dropmenu, DropmenuItem };
